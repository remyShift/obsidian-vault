---
updated: 12-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
12-06-2026 — Review de Kyle sur PR #1784 (announce bar) traitée (3 fixes commités) + conflits avec develop résolus, PR MERGEABLE.

## État du projet
- **PR #1784 `feat/announce-bar-global`** : Kyle a approuvé ("couple little things"), ses 3 commentaires traités (commit `70ff71c47`) :
  1. RowLabel CMS en `ul > li` (style inline flex/list-none pour rester sur une ligne).
  2. `isExternalLink` extrait vers `packages/shared/src/routing.ts` (`EXTERNAL_LINK_REGEX` + helper), importé via `@olis-lab/shared/routing` dans `useTopBannerMessages.tsx`.
  3. Liens externes du banner : `target="_blank"` + `rel="noopener noreferrer"`.
- Conflits avec develop résolus par merge (`c9e9b4f19`, poussé). `App.tsx` : refacto banner conservée + overlay navigation `isNavigatingAtom` (#1804) repris de develop. PR = MERGEABLE, mais BLOCKED par branch protection (re-approve Diego manquant, changes requested du 03/06).
- Typechecks verts (`web_client`, `cms`, `shared`) post-merge.

## Faits récents importants
- Le commentaire SEO ul>li de Kyle était ancré sur le RowLabel **admin** Payload (SEO sans objet) ; le rendu public est `packages/ui/TopBanner`. Probable erreur de fichier de sa part.
- `@olis-lab/shared/routing` existe en subpath export (déjà utilisé par `useAppNavigate`) → maison des helpers liens/routes.
- Develop a ajouté le plugin Sentry dans `payload.config.ts` (`@payloadcms/plugin-sentry`).
- Piège `engines.node` : `pnpm install` racine échoue sous Node v25 → `export PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH"`.
- Jamais de `Co-Authored-By: Claude` dans commits/PRs.

## Décisions actives
- ul > li appliqué littéralement au RowLabel CMS (arbitrage Rémy) malgré bénéfice SEO nul ; transparence à prévoir avec Kyle sur le thread.
- `validateLink.ts` (CMS) non touché malgré regex similaire : périmètre validation admin différent.
- Conflits résolus par merge de develop (pas de rebase), cohérent avec l'historique branche.

## Prochaines étapes
- Répondre aux 3 threads de Kyle sur #1784 ; clarifier le point SEO (RowLabel admin vs TopBanner public).
- Obtenir le re-approve de Diego pour merger #1784.
- Vérif visuelle : row label admin + lien externe nouvel onglet (flag `isDevAnnouncementBarEnabled`).
- Threads en attente : tests `computeCartSnapshot` (`feat/cms-test-cart-hook`), bulk-add Products→Edit, RFC typage Payload→frontend, 2 PRs adminLabel, SKU Design A.
