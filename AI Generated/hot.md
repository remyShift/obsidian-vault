---
updated: 10-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
10-06-2026 — olis-lab : QA finale PDP Next avant event 13:00 — 3 micro-fixes (Sélection personnalisée Your Lab réactivée, cursor-pointer navbar MARQUES, unité livraison "2-3 jours" i18n) prêts + typecheck vert, non commités. Plus tôt : fix délai CRA→PDP (PR #1804).

## Projets actifs

### olis-lab
- Derniere session : 10-06-2026
- Etat : **2 chantiers sur branche `fix/delay-between-cra-pdp`.** (1) QA finale PDP Next (`apps/web`, **non commité**) — 3 micro-fixes issus d'un thread Slack #tech : section "Sélection personnalisée" (Your Lab) réactivée (`navbarSections.ts`, retrait `sectionDisabled`+badge), `cursor-pointer` sur `NavItem` (curseur "MARQUES"), unité livraison localisée "2-3 days"→"2-3 jours" (`ShippingEstimate.tsx` + clé `daysUnit` dans `public/locales/{en,fr}.json`). Typecheck web vert, message PR rédigé, à relire par Rémy. Icônes non touchées (Kyle), bug switch-locale délégué à Kyle (cause : `NextIntlClientProvider` dans root layout cookie-based, pas re-rendu au `router.replace` ; fix = `router.refresh()`). (2) **PR #1804** fix délai clic→PDP : `isNavigatingAtom` + overlay racine `App.tsx` côté CRA, `loading.tsx` côté Next ; `cache()` getProduct reverté (Kyle valide plus tard). Vrai chemin PDP = `apps/web/app/[locale]/products/[id]/`. **Jamais de `Co-Authored-By: Claude`.** Threads en attente : tests `computeCartSnapshot` (`feat/cms-test-cart-hook`, à commiter), bulk-add Products→Edit (append vs replace), RFC typage Payload→frontend, 2 PRs adminLabel, SKU Design A, announce bar #1784.
- Prochaine etape : relecture Rémy des 3 micro-fixes → commit + push + PR (confirmer "brand"=item MARQUES, image Slack non vue) + vérif manuelle ; vérifier #1804 en vrai (`pnpm dev`, flag `isDevProductPageV2Enabled`) ; plus tard PR dedup `getProduct`. Puis reprendre les threads en attente.

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
