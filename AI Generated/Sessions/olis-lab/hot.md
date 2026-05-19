---
updated: 19-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
19-05-2026 — Premier test d'intégration CMS écrit et passant sur la branche Diego (`chore/cms-int-tests-ci`), infra validée, discussion sur le couplage tests/framework engagée.

## Etat du projet
- Feed GMC : opérationnel, route `GET /sitemap/gmc-feed?lang=fr`, clé S3 `feeds/gmc-${lang}.xml`
- Feed Klaviyo : opérationnel, route `GET /sitemap/klaviyo-feed?lang=fr`, clé S3 `feeds/klaviyo-${lang}.xml`
- Feed Meta : pas encore implémenté
- Automatisation feeds : plan rédigé, pas encore implémenté
- Bug S3 double déclaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 août 2026
- Plugin traduction : installé et fonctionnel
- Tests CMS : infra en place (branche Diego), 5/5 tests passent, en attente validation avant merge

## Faits recents importants
- Infra de test Diego : `pool: 'threads'` + `singleThread + isolate: false` + `testTimeout: 30000`, DB par worker, `resetDb()` avant chaque fichier
- `tests/factories/category.ts` + `tests/factories/subcategory.ts` créés — `draft: false` obligatoire, `slug` toujours fourni explicitement (requis par les types Payload)
- Race condition identifiée dans `initPayload()` : deux `beforeAll` parallèles voient `cached = null` → double init — fix = cacher la Promise, pas le résultat
- Payload ne fournit aucun utilitaire de test officiel pour les app developers
- `uniquePerCategory` testable en unit pur avec `vi.fn()` sur `req.payload.find` — les tests d'intégration actuels testent surtout le framework Payload, pas notre logique

## Decisions actives
- Travailler sur la branche `chore/cms-int-tests-ci`, merger une fois Diego validé
- Tests intégration : `pool: 'threads'`, `singleThread: true`, `isolate: false`
- `uniquePerCategory` à reclasser en unit tests long terme (hors scope branche actuelle)
- Traductions : plugin + bouton manuel, gpt-4o-mini, 5 collections
- Trigger automatisation feeds : CRON node-cron (primaire) + admin button Payload (fallback)
- Shared secret header sur `/sitemap/*` requis avant prod

## Prochaines etapes
- Attendre retour Diego sur le message couplage tests
- Appliquer fix race condition `initPayload()` (cacher Promise)
- Écrire unit tests `uniquePerCategory` dans `tests/unit/`
- Écrire unit tests transformateurs (zéro infra, priorité après merge)
- Résoudre bug S3 double déclaration XML (bloquant)
- Ajouter shared secret header sur les endpoints feed
- Implémenter CRON node-cron dans server Express
- Implémenter feed Meta
