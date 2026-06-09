---
updated: 09-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
09-06-2026 — Tranché la proposition Michele (plugin Nested Docs) : pas la solution pour les adminLabel. Garder les 2 PRs (subcategories + edits product picker), abandonner Nested Docs. Réponse anglaise rédigée pour le commentaire PR.

## État du projet
- **adminLabel (2 PRs)** : `feat/subcategories-payload-admin-label` (#1798) + `feat/edits-product-picker-admin-label`. Même but : rendre le relationship picker cherchable via champ `adminLabel` dénormalisé + `useAsTitle`. Products = `title | brand | sku | subcat > cat`, Subcategories = `name > category`. Hook `beforeChange` + migration backfill + tests + escape hatch `skipAdminLabel`. **Correctes, indépendantes, à merger.**
- **Hook SKU (PR `feat/sku-hook-products-collection`)** : Design A en working tree (non commité), tests verts. À commiter + vérif admin + review PR #1793.
- **Validation lien mutualisée** : `isValidLink` (`lib/validateLink.ts`) commité + poussé (`56d4c03ae` sur `origin/feat/announce-bar-global`), appliqué announce-bar + trading-plan.
- **Navbar (futur global)** : plan validé, PAS implémenté. Branchera depuis `feat/announce-bar-global`.
- **Announce bar (PR #1784)** : fixes review Kyle appliqués, non commité, 3 arbitrages en attente Rémy.
- Migration GMC Content API → Merchant API avant le 18 août 2026.

## Faits récents importants
- Relationship picker Payload = recherche/affichage sur **un seul** champ (`useAsTitle`). Pas de multi-champs natif → champ label dénormalisé = réponse idiomatique. Nested Docs n'y change rien.
- Plugin Nested Docs = hiérarchie parent/enfant dans UNE collection (`parent` + `breadcrumbs`). Orthogonal au besoin, inutile pour le label produit.
- Relation produits↔edits vit sur `Edits.products` (`hasMany`). Aucun champ Product→Edits → Bulk Edit natif ne peut pas assigner depuis la liste Products.
- Nom migration Payload = format natif `YYYYMMDD_HHMMSS_name` (tri lexicographique, ne pas remplacer par epoch).

## Décisions actives
- Garder l'approche adminLabel, abandonner Nested Docs pour cette task.
- Workflow "multi-select liste Products → assigner Edit" = action bulk custom (`admin.components`), task séparée, pas un plugin. Court terme : assigner depuis le doc Edit avec picker amélioré.

## Prochaines étapes
- Merger les 2 PRs adminLabel + poster la réponse à Michele.
- Trancher si l'action bulk custom est prioritaire (qui peuple les Edits ? combien de produits/Edit ?).
- SKU : commiter Design A + vérif admin + review PR #1793.
- Navbar : brancher depuis `feat/announce-bar-global` puis implémenter le global.
- Announce bar : Rémy tranche les 3 arbitrages + commit.
