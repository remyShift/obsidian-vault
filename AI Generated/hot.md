---
updated: 25-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
25-06-2026 - olis-lab : feature unlock champs identite Products (PR ouverte `refactor/unlock-availability-ean-sku-fields`) — SKU/EAN sur composant partage `LockableTextField` (lock/unlock + bouton Generate SKU reutilisant le tuyau slug natif `field.custom.slugify`/`slugifyHandler`), slug remonte hors sidebar dans la zone identite, `CreateOnlyTextField` supprime, fix bug accents SKU (`OLIS-MIMET…`). (Plus tot aujourd'hui : navbar CMS labels PR #1839 + slug PR #1850.)

## Projets actifs

### olis-lab
- Derniere session : 25-06-2026
- Etat : **Feature unlock champs identite Products (PR ouverte, branche `refactor/unlock-availability-ean-sku-fields`)** : SKU/EAN sur composant partage `LockableTextField` (`apps/cms/src/components/`) — verrouille a l'ouverture, bouton Unlock pour edition manuelle, bouton Generate pour le SKU (`canGenerate` + `computeProductSku` branche sur `field.custom.slugify` → reutilise `slugifyHandler` natif, zero endpoint). Slug : `slugField` natif garde, sorti de la sidebar (`delete field.admin.position`), place sous l'identite. `CreateOnlyTextField` supprime. Lock = `useState` ephemere **non persiste**, relock au publish/republish via `useFormProcessing`+`_status` (au render, pas en effet), save draft = no-op ; EAN desormais verrouille meme en draft. **Fix bug accents SKU** (`OLIS-MIMET7-8332` au lieu de `OLIS-MIMET…` avec accent) : `stripDiacritics` extrait de `@/lib/slugify`, reutilise par `buildSku` → repare bouton ET auto-gen ; 2 tests `buildSku.test.ts` RED→GREEN. tsc+eslint+31 unit verts, **pas verifie en live**. Decouvertes : lock SlugField = client non persiste ; `slugifyHandler` lit `custom.slugify` de tout champ ; `Button margin={false}` enleve le gap vertical ; CSS global d'un composant client non bundle par Next (→ flex inline). Pieges env : shell Node 26 vs pin 20.19, `mise exec`→node Homebrew 25 casse (`generate:importmap` KO local). **Avant** : fix navbar CMS labels (PR #1839, `resolveNavLabel` fonction pure partagee desktop/mobile, 3 fichiers NON commites) ; fix slug PR #1850 (`5a283e721`, gen en hook collection `beforeValidate`, fix CI non commite). En attente : top banner (Option 3), bulk-add (Approche B), TASK-1115 SKU (meeting), RFC RBAC (Notion), checkout/footer.
- Prochaine etape : verifier en live unlock/Generate/relock + suivre PR `refactor/unlock-availability-ean-sku-fields` ; commit fix navbar (PR #1839, 3 fichiers) + decider thread Devin/Diego ; commit/push fix CI slug → finaliser PR #1850 + rebuild conteneur CMS ; trancher migration subcategory ; RFC RBAC dans Notion ; reprendre banner/bulk-add/SKU.

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
