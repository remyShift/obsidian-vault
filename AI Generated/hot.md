---
updated: 08-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
08-06-2026 — olis-lab : util `isValidLink` extrait (`lib/validateLink.ts`), applique sur AnnouncementBar + TradingPlan ; plan complet du futur global `navbar` valide (Hybride, liens explicites + app, fin scan produits). Plus tot : fixes review announce bar, hook SKU Design A, admin label subcategories.

## Projets actifs

### olis-lab
- Derniere session : 08-06-2026
- Etat : **Hook SKU (PR `feat/sku-hook-products-collection`)** — Design A applique en working tree (non commite) : `sku` `required: true` + `validate` custom (relache la creation, le hook `beforeValidate` genere au save) + readOnly, type regenere `sku: string`, `guardProduct` sku retire (rawRest), tests sku guard supprimes, test ZodError corrige (`err.cause instanceof ZodError`), **bouton "Generate SKU" + endpoint supprimes**. typecheck cms+shared OK, 13 tests cms + 68 shared verts. Cle : un champ Payload `required` ne peut pas etre rempli par un hook serveur seul (validation required cote client avant l'envoi) → la validate custom est ce qui permet le one-click publish. **Subcategories admin label (PR `feat/subcategories-payload-admin-label`)** : champ `adminLabel` localise + hook + migration backfill (38 locales local), standalone sur develop. Aussi : review PR #1793 (resolveBrand vs asserter, 4 options, choix Remy en attente) ; announce bar (PR #1784) ; trading plan (contenu prod EN+FR bloquant).
- Etat (suite) : **validation lien mutualisee** — util `isValidLink` (`lib/validateLink.ts`, format `/` ou `http(s)://`) applique sur AnnouncementBar (`link`) + TradingPlan (`ctaLink`), **commite + pousse** (`56d4c03ae` sur `origin/feat/announce-bar-global`). **Navbar (futur global)** — plan complet valide (`~/.claude/plans/`), PAS implemente : Hybride (top-level fige + sections array), liens explicites + `app`, fin scan produits, validate `path` via `isValidLink`, tout localise CMS, top-level non editable cette iteration (arbitrage Michele). Branchera depuis `feat/announce-bar-global`.
- Prochaine etape : brancher la navbar depuis `feat/announce-bar-global` puis implementer le global (`Navbar.ts` + register + types) + confirmer "fin scan produits" avec Michele ; SKU — commiter Design A + verif admin + review PR #1793 ; subcategories — repondre review + conflit `migrations/index.ts` au merge + backfill prod ; announce bar — commiter + repondre review.

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
