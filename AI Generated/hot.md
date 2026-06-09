---
updated: 09-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
09-06-2026 — olis-lab : tests d'integration du hook `computeCartSnapshot` (8 US, branche `feat/cms-test-cart-hook`) + branchement du schema Zod `cartProductSchema`. Plus tot : bulk-add Products->Edit (plan), RFC `PAYLOAD_FRONTEND_TYPING_RFC.md`, 2 PRs adminLabel.

## Projets actifs

### olis-lab
- Derniere session : 09-06-2026
- Etat : **Tests `computeCartSnapshot` (branche `feat/cms-test-cart-hook`)** — 8 US en tests d'integration purs (`tests/int/computeCartSnapshot.int.spec.ts`, vrai `payload.update`, suite int 15/15). Factory DB `tests/factories/product.ts` (media insere en brut). Hook : `cartProductSchema.parse` hors try (snapshot invalide -> bloque save ; infra error -> log+skip) + `createAsserter` ; `cartProductSchema` exporte runtime depuis shared ; `validate` `== null` field json ; `LOCALES` extrait `src/lib/locales.ts`. **Non commite** (2 commits deja sur la branche). `typescriptSchema` abandonne (mismatch zod 3 shared / zod 4 cms). Piege : `dist` shared gitignored -> rebuild avant `test:int`. Mongoose pluralise (`product-media`->`product-medias`). **Bulk-add Products->Edit (plan)** — `Edits.products` (`hasMany`) existe ; A vs B pas tranche (pivot append vs replace) ; image slots `~/Desktop/products-slots-annotated.png`. **RFC typage Payload->frontend (`PAYLOAD_FRONTEND_TYPING_RFC.md`, racine, untracked)** — asserter runtime ; root cause union `string|T` non narrow (cms separe + 2 fronts HTTP) ; reco wrapper SDK type + Zod + lint ; call Kyle/Diego. **adminLabel (2 PRs #1798 + edits-product-picker)** a merger ; Nested Docs abandonne. **Hook SKU** (Design A non commite). **Announce bar #1784** fixes Kyle non commites + 3 arbitrages. **Navbar** plan valide non implemente.
- Prochaine etape : relire + commiter `feat/cms-test-cart-hook` (rappeler rebuild shared avant test:int) ; trancher bulk-add (append -> B endpoint `POST /api/edits/:id/add-products` + `AddToEditButton.tsx`) ; partager RFC a Kyle/Diego + call ; merger 2 PRs adminLabel + reponse Michele ; SKU commiter Design A + review #1793 ; announce bar 3 arbitrages + commit ; brancher navbar.

### ingredient-manager
- Derniere session : 08-06-2026
- Etat : back-office de notation produits Oli's Lab (matching INCI/COSING + scoring 10 regles R01-R10, sources shop/ewg/lancome). TS strict + Zod + Express 5 + Mongo + Next 14. Inspecte + documente en 4 notes de lecture. Dette : `ext-scoring.repo.ts` 3314 lignes (God file), abstraction par source qui fuit (`if shop else ext` dans le service), logique scoring dupliquee dans la couche data.
- Prochaine etape : si refacto, sortir la logique scoring des repos vers le domaine (point 1 du plan note 03) ; trier les notes Inbox (to-process).

### ts-seed
- Derniere session : 29-05-2026
- Etat : boilerplate Next.js + vitest, docs/skills en anglais, plan TDD premiere brique valide, zero code metier encore
- Prochaine etape : implementer TypescriptBrickBuilder via TDD (strings brutes, laisser l'archi emerger du refactor)

### piqure
- Derniere session : 19-05-2026
- Etat : PR has() prete a merger (squash a faire), PR circular deps a ouvrir
- Prochaine etape : squash + merge has(), puis ouvrir circular deps

### obsidian-vault
- Derniere session : 08-06-2026
- Etat : `/evolve` rapport 05-06 applique (memory olis-lab reecrite, ts-seed + build-traps documentes, style LinkedIn enrichi, note Hexagonal completee). 3 audits en attente.
- Prochaine etape : traiter audits (A1 docs ts-seed perdus ?, A2 recap 22-05 mal range, A3 wikilinks Notes de Lecture/Code) ; prochain /evolve vendredi

### lyoncraft-2026
- Derniere session : 12-05-2026
- Etat : theming dark/light operationnel, slides en cours de finalisation
- Prochaine etape : remplacer placeholders (KicksFolio slide 19, LinkedIn slide 22), chronometrer les actes

### claude-obsidian
- Derniere session : 02-05-2026
- Etat : infra vault stabilisee (PostCompact, hot cache deux niveaux, /recap, /autoresearch, Sommaire)
- Prochaine etape : tester /autoresearch sur sujet reel

### portfolio-gameboy-next
- Derniere session : 28-04-2026
- Etat : migration pnpm done (PR #37), PageTitle RSC extrait avec tests
- Prochaine etape : Tailwind 4 + ESLint 10 flat-config (backlog)

### winalia
- Derniere session : 28-04-2026
- Etat : audit tech + produit livre, prospection envoyee, en attente de retour
- Prochaine etape : si mission acceptee — Sprint 1 bloquants secu ; sinon archiver

## Contexte personnel actif
- Korea move : test de 3 mois a Seoul a planifier dans les prochains mois ; prevoit changer de PC a ce moment
- Freelance : mission Oli's Lab long terme, deadline migration GMC le 18 aout 2026
- LinkedIn ghostwriting : 2 posts rediges (reconversion valide, coreen/React en attente validation)
- LyonCraft 2026 : theming done, contenu finalise, script + timing restant

## Threads ouverts cross-projets
- PostHog olis-lab : flag `dev_search_page` retire du code, a archiver cote dashboard. Flickering trading plan fixe (3 etats flag + fetch eager), verif runtime fenetre privee a faire avant commit.
- XML feed olis-lab : feeds GMC + Klaviyo faits, automatisation planifiee (CRON), bug S3 bloquant
- Feed Meta olis-lab : pas encore implemente
- Trading plan CMS olis-lab : flag supprime + view-model Zod migre vers asserter partage `assertTradingPlan` (100% Payload) ; BLOQUANT remplir global prod (EN+FR) avant merge, sinon Home/Shop -> ErrorPage
- Page builder olis-lab : plan approuve, prochain gros chantier
- Winalia : statut juridique ANJ = question ouverte determinante avant toute mission
