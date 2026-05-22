---
updated: 22-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
22-05-2026 — LoadingProductsSpinner sur toutes les pages listing + fix flickering NoFilterResults + skipToken sur hooks a parametre nullable.

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Tests CMS integration : infra en place, tests unitaires `uniquePerCategory` ecrits, PR prete, attente retour Diego
- Guards Payload : implementes, testes, 2 fichiers pilotes migres, PR `feat/custom-fix-type-inference-payload` prete
- PostHog bug : diagnostique, fix code pret, en attente implementation + verification staging
- SearchPage filtering : implemente sur branch `feat/add-filtering-search-page`, PR a ouvrir
- Page builder Payload blocks : plan approuve (5 types, apps/web, shop avant homepage), implementation a venir
- BrandsHomePage regression : fixee localement, PR a ouvrir
- LoadingProductsSpinner : implemente sur toutes les pages listing (ShopBestsellers, ShopBundles, CategoriesPage, EditPage, ShopAll, HotBrands, SkinTypesProducts, ShopJustDropped)

## Faits recents importants
- Pattern `filteredProducts` : initialiser a `null` (pas `[]`) — distingue "pas encore filtre" vs "filtre actif vide" — applique sur toutes les pages listing
- 4 nouveaux hooks React Query : `useTopSellingProductsQuery`, `useProductsByCategoryQuery`, `useEditBySlugQuery`, `useAllBundlesQuery`
- `skipToken` (TanStack Query v5) : pattern retenu pour hooks a parametre nullable — remplace `enabled + !`, type narrow automatique dans le `queryFn`
- `handleAddToBag` : `filteredProducts ?? products` remplace le ternaire `length > 0` partout
- ShopBestsellers, CategoriesPage, EditPage : `useEffect` raw remplace par React Query

## Decisions actives
- Tests `uniquePerCategory` : unitaires uniquement, injection de dependance explicite
- Blocks : cibler `apps/web` (Next.js), shop page avant homepage, 5 types (HeroBlock, ProductGridBlock, BrandOfMonthBlock, BannerBlock, FeaturesBlock)
- PostHog : ne pas modifier `defaults` ni `cookieless_mode` — seul le re-apply au montage manque
- SearchPage : `ShopProduct` directement, discrimination via `isBundle`
- Fix BrandsHomePage : `null` initial > booleen `hasActiveFilters` supplementaire
- Nouveaux hooks nullable : privilegier `skipToken` sur `enabled + !`

## Prochaines etapes
- Ouvrir PR `feat/loading-state-plp` (LoadingProductsSpinner toutes pages)
- Ouvrir PR `feat/add-filtering-search-page` + tester en staging
- Ouvrir PR fix BrandsHomePage (regression #1700)
- Implementer fix PostHog dans les deux hooks + verifier staging
- Merger `chore/cms-int-tests-ci` apres retour Diego
- Resoudre bug S3 double declaration XML (bloquant)
- Implementer CRON + feed Meta
