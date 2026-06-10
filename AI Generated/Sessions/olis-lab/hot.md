---
updated: 10-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
10-06-2026 — Fix UX du délai de redirection CRA → PDP Next.js sur la branche `fix/delay-between-cra-pdp` (PR #1804) : overlay de feedback au clic + `loading.tsx` Next. `cache()` sur `getProduct` retiré à la demande de Kyle.

## État du projet
- **PR #1804 `fix/delay-between-cra-pdp`** (branche renommée depuis `fix/navbar-nextjs`) : fix du délai sans feedback au clic produit vers la PDP Next.
  - Côté `web_client` : `isNavigatingAtom` (atom dédié, `stores/Loading.tsx`), set `true` dans `useAppNavigate.ts` avant `window.location.replace`, `LoadingComponent` plein écran monté à la racine de `App.tsx`. Pas de reset nécessaire (hard nav détruit l'app).
  - Côté `web` : nouveau `loading.tsx` dans `app/[locale]/products/[id]/`, calqué sur `secure-checkout/loading.tsx`.
  - Typecheck OK (`web` 0 erreur ; `web_client` 15 erreurs préexistantes hors fichiers touchés).
  - **`cache()` sur `getProduct` reverté** (commit `32c0b3f56`, sans co-auteur) : Kyle veut valider l'approche avant.
- Diagnostic : délai = hard nav (`window.location.replace`) + Server Component bloquant sans streaming. `getProduct` appelé 2× par rendu (`generateMetadata` + page).

## Faits récents importants
- Piège connu : `pnpm --filter ... typecheck` casse sur `engines.node` (Node v25 vs 20.19.x) → `./node_modules/.bin/tsc --noEmit` direct.
- Rename branche d'une PR ouverte : via UI/API GitHub (la PR suit), JAMAIS delete+recreate. Resync local : `git branch -m` + `git branch -u origin/<nouveau>`.
- **JAMAIS de `Co-Authored-By: Claude`** dans commits/PRs (préférence Rémy, mémorisée).
- Commit avec parenthèses/multiligne : utiliser `git commit -F fichier`, pas `-m "$(cat <<EOF)"` (zsh bug).
- `dist` de `@olis-lab/shared` gitignored → rebuild après checkout/pull sinon `cartProductSchema undefined`.

## Décisions actives
- Atom de navigation dédié (pas `loadingAtom`) pour ne pas polluer `pendingRequests` de l'intercepteur. Overlay monté à la racine pour feedback partout (Home incluse).
- Dedup `getProduct` via `cache()` → reportée à une PR dédiée après validation Kyle.

## Prochaines étapes
- Vérifier le fix en vrai : `pnpm dev`, flag `isDevProductPageV2Enabled` ON, cliquer carte produit (listing + Home) → overlay instantané puis PDP.
- Répondre au commentaire Kyle sur PR #1804 (clore la boucle).
- Plus tard : PR séparée pour la dedup `getProduct`.
- Threads antérieurs : tests `computeCartSnapshot` (`feat/cms-test-cart-hook`, à commiter), bulk-add Products→Edit (trancher append/replace), RFC typage Payload→frontend (call Kyle/Diego), 2 PRs adminLabel à merger, SKU Design A, announce bar 3 arbitrages, navbar.
