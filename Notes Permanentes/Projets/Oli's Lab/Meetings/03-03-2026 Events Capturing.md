---
date: 2026-03-03
type: meeting
projet: Oli's Lab
tags:
  - analytics
  - event-tracking
  - olis-lab
participants:
  - Michele
  - Kyle
  - Remy
notion: https://www.notion.so/olislab/Events-Capturing-3184bf4c7fa18081b304e967cf9cad58
---

# Events Capturing

---

## Contexte et objectif

Michele a initié cette réunion pour définir une **architecture de tracking d'événements**, pas juste régler le bug du purchase event. Le vrai sujet : entre Rémy et Diego, la décision avait été de tracker tous les events le plus proche possible du clic utilisateur. Ce pattern est bon pour les events comportementaux, mais inadapté pour les events transactionnels.

---

## Pourquoi on ne peut pas tout mettre sur PostHog

Trois plateformes en parallèle sont nécessaires, chacune avec un rôle distinct :

- **PostHog** : product analytics (heatmaps, session monitoring, comportement utilisateur, features usage). Qualitatif, pour l'équipe produit. Gratuit hors ad tracking.
- **Google Analytics** : métriques business haut niveau (checkout, purchase, valeur), lié aux campagnes Google Ads. Le robot de la campagne lit GA pour savoir comment allouer le budget automatiquement.
- **Meta Analytics** : même logique pour les campagnes Instagram. Le robot a besoin des données de conversion pour ajuster le ciblage et les dépenses.

Mettre tout sur PostHog puis passer par Google Tag Manager pour GA et Meta est techniquement possible mais demande beaucoup d'ingénierie pour passer les valeurs (SKU, montant, items). L'approche actuelle (envoyer les events aux trois plateformes via le mapper de Rémy) est plus simple à maintenir.

---

## Deux patterns d'events à distinguer

### Pattern 1 : Events comportementaux (client-side, proche du clic)
- Recherches, navigation, usage du profil, démarrage du skin quiz, feature interactions
- Ces events n'ont pas besoin de confirmation backend
- Peuvent rester uniquement sur PostHog si on veut simplifier
- Exemples : `view_item`, `begin_checkout`, `add_address`, `add_payment_details`

### Pattern 2 : Events transactionnels (besoin de confirmation)
- Purchase, modifications du cart (add/remove)
- Actuellement trackés trop tôt : l'event se déclenche au clic, avant que le backend confirme. Si la commande échoue, l'event est quand même envoyé.
- Doivent refléter la vérité : seuls les achats réellement confirmés doivent être trackés
- Exemples : `purchase`, `add_to_cart` (côté valeur), `remove_from_cart`

---

## Problèmes actuels

1. **Purchase event déclenché trop tôt** : fire au clic, pas à la confirmation. Si l'ordre échoue, l'event part quand même.
2. **Logistic order ID manquant** : Louis et Suze (warehouse) ne peuvent pas réconcilier les transactions GA avec ce qu'ils voient dans l'entrepôt. L'ID interne DB qu'on envoie ne leur est pas accessible.
3. **Apple Pay / Express Checkout** : les items du cart ne sont pas disponibles au moment du tracking dans le flow Apple Pay.

---

## Solution court terme : success page (hotfix, 2 semaines max)

- Tracker le purchase event sur la **success page**, juste avant le redirect
- À ce moment-là on a le `logistic_order_id` et les items de la commande
- **Problème :** si l'utilisateur refresh la success page, l'event se redéclenche
- **Mitigation :** guard en local storage (`event_sent: true`) pour ne pas re-trigger. Hacky mais acceptable pour un hotfix.
- Rémy explore aussi côté documentation GA s'il y a un mécanisme natif d'évitement des events dupliqués
- Cette solution couvre plus de scénarios d'achat que l'état actuel, même avec le risque du refresh. Beaucoup d'implémentations GTM font pareil ou pire.

### Cas Apple Pay (Express Checkout)
- Au moment du redirect success page, on n'a pas les items du cart dans le contexte du fichier ApplePay
- Solution : tracker le purchase event sans les items pour Express Checkout, mais avec le `logistic_order_id` et la valeur
- On peut ajouter le `payment_method` comme metadata pour distinguer les deux flows

---

## Solution long terme : backend

- Tracker les events transactionnels côté serveur : source de vérité, toutes les données disponibles, pas de risque de double trigger
- **Blockers actuels :**
  - `react-ga` est une lib frontend uniquement (wrapper React, pas fait par Google)
  - Pour le backend, Google Analytics fournit un SDK séparé (différent de gtag)
  - PostHog : pas encore de configuration backend en place
  - Estimation Rémy : 1-2 jours d'évaluation et de fixes pour mettre ça en place
- **Quand :** entre la phase 0 et la phase 1 de la migration Next.js, améliorer l'analytics service de Rémy et définir l'architecture pour Next.js. La CRA n'a pas besoin d'être mise à jour.

### Vision future (très long terme)
- Quand le cart API sera implémenté, les events de modification du cart (add/remove) devraient aussi passer côté backend
- La consultation du cart (open cart) reste client-side
- Nécessaire quand on aura de la concurrence sur le stock : si deux users essaient d'acheter le dernier item, le backend doit gérer ça, et les events doivent refléter ce qui s'est réellement passé

---

## Actions

- [ ] **Rémy** - Hotfix : tracker le purchase event sur la success page avec un guard (local storage) pour éviter les duplicates au refresh
- [ ] **Rémy** - Explorer la doc GA pour les méthodes natives d'évitement d'events dupliqués
- [ ] **Kyle + Rémy** - Explorer (basse priorité, ~3 semaines) l'implémentation des events transactionnels côté backend + best practices
- [ ] **Toute l'équipe** - Inclure l'amélioration de l'abstraction analytics dans la migration Next.js (entre phase 0 et phase 1)
- [ ] **Rémy** - Ajouter le `logistic_order_id` au purchase event pour permettre la réconciliation par Louis et Suze
