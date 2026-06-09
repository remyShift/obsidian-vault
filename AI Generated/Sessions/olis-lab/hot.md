---
updated: 09-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
09-06-2026 — Planifié la feature bulk-add "Add selected Products to an Edit" (plan mode, comparatif Approche A vs B), vérifié les APIs Payload 3.84.1 et produit une image annotée des slots d'injection de la list view. Plus tôt : RFC typage Payload→frontend + 2 PRs adminLabel.

## État du projet
- **Bulk-add Products→Edit (en planification)** : `Edits.products` (`hasMany`) existe déjà → aucun changement de schéma requis. Plan EN dans `~/.claude/plans/en-suivant-le-template-rustling-toucan.md`. Approche **pas tranchée** (A : champ relation `Products.edits` + bulk-edit natif ; B : composant `admin.components` + endpoint custom). Image des slots : `~/Desktop/products-slots-annotated.png`.
- **RFC typage Payload→frontend (`PAYLOAD_FRONTEND_TYPING_RFC.md`, racine, untracked)** : périmètre = asserter runtime. Root cause = `apps/cms` déployé séparé → 2 fronts (`web` Next + `web_client` CRA) sur `@payloadcms/sdk` HTTP → union `string|T` non narrow. 6 options, axe = wrapper client (Opt 3) vs DTO serveur (Opt 4). Reco : wrapper SDK typé (depth par méthode) + Zod interne + lint.
- **adminLabel (2 PRs)** : `feat/subcategories-payload-admin-label` (#1798) + `feat/edits-product-picker-admin-label`, champ `adminLabel` dénormalisé + `useAsTitle`. Correctes, indépendantes, à merger. Nested Docs abandonné.
- **Hook SKU (PR `feat/sku-hook-products-collection`)** : Design A en working tree (non commité), tests verts.
- **isValidLink** poussé (`56d4c03ae` sur `origin/feat/announce-bar-global`). **Navbar** plan validé, pas implémenté. **Announce bar (PR #1784)** fixes Kyle non commités, 3 arbitrages en attente.

## Faits récents importants
- Bulk-add : le vrai pivot = **append vs replace**, pas la direction de la relation. L'append force du code custom ; le bulk-edit natif ne fait que remplacer (PATCH + force `_status:published`).
- Tous les slots `admin.components` de la list view (`beforeList`, `Description`, `listMenuItems`, `beforeListTable`, `afterListTable`) sont dans le `SelectionProvider` → `useSelection()` marche partout. **Aucun slot public** dans la barre native "X selected / Edit / Delete".
- Approche A casse le sync (transformer lit `Edits.products`) sauf à inverser la source de vérité.
- L'union `string|T` des relations Payload n'est narrow ni par le SDK ni par la Local API, quelle que soit la depth.

## Décisions actives
- Bulk-add : attendre l'arbitrage de Rémy (append → B forcé ; replace acceptable → A possible mais inverse la source). Picker cible = `useListDrawer` sur `edits`. Placement reco = `beforeListTable` ou `listMenuItems`.
- Garder adminLabel, abandonner Nested Docs. RFC = doc de discussion, trancher au call Kyle/Diego.

## Prochaines étapes
- Trancher l'approche bulk-add (append vs replace). Si B : endpoint `POST /api/edits/:id/add-products` (dedupe+merge, `overrideAccess:false`+`user`, préserver `_status`) + composant `AddToEditButton.tsx` + register config + `generate:importMap`.
- Merger les 2 PRs adminLabel + répondre à Michele.
- Partager le RFC à Kyle/Diego, préparer le call (Opt 3 vs Opt 4 ; argument migration Merchant API 18 août ; périmètre reshaping wrapper).
- SKU : commiter Design A + vérif admin + review PR #1793.
- Brancher la navbar depuis `feat/announce-bar-global` ; announce bar — trancher les 3 arbitrages + commit.
