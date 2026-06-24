---
updated: 24-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
24-06-2026 - olis-lab : cadrage de TASK-1115 (regeneration du SKU) suite au revert de Diego. Brief de decision EN ecrit (template ticket). Reco = decoupler duplicate (adminLabel) et correction (action manuelle downstream-aware), RBAC differe. A trancher en meeting Michele/Diego.

## Projets actifs

### olis-lab
- Derniere session : 24-06-2026
- Etat : **TASK-1115 (SKU)** cadré (pas de code) : la PR auto-regen-on-brand-change a été revertée car le SKU est la clé de jointure BigBlue (changer un SKU live → out-of-stock). Brief de décision EN écrit. Découvertes clés : repo ne pousse jamais de SKU vers BigBlue (read-only), aucun signal "live on BigBlue" (proxys `status`/`syncMetadata`), pas de RBAC (Users en auth nu). 2 bugs distincts : duplicate casse le SKU (` - Copy`) + pas de voie pour corriger un SKU publié. Reco : Option D (adminLabel) pour le duplicate, Option B (action manuelle) pour la correction, RBAC différé. **Chantiers en attente** : `chore/remove-legacy-cra-checkout` (5 commits, NON pushé) + `feat/footer-global-cra-read` (PR ouverte). Pieges : `mise exec` ne prime pas sur node 21 système (forcer PATH), Node 20.19, lint-staged+prettier au pre-commit.
- Prochaine etape : apporter le brief EN au meeting + trancher A vs B + RBAC avec Michele/Diego ; puis Diego planifie l'implé. En parallèle : push checkout branch + PR + e2e ; suivre retours PR footer ; rejouer seed stage/prod ; régénérer creds S3.

### ingredient-manager
- Derniere session : 08-06-2026
- Etat : back-office de notation produits Oli's Lab (matching INCI/COSING + scoring 10 regles R01-R10, sources shop/ewg/lancome). TS strict + Zod + Express 5 + Mongo + Next 14. Inspecte + documente en 4 notes de lecture. Dette : `ext-scoring.repo.ts` 3314 lignes (God file), abstraction par source qui fuit (`if shop else ext` dans le service), logique scoring dupliquee dans la couche data.
- Prochaine etape : si refacto, sortir la logique scoring des repos vers le domaine (point 1 du plan note 03) ; trier les notes Inbox (to-process).

### seed4t-perso
- Derniere session : 24-06-2026
- Etat : monorepo pnpm `remyShift/seed4t` (prive), `packages/core` domaine pur, Node 26.3.1 via `.tool-versions`, CI verte, `main` protege (PR + squash + check `build-and-test`). **TDD bien avance** sur branche `feat/enhance-domain-resolve-dependant` (pas encore commitee/PR). `src` decoupe en `Brick.ts`/`Catalog.ts`/`Cart.ts`/`index.ts`, tests dans `src/tests/`. 11 tests verts. `Catalog.resolve` = DFS recursif pre-order (`Set visited` anti-cycle + dedup intra). `Cart` = **modele roots** (`roots` source de verite, `bricks` getter derive via `flatMap(resolve)`). **Bug latent** : le getter ne deduplique pas entre roots (cas partage sort un doublon), masque par les assertions `arrayContaining`. Infra : hooks prefixent `$(mise where node)/bin` au PATH ; convention T/I ; `consistent-type-definitions: off`.
- Prochaine etape : corriger la dedup du getter (`get bricks()` par name) ; resserrer les assertions (`toHaveLength`) sur partage/diamant/circulaire ; commit + PR (1er passage du flux protege) ; puis roadmap versions (array + defaut « latest »).

### ts-seed (predecesseur, repo mob)
- Derniere session : 29-05-2026
- Etat : boilerplate Next.js + vitest, docs/skills en anglais, plan TDD premiere brique valide, zero code metier encore
- Prochaine etape : remplace par seed4t-perso pour le travail solo

### piqure
- Derniere session : 19-05-2026
- Etat : PR has() prete a merger (squash a faire), PR circular deps a ouvrir
- Prochaine etape : squash + merge has(), puis ouvrir circular deps

### obsidian-vault
- Derniere session : 21-06-2026
- Etat : **Splashboard stabilisé, tout statique**. 2 dashboards perso (home : date figlet, citation, countdown Corée, world clock, météo, calendrier, système, Hacker News ; project : nom repo, git live, mes PRs/reviews GitHub, analytics code). Hero `text_ascii` figlet `ansi_shadow` + citation `text_plain` centrée pleine largeur : rendu instantané car la fenêtre `ANIMATION_WINDOW` de 2s est codée en dur (tout widget animé gèle le terminal 2s, non réglable). Hook cd en `--on-cd` (splash project à la racine d'un repo, silencieux dans les sous-dossiers). `random_quote` mono-ligne (pas de word-wrap dans splashboard). Token github via `~/.splashboard/secrets.toml`. Doc `Code/Setup Shell.md`. Dotfiles `remyShift/dotfiles` (chezmoi). Découverte récurrente : Bash de Claude = zsh figé sans TTY (ne rend pas les TUI).
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
