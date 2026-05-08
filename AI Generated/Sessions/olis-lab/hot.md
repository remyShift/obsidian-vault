---
updated: 08-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
08-05-2026 — Plan Payload narrowing finalise apres recherche communautaire : `typeSafeDepth` (PR ouverte) ecartee, Payload SDK documente, consensus sur pattern `assertPopulated` confirme.

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`, cle S3 `feeds/gmc-${lang}.xml`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`, cle S3 `feeds/klaviyo-${lang}.xml`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- SearchPage : plan CategoriesFilter pret, implementation en attente
- Payload type narrowing : plan finalise dans `.claude/plans/2026-05-08-payload-type-narrowing.md`, implementation en attente

## Faits recents importants
- Pas de solution officielle pour les types generes Payload (`url?: string | null`, `string | T`) — limite fondamentale du generateur
- `typeSafeDepth` (PR #9782) : toujours ouverte, non disponible — ecartee du plan
- Payload SDK (PR #9463, mergee) : resout `string | T` cote REST uniquement, pas pour hooks CMS (Local API)
- Communaute Payload converge universellement sur pattern `deref`/`assertPopulated` — c'est le standard de facto
- `product.ts` a deja `assertPopulated` en local — a centraliser dans `packages/shared/src/payload/guards.ts`

## Decisions actives
- Pattern langue : `?lang=fr|en`, cle S3 `feeds/{platform}-${lang}.xml`
- Payload narrowing : Option A retenue — centraliser dans `packages/shared/src/payload/guards.ts`
- 4 utilities : `isPopulated`, `assertPopulated`, `WithUrl<T>`, `assertUrl`
- Spike `typeSafeDepth` abandonne — PR pas mergee
- XML feed : RSS 2.0 + namespace g:* unique pour GMC + Meta + Klaviyo, cron 4h, S3

## Prochaines etapes
- Implementer `packages/shared/src/payload/guards.ts` + migrer `product.ts` et `computeCartSnapshot.ts`
- Implementer SearchPage CategoriesFilter (adapter + fusion + layout sidebar + reset filtres) — priorite
- Resoudre le bug de double declaration XML sur S3
- Valider feed GMC dans GMC Sandbox (DataSources)
- Implementer feed Meta (`feeds/meta-${lang}.xml`) — RSS 2.0
