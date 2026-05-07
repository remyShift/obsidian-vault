---
updated: 07-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
07-05-2026 — Plan d'integration du CategoriesFilter dans la SearchPage (vue combinee produits + bundles) redigé et validé.

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`, cle S3 `feeds/gmc-${lang}.xml`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`, cle S3 `feeds/klaviyo-${lang}.xml`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert
- Validation Joi : `validations/xmlValidation.js`
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- SearchPage : plan CategoriesFilter pret, implementation en attente

## Faits recents importants
- `#fetchLiveProductsWithInventory(fields)` est une methode statique privee JS (`#`) dans `XmlController`
- Fetch produits + BigBlue en parallele via `Promise.all`
- `validateFeedQuery` middleware Joi applique sur `/gmc-feed` et `/klaviyo-feed` — default lang `'fr'`
- Klaviyo : tous les champs toujours presents, `sale_price>n/a` si pas de discount
- `CategoriesFilter` (2440 lignes) accepte `ShopProduct[]` et gere les bundles via `isBundle: true`
- `BundleSearchResult` (SearchPage) est un type different de `ShopProduct` — adapter necessaire
- Plan SearchPage sauvegarde dans `.claude/plans/`

## Decisions actives
- Pattern langue : `?lang=fr|en`, cle S3 `feeds/{platform}-${lang}.xml`
- Validation mutualisee via middleware Joi, pas inline dans les controllers
- Methode privee `#fetchLiveProductsWithInventory` dans la classe XmlController
- Klaviyo format flat XML (sans namespace), prix decimal pur sans devise
- Throw and abort si traduction manquante (pas de skip silencieux)
- SearchPage : vue combinee produits + bundles avec sidebar CategoriesFilter, onglet bundles separe supprime
- Adapter `bundleSearchResultToShopProduct` a creer dans `src/utils/`

## Prochaines etapes
- Implementer SearchPage CategoriesFilter (adapter + fusion + layout sidebar + reset filtres) — priorite
- Resoudre le bug de double declaration XML sur S3
- Valider feed GMC dans GMC Sandbox (DataSources)
- Valider feed Klaviyo dans l'interface Klaviyo (catalog feed URL)
- Implementer feed Meta (`feeds/meta-${lang}.xml`) — RSS 2.0, `in stock` avec espaces
- Configurer S3 + CloudFront pour exposition publique des feeds
