---
updated: 15-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
15-05-2026 — Stratégie de test CMS rédigée (27 scénarios Gherkin, 5 zones) + ticket infrastructure test avec décision DB isolation.

## Etat du projet
- Feed GMC : opérationnel, route `GET /sitemap/gmc-feed?lang=fr`, clé S3 `feeds/gmc-${lang}.xml`
- Feed Klaviyo : opérationnel, route `GET /sitemap/klaviyo-feed?lang=fr`, clé S3 `feeds/klaviyo-${lang}.xml`
- Feed Meta : pas encore implémenté
- Automatisation feeds : plan rédigé, pas encore implémenté
- Bug S3 double déclaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 août 2026
- Plugin traduction : installé et fonctionnel, bouton "Translate" actif sur 5 collections
- Tests CMS : stratégie + infrastructure définie, implémentation pas encore démarrée

## Faits recents importants
- Plan de test rédigé : 27 scénarios Gherkin sur 5 zones critiques (computeCartSnapshot, 2 transformateurs, uniquePerCategory, sync endpoints)
- `mongodb-memory-server` écarté pour les tests Payload — adapter Mongoose nécessite une vraie connexion
- Approche retenue : DB dédiée `olis_lab_test` via env var, cleanup par tracking IDs en `afterEach`
- Payload n'a pas de doc officielle testing pour les app developers
- Message Discord rédigé pour valider l'approche avec la communauté Payload

## Decisions actives
- Tests : dedicated MongoDB test DB, seed via Local API, pas de factories pour l'instant
- Traductions : plugin + bouton manuel, gpt-4o-mini, 5 collections
- Trigger automatisation feeds : CRON node-cron (primaire) + admin button Payload (fallback)
- Shared secret header sur `/sitemap/*` requis avant prod
- Pattern langue feeds : `?lang=fr|en`, clé S3 `feeds/{platform}-${lang}.xml`

## Prochaines etapes
- Poster message Discord Payload + attendre retour Michele avant d'implémenter les tests
- Une fois validé : commencer par tests unit transformateurs (zéro infra)
- Résoudre bug S3 double déclaration XML (priorité #1, bloquant)
- Ajouter shared secret header sur les endpoints feed
- Implémenter CRON node-cron dans server Express
- Implémenter feed Meta (`feeds/meta-${lang}.xml`)
