---
updated: 05-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
05-06-2026 — olis-lab : announce bar — fixes review PR #1784 (row, typage generique Payload, RowLabel) + integration CRA sous flag `dev_announcement_bar` (asserter, hook `useTopBannerMessages`, anti-flicker, fallback ancien si CMS vide, uppercase force dans composant `ui`). Non commite.

## Projets actifs

### olis-lab
- Derniere session : 05-06-2026
- Etat : Announce bar (PR #1784, branche `feat/announce-bar-global`) — 3 fixes review appliques (segments en `row`, `condition`/`validate` typés `satisfies Condition/Validate<...,TextField>`, RowLabel via type genere) + integration CRA sous flag `dev_announcement_bar` (asserter `assertAnnouncementBar`, hook `useAnnouncementBarQuery`, builder extrait dans hook `useTopBannerMessages` qui possede tout le contenu bannière, App.tsx allege ~70 lignes). REPLACE + fallback ancien si CMS vide ; anti-flicker (flagsReady + query loading) ; uppercase force dans `packages/ui` TopBanner (rebuild ui requis, dist gitignore). Typechecks verts, NON commite. ⚠️ working dir semblait revenu a un etat sans ces changements en fin de session -> verifier branche avant commit. En parallele : trading plan (refacto Zod->asserter, branche `refactor/remove-old-tradingplan-integration`, contenu prod a remplir) ; navbar Hybride PAS implemente ; picker Edits (migration a rejouer).
- Prochaine etape : verifier branche/fichiers + commiter announce bar + repondre aux 3 commentaires inline + re-demander review ; verif runtime CRA (flag OFF/ON, CMS vide->fallback, uppercase, liens, flicker) ; suivi integration Next.js TopBanner ; trading plan : remplir global prod (EN+FR) avant merge ; rejouer migration picker.

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
