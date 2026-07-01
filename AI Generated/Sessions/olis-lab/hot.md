---
updated: 01-07-2026
project: olis-lab
tags: [hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
01-07-2026 — Endpoint curated `/products-curated` **implémenté** (CMS + web, TDD) et **PR ouverte**. Debug live : PLP vide car produits `cms_dev` sans `cartProduct` → échouent `assertProduct` → droppés.

## État du projet
- **Curated PLP implémenté, PR ouverte.** CMS : `apps/cms/src/lib/curation/` (interleave, orderCuratedProducts, resolveCurationSection, buildCuratedList, `getCuratedProducts`, keepValidProducts, CuratedQuerySchema) + handler `endpoints/read/curatedProducts.ts` + enregistré `payload.config.ts`. Web : `getProductsCurated` (`cms.request()` SDK) swap dans `page.tsx`.
- **Validation 1× côté serveur** : `keepValidProducts` → `assertProduct` retourne `TProduct` ; web = enveloppe Zod (`z.custom<TProduct>`) + `response.ok`, pas de re-assert.
- **Offline actif** (Rémy) : `keepValidProducts` passe les invalides en `status:'Offline'`. **Destructeur sur données imparfaites** → Rémy a basculé `.env.local` sur localhost `cms_local` (au lieu d'Atlas `cms_dev` partagée) pour contenir.
- Shuffle du reste non-curated = assumé (effet fraîcheur). `totalDocs` corrigé (`+ mainResult.totalDocs`).
- Autres chantiers : cart #1859, navbar #1839, PR #1853, plan globals (`~/.claude/plans/j-aimerais-faire-le-plan-cuddly-breeze.md`).

## Faits récents importants
- **Bloqueur = données** : quasi tous les produits `cms_dev` n'ont pas `cartProduct` (calculé par hook `computeCartSnapshot`, #1801/#1859) → PLP vide ET panier cassé. L'ancienne PLP planterait pareil (même `assertProduct`).
- **Drop-post-pagination** : les invalides sont droppés APRÈS la pagination → page 1 invalide = 0 produit, pas de backfill. À revoir (filtrer en amont ou over-fetch).
- `assertProduct` = validateur ET mapper raw→`TProduct` (mainImage.url, tags, cartProduct). Valide le produit ENTIER (PDP) alors que la PLP n'a besoin que des champs carte — mais `cartProduct` reste requis par la carte.
- PLP = RSC dynamique → chaque hard refresh / filtre = 1 requête CMS (rien de caché).

## Décisions actives
- Valider 1× serveur (→ TProduct), web = enveloppe Zod. Tests = comportement en intégration, suppr unitaires sur fonctions pures internes. Shuffle assumé. Offline gardé + env localhost.

## Prochaines étapes
- **Backfiller `cartProduct`** (re-save via hook / cart #1859) — prérequis pour que la PLP affiche quoi que ce soit.
- Trancher le drop-post-pagination (filtrer en amont / over-fetch).
- PR curated : review + merge. Reprendre cart #1859, navbar #1839, PR #1853, globals.
