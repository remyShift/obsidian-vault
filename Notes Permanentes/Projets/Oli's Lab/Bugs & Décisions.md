---
date: 2026-04-14
type: reference
projet: Oli's Lab
tags:
  - olis-lab
---

# Bugs & Décisions - Oli's Lab

Bugs résolus en réunion et décisions techniques ponctuelles qui ne rentrent pas dans un chantier mais qui sont importantes à garder en mémoire.

---

## Bugs résolus

### Infinite loop au checkout (février 2026)

**Symptôme :** freeze complet de la page au deuxième "Proceed to checkout" dans la même session. CPU spike, aucune erreur console.

**Cause :** `useEffect` dans `LandingPage` avec `providersAvailable` (array) comme dépendance. React compare les arrays par référence → nouveau `[]` à chaque render → loop infinie.

**Fix :**
```ts
// ❌ avant
useEffect(() => { checkProviderAvailability() }, [providersAvailable])

// ✅ après
useEffect(() => { checkProviderAvailability() }, [providersAvailable.length])
```

**Source :** [[06-02-2026 Debugging Infinite Loop Checkout]]

---

### Recréation d'index `brands` à chaque cold start Lambda (février 2026)

**Symptôme :** 1400+ appels de création d'index sur la collection `brands` en 7 jours (détecté via MongoDB Atlas Profiler).

**Cause :** à chaque démarrage Lambda, Mongoose enregistre tous les schémas et appelle `ensureIndexes()`. La collection `brands` est touchée en premier (probablement via le fetch du menu au démarrage), donc ses index sont recréés à chaque cold start.

**Fix envisagé :** désactiver `autoIndex` dans la config Mongoose. Contrepartie : synchronisation manuelle des index à chaque modification. Non encore implémenté à la date du meeting.

**Source :** [[10-02-2026 MongoDB Indexation Performance]]

---

### 10 appels BigBlue simultanés sur le cart (mars 2026)

**Symptôme :** 10 appels API séparés vers BigBlue pour vérifier la disponibilité de 10 items dans le cart.

**Cause :** la vérification de disponibilité était faite item par item dans le frontend, sans route backend consolidée.

**Fix :** créer une route backend unique qui reçoit tous les items et fait un seul appel consolidé à BigBlue.

**Source :** [[02-03-2026 Tech Weekly]]

---

### CSS selector PostHog cassé après redéploiement Next.js

**Symptôme :** les filtres manuels PostHog basés sur des class names CSS cessent de fonctionner après chaque déploiement.

**Cause :** Next.js tokenise les class names à chaque build. Un class name comme `btn-xyz123` devient `btn-abc456` après le prochain build.

**Fix :** ne jamais utiliser les class names CSS comme sélecteurs d'événements PostHog. Utiliser des IDs stables ou des événements explicites déclenchés dans le code.

**Source :** [[07-10-2025 Tech Weekly]]

---

### Purchase event déclenché avant confirmation backend (mars 2026)

**Symptôme :** des events `purchase` apparaissent dans GA/Meta même pour des commandes qui ont échoué.

**Cause :** l'event était capturé au moment du clic "Pay", avant que le backend confirme le succès de la transaction.

**Hotfix :** tracker l'event sur la success page (juste avant le redirect), avec un guard en local storage pour éviter les doublons au refresh.

**Problème résiduel :** Apple Pay n'a pas accès aux items du cart dans le contexte de la success page → l'event Apple Pay est tracké sans les items, uniquement avec la valeur et le `logistic_order_id`.

**Source :** [[03-03-2026 Events Capturing]]

---

## Décisions techniques notables

### Catégorisation commerciale vs catégorisation produit (janvier 2026)

Deux niveaux de catégorisation coexistent pour des raisons différentes :

- **Niveau produit (DB)** : catégorisation précise (`hand_care`, `foot_care`, `moisturizer`, `serum`). Utilisée pour le product recommendation, la routine builder et les analytics internes.
- **Niveau commercial (UX)** : certaines sous-catégories sont regroupées dans les menus et pages collection (`hand_care` + `foot_care` → "Hand & Foot Care"). Utilisée uniquement pour l'affichage.

Le groupement commercial est implémenté via un mapper dans le backend (solution court terme). La solution long terme est une collection dédiée avec nom traduit et image.

**Source :** [[27-01-2026 Restructuration Categories Subcategories]]

---

### `inciList` ne doit jamais être écrasé (janvier 2026)

Le champ `inciList` sur les produits shop est géré par l'automation Notion. Le réécrire depuis un script (ex. le split scientifique INCI) cause des problèmes de formatage côté shop et sera de toute façon écrasé par la prochaine exécution de l'automation.

Règle : pour le projet scientifique, créer un champ dédié `incilist_scientific_split`. Le split n'est nécessaire que pendant le calcul du scoring ; après, les données sont lues depuis la collection `matches`.

**Source :** [[20-01-2026 Product Recommendation Release]]

---

### Deux patterns d'event tracking (mars 2026)

La décision de tracker tous les events "le plus proche possible du clic" est correcte pour les events comportementaux, mais fausse pour les events transactionnels.

- **Events comportementaux** (`view_item`, `begin_checkout`, `add_address`) → client-side, proche du clic, PostHog suffit
- **Events transactionnels** (`purchase`, modifications de valeur du cart) → doivent refléter la réalité backend, pas le clic. À terme : côté serveur.

**Source :** [[03-03-2026 Events Capturing]]

---

### Statut "staged" déprécié dans Payload (mars 2026)

Dans la migration vers Payload CMS, le statut "staged" des produits est abandonné. Seuls `live` (published) et `offline` restent supportés. Les produits incomplets ou les tests sont marqués `draft` dans Payload.

Le draft Payload remplace fonctionnellement le statut "staged" : production ne lit que les `published`, staging peut lire les drafts via le paramètre API.

**Source :** [[26-03-2026 Migration Produits Payload Schemas]]

---

### Sync script CMS : un endpoint par collection, pas de script générique (mars 2026)

La tentative de créer un script générique pour synchroniser toutes les collections Payload → MongoDB a été abandonnée. Chaque collection a des edge cases trop différents (ex. subcategories n'existent pas comme collection MongoDB, elles sont des clés d'objet dans `categories`).

Architecture retenue :
- CMS (hook) : endpoint dynamique qui accepte le nom de la collection en paramètre
- Server (backend) : routes statiques séparées par collection (`/internal/sync/brands`, `/internal/sync/categories`, etc.)
- Un controller dédié par collection, pas de `if` dans un controller générique

**Source :** [[31-03-2026 CMS Sync Script Code Review]]
