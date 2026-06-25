---
updated: 25-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
25-06-2026 - olis-lab : fix bug navbar CMS labels (PR #1839, branche `feat/next-read-payload-navbar`) — labels d'onglets nav mobile ignoraient les overrides CMS (desktop OK) ; `resolveNavLabel` extrait en fonction pure partagée desktop/mobile dans `cmsNavbarSections.ts`. Bug Devin confirmé par Diego ; 2e commentaire Devin (revalidate 1h→24h) = faux positif. 3 fichiers non commités. (Plus tôt : fix slug PR #1850 finalisé, fix CI non commité.)

## Projets actifs

### olis-lab
- Derniere session : 25-06-2026
- Etat : **Fix navbar CMS labels (PR #1839, branche `feat/next-read-payload-navbar`, NON commité)** : labels d'onglets nav mobile (`NavbarMenu.tsx`) tapaient `t(item.labelKey)` en dur, ignorant les overrides CMS que le desktop respectait via `resolveNavLabel`. Fix : `resolveNavLabel(item, cmsLabels, t)` extrait en fonction pure dans `cmsNavbarSections.ts`, consommé par `Navbar.tsx` + `NavbarMenu.tsx` (prop `cmsLabels` ajouté) ; `tsc`+eslint clean. Bug confirmé par Diego ; 2e commentaire Devin (revalidate annonce 1h→24h) écarté (faux positif). next-intl non typé strict ici → threader `t: (key:string)=>string` dans un helper pur est OK. **Fix slug finalisé (commité `5a283e721`, fix CI non commité)** : génération déplacée dans un hook collection `beforeValidate` (`ensureProductSlug`/`ensureSubcategorySlug`, comme `generateProductSku`). Cause racine : Payload valide les champs **en parallèle** (`Promise.all`), donc un générateur de **champ async** (résout marque/catégorie via `findByID`) perd la course contre la validation `required` du slug → `400 "Slug invalid"`. Le natif s'en sort car synchrone. Checkbox slugField neutralisée, arg `slugify` gardé pour le bouton (awaité par `slugifyHandler`). Stabilisé (`if (data.slug || originalDoc?.slug) return`, génère au create, jamais de régen auto). Test de régression `productSlug.int.spec.ts`. CI rouge réglée (test créait 2 brands homonymes ; `Brand.name` unique, index appliqué en CI pas en local). 1ʳᵉ erreur `Promise cast` = build conteneur périmé (`/app` standalone, commit cassé `c1b516f18`). **RFC "Role-based access in Payload CMS"** (doc EN, à coller dans Notion) : pas de RBAC (Users auth nu, tous admin), protections champs UI-only, `TradingPlan`+sync endpoints ouverts à tout user authentifié ; reco `roles` sur `Users` + helpers `apps/cms/src/access/`, incrémental, pilote `slug`. **Top banner (planif)** : option non choisie, reco Option 3 (token `{freeShippingThreshold}` + helper `@olis-lab/shared`). **Bulk-add Products→Edit (planif)** : Approche B (composant + endpoint), `join` découplé (YAGNI). **TASK-1115 (SKU)** : PR auto-regen revertée (SKU = clé BigBlue, live changé → out-of-stock) ; reco D (duplicate) + B (correction). **Chantiers en attente** : `chore/remove-legacy-cra-checkout` (5 commits NON pushé) + `feat/footer-global-cra-read` (PR ouverte). Pieges : `mise exec` ne prime pas sur node 21 système (forcer PATH), Node 20.19, lint-staged+prettier au pre-commit ; `unique` Mongo non appliqué en test local.
- Prochaine etape : navbar — commit du fix PR #1839 (3 fichiers : `cmsNavbarSections.ts`, `Navbar.tsx`, `NavbarMenu.tsx`) + décider si répondre au thread Devin/Diego. slug — commit/push fix CI (→ verte) + rebuild/redéployer le conteneur CMS périmé + vérif bouton "Generate" en live + trancher figer la migration subcategory ; PR #1850 à finaliser. RFC RBAC — coller dans Notion + faire trancher l'équipe + ticket d'implé (TDD). Banner — trancher l'option ; bulk-add — décider l'implé B + répondre à Diego ; SKU — brief EN au meeting. En parallèle : push checkout branch + PR + e2e ; suivre retours PR footer ; rejouer seed stage/prod ; régénérer creds S3.

### ingredient-manager
- Derniere session : 08-06-2026
- Etat : back-office de notation produits Oli's Lab (matching INCI/COSING + scoring 10 regles R01-R10, sources shop/ewg/lancome). TS strict + Zod + Express 5 + Mongo + Next 14. Inspecte + documente en 4 notes de lecture. Dette : `ext-scoring.repo.ts` 3314 lignes (God file), abstraction par source qui fuit (`if shop else ext` dans le service), logique scoring dupliquee dans la couche data.
- Prochaine etape : si refacto, sortir la logique scoring des repos vers le domaine (point 1 du plan note 03) ; trier les notes Inbox (to-process).

### seed4t-perso
- Derniere session : 24-06-2026
- Etat : monorepo pnpm `remyShift/seed4t` (privé), domaine pur dans **`packages/domain`** (renommé depuis `core` ; nom de package resté `@seed4t/core` → à aligner). **PR #2 mergée**, 14 tests verts. Deps stockées **par nom** (`string[]`) → catalog = source de vérité ; `build()` throw sur dépendance inconnue ; helper `uniqueBy` ; garde-fou CI `verify:exports` (le `main` doit exister après build). **Modèle acté** : brick = package npm, grappe = brick + deps ; transitivité profonde/cycles = terrain TDD hors besoin produit (grappes réelles plates). Le domaine résout mais ne **produit rien** encore.
- Prochaine etape : **Phase 3 = output `package.json`** (`Recipe` + sérialisation), le vrai cœur V1 manquant ; puis Phase 2 versions (latest + ranges, port `IVersionResolver`) ; T12 deps vs devDeps ; aligner `@seed4t/core`→`@seed4t/domain`.

### ts-seed (predecesseur, repo mob)
- Derniere session : 29-05-2026
- Etat : boilerplate Next.js + vitest, docs/skills en anglais, plan TDD premiere brique valide, zero code metier encore
- Prochaine etape : remplace par seed4t-perso pour le travail solo

### piqure
- Derniere session : 19-05-2026
- Etat : PR has() prete a merger (squash a faire), PR circular deps a ouvrir
- Prochaine etape : squash + merge has(), puis ouvrir circular deps

### obsidian-vault
- Derniere session : 24-06-2026
- Etat : **Harnais shell stable** (fish + dotfiles 100% chezmoi `remyShift/dotfiles` + Brewfile). Ajout de 5 alias git fish (`gf`, `gm`, `glgg`, `gsta`, `gstp`) dans `~/.config/fish/conf.d/aliases.fish` ; note `Code/Setup Shell.md` recalée sur le contenu réel (2 tables : binaires boostés + git, 11 alias git) ; push chezmoi `ac3b254`. Workflow dotfile = éditer la source chezmoi → `chezmoi apply <fichier>` → `chezmoi git -- add/commit/push`. **Splashboard stabilisé, tout statique** (2 dashboards home/project, `ANIMATION_WINDOW` 2s codée en dur, hook cd `--on-cd`, token github via `~/.splashboard/secrets.toml`). Découverte récurrente : Bash de Claude = zsh figé sans TTY (ne rend pas les TUI).
- Prochaine etape : **Rémy : régénérer le token GitHub** (compromis via screenshot, scope `notifications`) + réécrire `secrets.toml`. Reste (Rémy) : sudo python.org, rotation mdp Mongo Atlas, suppr backup `~/shell-migration-backup-*`, tester `/coach`. Optionnel : splash home hors-repo (fish custom), widget PR titre-seul (ReadStore), `yazi`, pimp `starship.toml`.

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
- Korea move : test de 3 mois a Seoul a planifier dans les prochains mois ; prevoit changer de PC a ce moment (→ dotfiles chezmoi = env reconstructible en 4 commandes)
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
