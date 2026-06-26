---
updated: 26-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
26-06-2026 — Plan validé (implémentation reportée) : 4 améliorations sur les globals Payload (`apps/cms`) — validation path navbar, traductions IA des globals, live preview admin, "Brands" éditable.

## État du projet
- **Plan globals validé (`~/.claude/plans/j-aimerais-faire-le-plan-cuddly-breeze.md`, NON implémenté)** :
  - **Task 1** : path navbar requis si item ET section non-disabled (la validation actuelle ignore `sectionDisabled`). Helper pur `isNavItemPathRequired(data, path)` via `data`+`path` du `ValidateOptions`.
  - **Task 2 (trivial)** : remplir `globals: ['navbar','announcement-bar','trading-plan']` dans le plugin `translator` (infra openAIResolver déjà là, bouton Translate fourni).
  - **Task 3** : route preview **unique interne au CMS** (`/preview/header`, même origine, zéro CORS) rendant announcement+navbar ensemble via `useLivePreview` + composants `packages/ui` (`Navbar` + `TopBanner`).
  - **Task 4** : groupe `brands` (label localisé + path validé) dans le global Navbar + wiring front (infra `getCmsNavLabels`/`resolveNavLabel` existe déjà, exclut juste brands). Remplace le hardcodé `ROUTES.hotBrands`.
- **Cart hook #1801 (TASK-1005, revertée)** : plan prêt (`~/.claude/plans/diego-a-revert-hier-lucky-truffle.md`), non implémenté. Réappliquer #1801 tel quel + 8 cas + 9ᵉ de constat. Skip explicite abandonné → follow-up guard `beforeValidate` (vrai bug déjà en prod).
- **Navbar PR #1839** : fix flag CMS=`null` fait (4 fichiers, verts), pas vérifié live ni commité. Sécu : `NEXT_PUBLIC_FEATURE_FLAGS_SECURE_API_KEY` fuit la personal API key → renommer server-only.
- **PR #1853 (TASK-1125, ouverte)** : `LockableTextField` sku/ean, review Diego traitée, réponse EN à poster, pas vérifié live.
- Autres : slug #1850, top banner, bulk-add, TASK-1115 SKU (meeting), RFC RBAC.

## Faits récents importants
- 3 globals seulement (navbar, announcement-bar, trading-plan), **pas de Footer** → footer hors scope.
- Navbar : composant dans `packages/ui` (legacy, props-driven) ET `apps/web` (vrai front, partiellement CMS). `packages/shared` = seulement `guardNavbar`.
- `TopBanner` d'`apps/web` non portable (couplé), mais `packages/ui/.../TopBanner/index.tsx` réutilisable directement.
- `validate` Payload donne `data`+`path` → accès aux ancêtres (section) que `siblingData` ne donne pas.
- Repo = `olis-lab/web-app`. Reviews IA de Diego = issue comments. Deux statuts produit : `_status` vs `status`.

## Décisions actives
- Globals : live preview = route interne CMS (pas `apps/web`), une seule route pour les 2 globals. Traduction IA sur les 3 globals. Navbar preview via `packages/ui` (tradeoff UI legacy). Footer exclu. Pas de TDD imposé sur Task 1.
- Cart hook : réintroduire #1801 tel quel + test 8+1, guard = follow-up. Lock par défaut sur `_status`, SKU non régénérable si Live.

## Prochaines étapes
- Implémenter le plan globals. Ordre : Task 2 → Task 1 → Task 4 → Task 3. `sync-payload-types` après schéma. Vérif live (env Node local cassé).
- PR #1853 : réponse Diego + vérif admin + commit/push. Navbar #1839 : vérif live + commit + renommer clé API exposée. Cart hook #1801 + follow-up guard.
- Reprendre slug #1850 / banner / bulk-add / SKU meeting / RFC RBAC.
