---
updated: 04-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
04-05-2026 — SearchPage étendue à 4 onglets (Products, Articles, Bundles, Actives) + pattern map pour le rendu des onglets.

## État du projet
- SearchPage : 4 onglets opérationnels, architecture extensible (ajout d'un onglet = 1 entrée dans la map + 1 query)
- Phase architecture feeds XML : structure définie (GMC, Meta, Klaviyo), en attente d'implémentation et POC sandbox
- Migration Content API v2.1 → Merchant API avant le 18 août 2026

## Faits récents importants
- `useSearchPageQuery` retourne maintenant `{ products, articles, bundles, actives }` — toutes les collections search en un hook
- Bundles : `ProductsGrid` réutilisé via mapper inline `BundleSearchResult → MappedProduct`, `onAddToBag` navigue vers `/bundle/${slug}`
- Actives : `ActiveSearchCard` avec SCSS module propre (style identique à `ActiveArticleCard` mais isolé)
- Pattern map `tabContent[activeTab] ?? null` — plus de blocs conditionnels répétés
- GMC + Meta partagent le format RSS 2.0, Klaviyo requiert flat XML — 3 feeds distincts obligatoires

## Décisions actives
- Pattern map pour les onglets SearchPage : extensible sans toucher au JSX
- `ProductsGrid` pour les bundles en search (cohérence visuelle avec l'onglet Products)
- 3 feeds XML distincts depuis Payload (gmc, meta, klaviyo) sur S3 + CloudFront
- POC sandbox requis avant suppression du code Content API v2.1

## Prochaines étapes
- Tester visuellement les 4 onglets SearchPage en conditions réelles
- Implémenter le service `feedGenerator` (Payload → XML x3)
- Configurer S3 + CloudFront pour les feeds
- POC sandbox : GMC DataSources + Meta + Klaviyo
- Valider critères go/no-go avant de virer l'ancien code Content API
