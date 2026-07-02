---
updated: 02-07-2026
project: olis-lab
tags: [hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
02-07-2026 — `ProductActives.name` localisé + migration EN→FR (PR #1870). Review Diego traitée (driver natif → `payload.find`), désaccord read/write tranché par test d'intégration jetable. **Bug détecté sur la branche : le find a perdu `pagination:false, limit:0` → 10 docs max.**

## État du projet
- **PR #1870 ouverte** (`refactor/cms-add-localized-name-products-actives` → develop) : `localized: true` sur `ProductActives.name` + migration `20260702_110143` (normalise EN puis traduit/écrit FR via resolver `openai`, logs mapping par doc). Commits poussés par Rémy : `b606a27ad` (rewrite payload.find), `772ae8a5f` (logs). Rémy est repassé sur `develop` en local. Migration **pas exécutée**.
- Verdict empirique (test int 3 cas, supprimé) : un read localisé sert le scalaire legacy tel quel ; un write `fr` en premier **droppe l'original** (`{fr}` seul en base) ; en-first puis fr = OK. L'ordre EN-d'abord est load-bearing et commenté.

## Faits récents importants
- **À corriger avant d'exécuter : réintroduire `pagination: false, limit: 0` dans le `find` de la migration** (limite Payload par défaut = 10).
- Le PR body contient un gotcha faux (« reads return empty everywhere ») à réécrire ; 2 réponses EN pour les threads Diego rédigées, à poster.
- Write localisé = `mergeLocaleActions` reconstruit `{en,fr}` en indexant la valeur stockée ; une locale par `payload.update`.
- Harnais : trancher les internals Payload par spec int jetable (`tests/int`, `initPayload`, `.env.test` → `cms_test`) ; jamais `import('mongodb')` (bson 7 vs 6) → `payload.db.connection.base.Types.ObjectId`.

## Décisions actives
- Auto-traduction OpenAI malgré le risque INCI ; FR à relire dans l'admin (bouton translate dispo par doc).
- `down` no-op ; rollback réel = retirer `localized:true`. Collision d'unicité FR = warn + skip.

## Prochaines étapes
- **Fix `pagination/limit` de la migration**, corriger le PR body, poster les réponses Diego.
- Exécuter la migration sur `cms_local` localhost (`OPENAI_API_KEY` chargée), contrôler mapping + `skipped`, puis review/merge #1870.
- Curated PLP : backfiller `cartProduct` + drop-post-pagination + review/merge. Cart #1859 : CI + review Diego + merge, puis guard `beforeValidate` legacyId. Navbar #1839 : vérif live + commit + renommer clé API exposée. PR #1853 : réponse Diego + vérif admin. Plan globals (T2→1→4→3).
