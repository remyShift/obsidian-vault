---
updated: 19-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
19-06-2026 — fixé les tests d'intégration CMS `computeCartSnapshot` (branche `feat/cms-test-cart-hook`) : 19/19 verts, factory rendue réaliste (bilingue + legacyId). Plus tôt dans la journée : reviews navbar (#1822) et announcement bar (#1817).

## État du projet
- **`feat/cms-test-cart-hook`** : tests d'intégration `computeCartSnapshot` réparés. Fix dans `apps/cms/tests/factories/product.ts` (produit bilingue + `legacyId` via faker) + ajustement d'une assertion dans le spec. **Pas encore commité.** Hook et schéma non touchés (ce sont la spec).
- **`feat/read-announcement-bar-next` (PR #1817)** : rename `onDismiss`→`handleDismiss` commité. Merge `BLOCKED` côté GitHub malgré « c'est merge » de Rémy → à reconfirmer (thread/CI).
- **`feat/navbar-global` (PR #1822, OPEN)** : navbar en global Payload, siblingData typé via génériques + `TNavItem`, validateur scindé `isValidInternalLink`/`isValidLink`, `NAVBAR_STALE_TIME` 24h. À push + merge.
- **Footer global** (plan validé, pas codé) : 2 questions review ouvertes.
- **`fix/payload-slugs-generation`** : slugify + migration `20260617_100000_fix_slugs.ts`, 27 redirects, Misaj non auto.

## Faits récents importants
- `apps/cms` consomme `@olis-lab/shared` via le **dist buildé** (pas le src, aucun alias tsconfig). Toute modif du barrel `packages/shared/src` exige `pnpm turbo run build --filter=@olis-lab/shared` avant de tester en local. Dist gitignoré.
- CI : le job `cms-int-tests` rebuild `shared` avant `pnpm test:int` → la cause « dist périmé » est purement locale, jamais en CI.
- Hook `computeCartSnapshot` = `beforeChange` sur Products : écrit le snapshot **seulement sur update d'un produit publié sans `skipCartSnapshot`**. Create = TODO no-op. `legacyId` (ObjectId Mongo legacy posé par la sync) sert de `_id` au snapshot.
- Convention : `handleX` (fonction définie) vs `onX` (nom de prop).

## Décisions actives
- Un snapshot cart **doit être bilingue** (en + fr) : schéma = spec, on corrige les fixtures.
- NE JAMAIS committer/pusher sans demande explicite. Jamais de `Co-Authored-By: Claude`.

## Prochaines étapes
- `feat/cms-test-cart-hook` : décider de committer les fixes (factory + spec).
- Dette (optionnel) : `dependsOn: ["^build"]` sur la tâche turbo `test` ou un `pretest` qui build `shared`.
- #1817 : reconfirmer le statut réel, résoudre le thread Kyle, débloquer, merger.
- #1822 : push + résoudre threads + merge.
- Footer : attendre les 2 décisions review puis coder.
