---
updated: 28-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
28-05-2026 — Commentaires de PR adresses : union howToUse supprimee, cartProduct migre vers Zod, tests consolides (describe.each), stories fix sans cast.

## Etat du projet
- Feed GMC : operationnel
- Feed Klaviyo : operationnel
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Guards Payload : PR prete a ouvrir (`feat/payload-type-inference-issue`), tsc clean, tests complets
- Trading plan CMS : Global finalise ; types Payload a regenerer ; integration web_client planifiee
- Page builder blocks : plan approuve, apres deadline trading plan

## Faits recents importants
- `TProduct['howToUse']` : plus de type union — optionnel simple, pas de branche par brand
- `howToUse` field-by-field : `instructions` required, `tip` optionnel, `am`/`pm` defaultes a false
- `cartProduct` : IIFE + 9 casts manuels -> `cartProductSchema.parse(...)` (Zod) ; `TCartProduct` derive du schema
- Variable shadowing (`const raw` dans IIFE) eliminee
- `describe.each` pour skinTypes/concerns/subcategories — 9 tests dont 3 nouveaux pour subcategories
- `as unknown as TProduct` dans stories -> `assertProduct(makeProduct({...}))` sans cast
- Fixtures exportees depuis le barrel `@olis-lab/shared/payload`

## Decisions actives
- `howToUse.instructions` = seul champ required ; `tip`/`am`/`pm` optionnels/defaultes
- `TCartProduct` et `TCartProductTranslation` derives du schema Zod uniquement
- `ZodError` (instanceof) dans les tests plutot que message exact
- Trading plan phase 1 avant le 1er juin (deadline imperative)
- Le guard est responsable de toute la narrowing — zero assertion de type dans les composants

## Prochaines etapes
- Ouvrir PR `feat/payload-type-inference-issue`
- Regenerer les types Payload : `pnpm run sync-payload-types` depuis `apps/cms/`
- Remplir `curationSettings` dans Payload et tester le sync -> legacy
- Executer plan integration `web_client` (SDK + hook + wiring Shop/Home)
- Ajouter `REACT_APP_PAYLOAD_CMS_URL` dans `.env.prod`
