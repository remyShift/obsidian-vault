---
date: 2026-04-14
type: chantier
projet: Oli's Lab
tags: [nextjs, checkout, chantier, olis-lab]
---

# Chantier : Migration Next.js (inclut Checkout v2)

---

## Pourquoi

La Create React App (CRA) actuelle a plusieurs problèmes structurels : pas de SSR (mauvais pour le SEO), cold start des Lambdas lents, state management éparpillé, dette CSS importante. Next.js résout tout ça : SSR natif, meilleure gestion des images, architecture plus propre pour la croissance du catalogue.

Le checkout v2 est la première feature construite directement sur Next.js, et sert de terrain de test pour l'architecture cible.

---

## Objectif

Migrer le core user journey (voir un produit → add to cart → checkout) de la CRA vers Next.js d'ici fin avril 2026, avec bon SEO, SSR, et réduction des points de friction (loading time, bugs UI).

La CRA reste maintenue en parallèle (Patrick, Lucas) pendant la transition. Elle n'est pas abandonnée du jour au lendemain.

---

## Organisation de l'équipe

Depuis mars 2026, l'équipe est officiellement divisée :

| Axe | Personnes |
|---|---|
| Next.js (migration) | Diego, Kyle, Rémy |
| CRA (maintenance, bugs) | Patrick, Lucas |

Kyle est **owner** du projet Next.js Foundation.

---

## Architecture cible

### Infrastructure
- **Serveur live** (pas Lambdas) : les Lambdas AWS ont un cold start problématique pour les perfs. La cible est un serveur Node.js persistant en monorepo.
- **Monorepo** : `web-app` (Next.js) + `server` (API v2) + packages partagés (`@shared/types`, `@olislab/ui`)

### Frontend
- Next.js App Router (SSR)
- Tailwind (mobile-first, breakpoints Tailwind standard)
- Package UI `@olislab/ui` avec Ladle pour documenter les composants
- Composants core **stateless** (nécessaire pour le SSR)

### Backend API v2
- Node.js, architecture fonctionnelle (pas de classes)
- TypeScript strict (`unknown` et `any` interdits)
- Pattern load / execute / return (voir [[Standards & Patterns]])
- Tests : end-to-end sur les flows critiques (checkout), pas de couverture exhaustive

### Cart
- Le cart doit être stocké **en base de données** (pas uniquement en local storage)
- Problème actuel CRA : certains users ont le cart en DB, d'autres en local storage, schémas potentiellement différents → risque lors des flush ou vérifications de stock
- La migration vers une source de vérité unique (DB) est un prérequis pour le SSR et la gestion correcte de la concurrence

---

## Milestones

### Phase 0 : Foundation (en cours - mars 2026)
- Identifier les dépendances core à refactoriser
- Rendre les composants core stateless
- Cart endpoint + stockage DB
- Tests end-to-end sur le checkout
- SEO Controls : éditer meta title, meta description pour produits, bundles, articles, actives, brand pages (via Payload CMS ou MongoDB selon l'avancement de la migration CMS)

### Phase 1 : Product Display Page (avril 2026)
- PDP sur Next.js (première page visible en prod sur Next.js)
- Design v1.5 (focus mobile, pas de nouveaux champs majeurs)
- Dépendance : products collection Payload mergée + media management résolue
- Design dû le 20 mars (Ante)

### Phase 2 : Product Lister Pages
- Toutes les pages avec des grilles de product cards (Shop All, collections, sous-catégories)
- C'est la dépendance principale pour couvrir tout le flow shop
- Un seul composant `ProductGrid` réutilisé dans toutes les pages → migrer une fois = migrer partout

### Phase 3 : Homepage + Shop Page
- À structurer (pas encore dans les milestones au 2 mars 2026)

### Objectif global
- **Fin avril 2026 :** core flow entièrement sur Next.js avec SSR et SEO fonctionnel

---

## Checkout v2

### Contexte
Le checkout v2 est la première feature livrée sur Next.js. Il vit sur une URL séparée de la CRA, avec son propre déploiement.

### Statut (mars 2026)
- Checkout **anonyme (guest)** : livré en prod le 9 mars 2026
- Checkout **utilisateur connecté** : pausé temporairement pour laisser la priorité aux bugs cart et aux remises Brain Ray

### Ce qui était bloquant pour la release
1. **Pickup points + MapBox** : réassigné à Rémy (complété)
2. **Analytics** : Kyle (~3 jours, prérequis absolu selon Michele)
3. **BigBlue availability check** : 10 appels séparés consolidés en une seule route backend (Diego)
4. **Déploiement** : Amplify avait des problèmes de memory outage au build, Diego a géré

### Bugs cart post-release (mars 2026)
Après la release, des bugs ont été identifiés sur l'état du cart :
- Items qui restent visibles après un achat
- Cart qui affiche des items absents du local storage
- Refresh = cart vide
- Ajouter un produit = cart mis à jour uniquement avec le nouveau produit

Cause probable : état supplémentaire dans la navbar qui se désynchronise du local storage. Kyle lead l'investigation avec Rémy et Lucas. Estimation correction : jusqu'à 2 jours.

### Feature flags
- Le checkout v2 est deployé sous feature flag
- La collection page a aussi son feature flag
- Permet de tester en prod sur une cohorte ciblée avant ouverture générale

---

## SEO

### Contexte
Le SEO est un prérequis pour que la migration Next.js ait du sens (SSR sans SEO = migration à moitié). L'objectif est de pouvoir éditer les meta properties depuis le CMS ou la DB.

### Approche
- **Option prioritaire :** Payload CMS pour tous les champs SEO (meta title, description, OG) sur produits, bundles, articles, actives, brand pages
- **Fallback :** si Payload prend trop de temps, étendre les schémas MongoDB directement et lire depuis là

Patrick a repris ce projet après un handoff de Diego. La plupart des PRs sont prêtes pour review (mars 2026).

---

## Dépendances critiques

Pour continuer la migration Next.js, ces éléments doivent avancer en priorité :

1. **Products collection Payload mergée** → nécessaire pour la PDP Next.js
2. **Media management résolue** (tailles d'images, focal point) → nécessaire pour la PDP Next.js
3. **Event tracking fonctionnel** → nécessaire avant d'exposer le checkout v2 à plus d'utilisateurs
4. **Bugs cart résolus** → bloque le checkout utilisateur connecté

---

## Notes importantes

### Mobile-first
La CRA était desktop-first, Tailwind est mobile-first. La migration vers Next.js est l'occasion de corriger ça. Tout nouveau composant sur Next.js doit partir du mobile. 70% des users Oli's Lab viennent du mobile.

Breakpoints Tailwind standard :
- Mobile : < 640px
- Tablet : 640px - 1024px
- Desktop : > 1024px

### Remises Brain Ray
Une collection `sales_offers` a été créée pour gérer les remises par marque (Brain Ray à -30%). C'est un quick hack dans la CRA, à migrer vers Next.js avec une vraie stratégie de gestion des offres.

---

## Réunions source

- [[2026-03-02 Tech Weekly]] - split équipe, milestones Next.js, checkout blockers
- [[2026-03-09 Tech Weekly]] - checkout live, bugs cart, remises Brain Ray
- [[2026-03-23 Tech Weekly]] - dépendances PDP, linter Next.js, event tracking bloquant
- [[2026-01-28 Code Review Tests Architecture API]] - architecture API v2, pattern load/execute/return
- [[2026-02-06 Debugging Infinite Loop Checkout]] - debugging React Profiler
- [[2026-02-25 QA Search UI Mobile Safari]] - mobile-first, breakpoints
