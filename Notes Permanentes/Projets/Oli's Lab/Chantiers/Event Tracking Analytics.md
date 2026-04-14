---
date: 2026-04-14
type: chantier
projet: Oli's Lab
tags: [analytics, event-tracking, chantier, olis-lab]
---

# Chantier : Event Tracking & Analytics

---

## Pourquoi

Les campagnes publicitaires (Google Ads, Meta/Instagram) fonctionnent via des robots qui optimisent automatiquement le ciblage et les dépenses en temps réel. Ces robots ont besoin de données de conversion qui arrivent directement dans leurs plateformes respectives (GA, Meta). Sans ça, les budgets publicitaires sont alloués à l'aveugle.

PostHog seul ne suffit pas pour les besoins marketing. Il reste indispensable pour le product analytics (heatmaps, session monitoring, comportement utilisateur), mais il ne remplace pas GA pour les ads.

---

## Plateformes et rôles

| Plateforme | Rôle | Propriétaire |
|---|---|---|
| **PostHog** | Product analytics, heatmaps, session monitoring, feature usage. Pour l'équipe produit. | Diego/Rémy |
| **Google Analytics** | Métriques business (purchases, valeur, checkout). Lié aux campagnes Google Ads. | Michele + GA |
| **Meta Analytics** | Données de conversion pour les campagnes Instagram. | Michele + Meta |

Les trois tournent en parallèle. Pas de choix à faire entre eux : chacun a son utilité propre.

---

## Architecture actuelle : analytics service de Rémy

Rémy a créé un service analytics (wrapper) qui dispatche les events vers plusieurs plateformes simultanément. L'event est déclenché une fois côté front, le service s'occupe d'envoyer aux bonnes destinations.

```ts
// Concept du wrapper
dispatchEvent('purchase', {
  value: 99.00,
  currency: 'EUR',
  items: [...],
  logistic_order_id: 'xxx'
})
// → PostHog
// → Google Analytics (via gtag)
// → Meta (via Meta Pixel)
```

L'approche est plus simple à maintenir que de passer par Google Tag Manager + une intégration PostHog → GTM, qui nécessiterait de reconfigurer les valeurs (SKU, montant, items) manuellement.

---

## Deux patterns d'events à ne pas confondre

### Pattern 1 : Events comportementaux
Trackés côté client, proches du clic. Pas de confirmation backend nécessaire.

| Event | Quand | Plateformes |
|---|---|---|
| `view_item` | Arrivée sur une page produit | PostHog |
| `begin_checkout` | Clic sur "Proceed to checkout" | PostHog, GA |
| `add_address` | Remplissage adresse | PostHog |
| `add_payment_details` | Saisie paiement | PostHog |
| `search` | Recherche effectuée | PostHog |
| `skin_quiz_start` | Démarrage du quiz skin | PostHog |

### Pattern 2 : Events transactionnels
Doivent refléter la **réalité backend** : une transaction échouée ne doit pas apparaître comme une vente.

| Event | Quand | Plateformes |
|---|---|---|
| `purchase` | Commande confirmée par le backend | GA, Meta, PostHog |
| `add_to_cart` (valeur) | Item ajouté, stock validé | GA, Meta, PostHog |
| `subscribe` | Inscription newsletter confirmée | Klaviyo, PostHog |

---

## Problèmes identifiés (état mars 2026)

### 1. Purchase event déclenché trop tôt
L'event `purchase` se déclenchait au clic "Pay", avant confirmation backend. Résultat : des commandes échouées comptabilisées comme ventes dans GA et Meta.

**Hotfix mis en place :** tracker l'event sur la success page, avec un guard local storage (`event_sent: true`) pour éviter les duplicates au refresh.

```ts
// Sur la success page, avant redirect
if (!localStorage.getItem('purchase_tracked')) {
  dispatchEvent('purchase', { logistic_order_id, value, items })
  localStorage.setItem('purchase_tracked', 'true')
}
```

**Limitation hotfix :** Apple Pay (Express Checkout) n'a pas accès aux items du cart dans le contexte de la success page. Le purchase event Apple Pay est tracké avec `logistic_order_id` + valeur, mais sans les items. On peut distinguer les deux flows via `payment_method` en metadata.

### 2. Logistic order ID manquant
L'ID interne de commande qu'on envoyait dans les events n'est pas accessible à Louis et Suze (warehouse). Ils ont besoin du `logistic_order_id` (l'ID BigBlue) pour réconcilier les transactions GA avec ce qu'ils voient dans l'entrepôt.

**Fix :** ajouter `logistic_order_id` au payload du purchase event.

### 3. Apple Pay : GA session ID et client ID non transmis
Le purchase event via Apple Pay ne passe pas correctement le `GA session ID` et le `client ID` vers le serveur. Ces deux IDs sont dans les cookies côté client mais ne sont pas transmis dans le flow Apple Pay.

**Statut (mars 2026) :** bloqué. Deux approches testées (analytics direct + service-based tag passing), les deux échouent. Investigation en cours (Kyle + Michele). Le checkout v2 est bloqué en attendant ce fix.

Hypothèse : la transition vers une solution cookie différente côté backend est peut-être en conflit avec l'approche actuelle.

### 4. Events stage/prod qui se mélangent
Les events de staging remontaient dans les dashboards Meta, polluant les données de production.

**Fix :** corrigé côté GA. Pas encore vérifié côté Meta (mars 2026).

---

## Solution long terme : events transactionnels côté backend

Idéal à terme : tracker les events transactionnels depuis le serveur, où la vérité est disponible de façon fiable et sans risque de double-trigger.

**Ce que ça implique :**
- `react-ga` est frontend uniquement → pas utilisable côté serveur
- GA a un SDK backend séparé (différent de `gtag`)
- PostHog nécessite une config backend séparée (pas encore en place)
- Estimation : 1-2 jours d'évaluation + fixes

**Quand :** entre la phase 0 et la phase 1 de la migration Next.js. L'analytics service de Rémy sera refactorisé à cette occasion pour Next.js. La CRA legacy garde l'ancienne méthode pendant la transition, les deux streams coexistent sans se mélanger.

**Vision très long terme :** quand le cart API sera implémenté, les events `add_to_cart` / `remove_from_cart` (côté valeur, pas visites) passeront aussi côté backend.

---

## Règles à ne pas oublier

- **Jamais de class names CSS comme sélecteurs d'events.** Next.js tokenise les class names à chaque build → les sélecteurs cassent. Utiliser des IDs stables ou des events explicites dans le code.
- **Events asynchrones.** Le dispatching des events ne doit jamais bloquer l'UX (add to bag, checkout, etc.). Toujours asynchrone.
- **Un seul déclenchement par transaction.** Implémenter des guards (local storage, backend dedup) pour éviter les doublons.

---

## État actuel (avril 2026)

- Wrapper analytics : en place, dispatche vers PostHog + GA + Meta
- Events comportementaux : trackés correctement
- Purchase event : hotfix success page en place, limitation Apple Pay connue
- Apple Pay tracking : bloqué, en investigation
- Events stage/prod : corrigé sur GA, à vérifier sur Meta
- Refacto backend : prévu entre phase 0 et phase 1 Next.js
- Kyle supervise ce chantier

---

## Réunions source

- [[2026-03-03 Events Capturing]] - architecture, deux patterns, hotfixes
- [[2026-03-02 Tech Weekly]] - purchase event trade-off, supervision Kyle
- [[2026-03-23 Tech Weekly]] - Apple Pay bloqué, checkout v2 bloqué, approche hybride CRA/Next.js
- [[2025-10-07 Tech Weekly]] - premières décisions : wrapper async, pas de CSS selectors
