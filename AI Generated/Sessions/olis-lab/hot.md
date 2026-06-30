---
updated: 30-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
30-06-2026 — Session exploration + planning (zéro code). Cartographie PLP Next, trace curated-first legacy, **plan validé** d'un endpoint CMS custom `/products-curated` (`~/.claude/plans/peppy-whistling-mist.md`, NON implémenté, Rémy diffère).

## État du projet
- **Plan curated PLP validé (NON implémenté)** : endpoint Payload custom `/products-curated` dans `apps/cms`, appelé via `cms.request()` (SDK) par un nouveau `getProductsCurated` (`apps/web/lib/api/cms.ts`), drop-in de `getProducts` dans `page.tsx`. Logique in-process Local API (`req.payload.find`). Source curation = global `trading-plan` → `curationSettings.homepage` (`brandsOfTheMonth` relation→brands ordre signifiant, `prioritySkus` relation→products, `maxPerBrand`). **Ordre déterministe** (interleave + cap, pas de `$sample`). **Déclenchement** : curated en tête seulement si `sort`==défaut, toujours filtrés par le `where` actif ; tri explicite → find pur. Helper pur `buildCuratedList` testable, int.spec écrit avant (TDD). Pattern endpoint = `apps/cms/src/endpoints/sync/brands.ts` ; `products` a `access.read:()=>true` (public).
- Autres chantiers ouverts (rappel) : cart hook PR #1859 (implémentée, 9/9 int verts, reste CI + review Diego + merge + follow-up guard `beforeValidate`). Navbar #1839 (fix flag CMS=null, pas vérifié live, pas commité, clé API `NEXT_PUBLIC_FEATURE_FLAGS_SECURE_API_KEY` à renommer server-only). PR #1853 (LockableTextField sku/ean, réponse Diego à poster). Plan globals (4 tasks, `~/.claude/plans/j-aimerais-faire-le-plan-cuddly-breeze.md`).

## Faits récents importants
- PLP Next = `URL → HTML` pure (URL = source de vérité, `optimisticFilters` = cache d'affichage via `router.replace`). Pagination "Show More" = accumulation de `limit` (+20), `page`=1 → refetch from scratch, O(n²) si gros catalogue.
- Curation déjà migrée dans Payload (`trading-plan.curationSettings`), miroir de l'ancien Mongo `curation_settings`. SDK Payload = HTTP REST (pas Local API), malgré commentaire faux `data.ts:11`.
- Legacy ShopAll utilise par erreur la section `homepage` (pas `shop`) ; pagination legacy cassée si multi-requêtes ($sample + shuffle).

## Décisions actives
- Endpoint custom CMS (pas orchestration web), section `homepage`, ordre déterministe, curation seulement sur tri défaut + obéit aux filtres. TDD int.spec avant handler.

## Prochaines étapes
- Implémenter `peppy-whistling-mist.md` quand Rémy lance (int.spec → buildCuratedList → handler → config → getProductsCurated/qs-esm → swap page.tsx).
- Reprendre cart hook #1859, navbar #1839, PR #1853, plan globals.
