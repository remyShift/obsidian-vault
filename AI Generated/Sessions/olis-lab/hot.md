---
updated: 11-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
11-05-2026 — Plugin traduction `@payload-enchants/translator` installé et fonctionnel avec OpenAI (gpt-4o-mini).

## Etat du projet
- Feed GMC : opérationnel, route `GET /sitemap/gmc-feed?lang=fr`, clé S3 `feeds/gmc-${lang}.xml`
- Feed Klaviyo : opérationnel, route `GET /sitemap/klaviyo-feed?lang=fr`, clé S3 `feeds/klaviyo-${lang}.xml`
- Feed Meta : pas encore implémenté
- Automatisation feeds : plan rédigé, pas encore implémenté
- Bug S3 double déclaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 août 2026
- Plugin traduction : installé et fonctionnel, bouton "Translate" actif sur 5 collections

## Faits recents importants
- `@payload-enchants/translator` installé dans `apps/cms`, `OPENAI_API_KEY` required dans Zod (fail fast)
- Workflow traduction : manuel (bouton UI), Suze relit — pas d'automatisation au save
- CRON (node-cron) retenu comme trigger primaire feeds — suffisant pour cadence pull Google (1x/jour)
- Legacy DB accessible (`src/lib/db/legacy.ts`) mais pas de script de seed Legacy → Payload
- Auth sur `/sitemap/*` identifiée comme prérequis sécurité avant mise en prod du CRON

## Decisions actives
- Traductions : plugin + bouton manuel, gpt-4o-mini, 5 collections (brands, categories, subcategories, product-actives, products)
- Trigger automatisation feeds : CRON node-cron (primaire) + admin button Payload (fallback manuel)
- Option A (Payload hook) = évolution future si fraîcheur temps-réel devient un besoin business
- Shared secret header sur `/sitemap/*` requis avant prod
- Pattern langue feeds : `?lang=fr|en`, clé S3 `feeds/{platform}-${lang}.xml`

## Prochaines etapes
- Résoudre bug S3 double déclaration XML (priorité #1, bloquant)
- Ajouter shared secret header sur les endpoints feed (sécurité)
- Implémenter CRON node-cron dans server Express (deux feeds)
- Ajouter bouton admin Payload "Regenerate feeds"
- Implémenter feed Meta (`feeds/meta-${lang}.xml`)
- Valider GMC + Klaviyo dans leurs sandboxes respectifs
