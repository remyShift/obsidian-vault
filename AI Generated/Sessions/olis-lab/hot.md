---
updated: 26-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
26-06-2026 — Enquête + plan (révisé après discussion Slack avec Diego) pour réintroduire la PR cart hook revertée (#1801, `computeCartSnapshot`) + un test de constat. Implémentation **reportée** par Rémy.

## État du projet
- **Cart hook #1801 (TASK-1005, REVERTÉE par Diego `8f03cb807`)** : plan prêt (`~/.claude/plans/diego-a-revert-hier-lucky-truffle.md`), pas implémenté. Le revert était **par précaution** (QA manuelle impossible dans l'admin Payload dev) — Rémy reconnaît qu'il n'était pas nécessaire. La PR contenait DÉJÀ le test d'intégration voulu (8 cas), qui **tourne en CI** (`ci.yml:101`, `mongo:7`, `pnpm test`). **Tranché avec Diego** : réappliquer #1801 **tel quel** (zéro modif du hook) + 8 cas + 9ᵉ cas de **constat** (publié sans legacyId → pas de snapshot, ne pas asserter le logger). Le « skip explicite » est **abandonné** → part dans le **follow-up guard**. Réapplication manuelle (revert auto KO, conflit `shared/index.ts`).
- **Follow-up "soon" (PR séparée, acté Diego)** : guard `beforeValidate` empêchant de publier/passer `Live` un produit sans legacyId. Vrai fix du bug **déjà observé en prod** (signalé par Suze Laverack).
- **Navbar PR #1839 (`feat/next-read-payload-navbar`, apps/web)** : bug navbar/announcement CMS = `null` permanent **corrigé** (éval flag serveur avec id constant `'server-side'`, retrait `onlyEvaluateLocally`, mock rebranché sur `NODE_ENV` via `getLocalFlagFallback`). 4 fichiers, tsc+eslint verts, **pas vérifié live** (env Node cassé), **pas commité**. Sécurité : `NEXT_PUBLIC_FEATURE_FLAGS_SECURE_API_KEY` fuite la personal API key dans le bundle → renommer server-only + Amplify.
- **PR #1853 (`refactor/unlock-availability-ean-sku-fields`, TASK-1125, OUVERTE)** : `LockableTextField` (sku+ean), lock = `_status==='published'`, Generate SKU masqué si `status==='Live'`. Review IA de Diego traitée (5 findings), réponse EN à poster, pas vérifié live.
- Autres ouverts : slug #1850 (fix CI + rebuild conteneur), top banner, bulk-add, TASK-1115 SKU (meeting), RFC RBAC, checkout/footer.

## Faits récents importants
- Repo = `olis-lab/web-app`. Reviews IA de Diego = **issue comments** (`gh api repos/olis-lab/web-app/issues/<n>/comments`).
- `legacyId` = simple champ texte recopié dans `cartProduct._id` ; en test la factory le pose (`faker.database.mongodbObjectId()`). Rien à mocker côté backsync.
- Deux statuts produit : `_status` (Payload draft/published, sert au lock) vs `status` (commercial `Live`/`Staged`/`Offline`, sert au blocage regen SKU).
- `cartProductSchema._id` = regex 24-hex → produit non-backsyncé fait throw le `parse` → bug latent (skip implicite + log bruyant).

## Décisions actives
- Cart hook : réintroduire code prod #1801 **tel quel** (pas de skip explicite) + test 8+1 cas de constat. Manuel, branche propre, pas de revert auto. Guard `beforeValidate` = follow-up séparé.
- Lock par défaut basé sur `_status`. SKU non régénérable si `status==='Live'` (Generate masqué). Flag de migration = on/off serveur (id constant), pas de ciblage par-user.

## Prochaines étapes
- Cart hook : implémenter le plan révisé quand Rémy le décide (réintro #1801 tel quel + 8+1 tests) ; vérifier d'abord que `legacyId` n'est pas required au publish. Puis follow-up guard `beforeValidate`.
- Navbar #1839 : vérif live (Node 20) + commit/push 4 fichiers + commentaire EN + renommer clé API exposée.
- PR #1853 : poster réponse EN à Diego + vérif admin + commit/push + trancher gel total SKU si Live.
- Reprendre slug #1850 / banner / bulk-add / SKU meeting / RFC RBAC.
