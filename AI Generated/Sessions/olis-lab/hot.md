---
updated: 08-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
08-05-2026 — SearchPage : fusion tabs produits+bundles implementee, bug handleAddToBag bundles corrige, QuickAddToBagPopup utilise pour les bundles (pattern shopAll).

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`, cle S3 `feeds/gmc-${lang}.xml`
- Feed Klaviyo : operationnel
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- SearchPage : fusion produits+bundles faite, prochaine etape = CategoriesFilter sidebar
- Payload type narrowing : plan finalise, Option A retenue, implementation en attente

## Faits recents importants
- `QuickAddToBagPopup` gere nativement les bundles (branche `isBundle` dans `checkAvailability`)
- `handleAddToBag` bundles cherchait dans `rawProducts` au lieu de `bundlesQuery.data` — bug silencieux corrige
- `BundleSearchResult` castee en `ShopProduct` via `as unknown as ShopProduct` + `isBundle: true` ajoutee
- `mapBundleSearchResult` locale dans `SearchPage.tsx` — convertit `BundleSearchResult` en `MappedProduct`
- `combinedProducts = [...mappedBundles, ...mappedProducts]` — bundles en premier
- Clé i18n `searchPage.tabs.bundles` supprimee dans fr/en/es/it
- Pas de solution officielle pour les types Payload — `deref`/`assertPopulated` = standard de facto

## Decisions actives
- SearchPage : bundles via `QuickAddToBagPopup` (pas navigate), cohérent avec shopAll
- SearchPage : combining logic inline dans `SearchPage.tsx` (pas de hook intermediaire)
- Payload narrowing : `packages/shared/src/payload/guards.ts` avec 4 utilities
- Pattern langue feeds : `?lang=fr|en`, cle S3 `feeds/{platform}-${lang}.xml`

## Prochaines etapes
- Implementer SearchPage CategoriesFilter sidebar (prochaine etape du plan)
- Implementer `packages/shared/src/payload/guards.ts` + migrer `product.ts` et `computeCartSnapshot.ts`
- Resoudre bug S3 double declaration XML
- Implementer feed Meta (`feeds/meta-${lang}.xml`) — RSS 2.0
