---
updated: 04-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
04-06-2026 — olis-lab : flag `dev_payload_trading_plan` supprime (trading plan 100% Payload) PUIS migration du view-model Zod vers l'asserter partage `assertTradingPlan` (forme resolue imbriquee, TDD). Non commite.

## Projets actifs

### olis-lab
- Derniere session : 04-06-2026
- Etat : flag `dev_payload_trading_plan` retire (Payload only ; isLoading->LoadingComponent / isError->ErrorPage / sinon data). Fallbacks en dur + SCSS `var(--bg-img)` sans fallback + `home-*.png`/`popular-category-*.png` + cles i18n orphelines (4 locales) supprimes. View-model Zod `tradingPlanSchema.ts` SUPPRIME -> asserter partage `assertTradingPlan` (`packages/shared/.../guardTradingPlan.ts`, forme resolue imbriquee, TDD 8/8), 9 composants lisent `image.url`/`brand.slug`. Props explicites (pas de spread). dist rebuild, typecheck vert. NON commite, branche `refactor/remove-old-tradingplan-integration`. En parallele : announce bar (PR ouverte) ; navbar Hybride PAS implemente ; picker Edits (migration a rejouer).
- Prochaine etape : BLOQUANT remplir global `trading-plan` prod (EN+FR) avant merge sinon Home/Shop -> ErrorPage ; verif runtime + backgrounds desktop/mobile ; archiver flags `dev_payload_trading_plan` + `dev_search_page` (PostHog) ; traiter 15 echecs pre-existants `guardProduct.test.ts` ; commit ; implementer global navbar ; rejouer migration picker.

### ts-seed
- Derniere session : 29-05-2026
- Etat : boilerplate Next.js + vitest, docs/skills en anglais, plan TDD premiere brique valide, zero code metier encore
- Prochaine etape : implementer TypescriptBrickBuilder via TDD (strings brutes, laisser l'archi emerger du refactor)

### piqure
- Derniere session : 19-05-2026
- Etat : PR has() prete a merger (squash a faire), PR circular deps a ouvrir
- Prochaine etape : squash + merge has(), puis ouvrir circular deps

### obsidian-vault
- Derniere session : 18-05-2026
- Etat : Sommaire LinkedIn enrichi (score pondere, section sans impressions), 275 posts renommes
- Prochaine etape : completer impressions manquantes, traiter Inbox/Rust/, alimenter Infra/

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
