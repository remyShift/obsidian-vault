---
updated: 08-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
08-05-2026 — Plan Payload type narrowing redige, /evolve applique (memory Winalia créée, LyonCraft corrige, olis-lab workstreams mis a jour).

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`, cle S3 `feeds/gmc-${lang}.xml`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`, cle S3 `feeds/klaviyo-${lang}.xml`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- SearchPage : plan CategoriesFilter pret, implementation en attente
- Payload type narrowing : plan redige dans `.claude/plans/2026-05-08-payload-type-narrowing.md`, implementation en attente

## Faits recents importants
- Payload 3.79.1 a `typescript.typeSafeDepth: true` (dispo depuis v3.72.0) — opt-in, breaking change potentiel
- `typeSafeDepth` ne resout PAS le probleme `url?: string | null` sur les Media — probleme orthogonal
- `product.ts` a des helpers locaux (`assertPopulated`, `mapImageUrl`) que `computeCartSnapshot.ts` duplique avec casts inline `as Brand`
- `packages/shared` consomme par `apps/web` ET `apps/cms` — bon endroit pour centraliser les guards
- Search Page (CRA) : products + articles done, next = brands + actives (feat/search-page-others-collections)
- Translation Plugin : implemente (@payload-enchants/translator, gpt-4o-mini), OPENAI_API_KEY a copier

## Decisions actives
- Pattern langue : `?lang=fr|en`, cle S3 `feeds/{platform}-${lang}.xml`
- Validation mutualisee via middleware Joi, pas inline dans les controllers
- Payload narrowing : centraliser dans `packages/shared/src/payload/guards.ts` — `isPopulated`, `assertPopulated`, `WithUrl<T>`, `assertUrl`
- `typeSafeDepth` : spike sur branche isolee avant toute activation en prod
- XML feed : RSS 2.0 + namespace g:* unique pour GMC + Meta + Klaviyo, cron 4h, S3

## Prochaines etapes
- Implementer `packages/shared/src/payload/guards.ts` + migrer `product.ts` et `computeCartSnapshot.ts`
- Spike `typeSafeDepth: true` sur branche isolee (compter les erreurs TS avant de decider)
- Implementer SearchPage CategoriesFilter (adapter + fusion + layout sidebar + reset filtres) — priorite
- Resoudre le bug de double declaration XML sur S3
- Valider feed GMC dans GMC Sandbox (DataSources)
- Implementer feed Meta (`feeds/meta-${lang}.xml`) — RSS 2.0
