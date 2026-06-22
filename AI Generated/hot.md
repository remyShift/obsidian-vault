---
updated: 22-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
22-06-2026 - olis-lab : read navbar CMS dans apps/web (Next) + infra PostHog server-side reutilisable (eval locale, gate serveur navbar + announcement bar), commite sur `feat/next-read-payload-navbar`.

## Projets actifs

### olis-lab
- Derniere session : 22-06-2026
- Etat : **`feat/next-read-payload-navbar`** (commitée, branche du jour) : read navbar CMS dans **apps/web (Next)** gaté par `dev_payload_navbar` (fetch server-side `getNavbar` + gate) ; **infra PostHog server-side reutilisable** `apps/web/lib/posthog-server.ts` (`getServerFeatureFlag`, posthog-node eval LOCALE, `distinct_id` du cookie `ph_*`, `null` = defere au client) ; meme gate serveur sur l'announcement bar ; module partage `apps/web/lib/feature-flags.ts` (`TFeatureFlag` + `LOCAL_DEV_MOCKS`). Commits `df469abf9`/`975c1a550`/`a6b84e945`/`d73d28c2e`. **Working tree bascule sur `feat/cms-test-cart-hook`** (tests `computeCartSnapshot` 19/19 verts). Pieges : posthog-node pinné **`^4.18.0`** (v5 exige Node >=20.20, repo 20.19.5) ; pnpm refuse Node 21 → forcer node mise en PATH ; cle d'eval locale = **feature flags secure key `phs_`** (Project Settings → Feature Flags) dans env serveur **`NEXT_POSTHOG_PERSONAL_API_KEY`**, host EU `eu.i.posthog.com` ; config PostHog client cookieless `on_reject` + opt-out → cookie `ph_*` seulement pour consentis. Reste : Footer global (plan validé, pas codé), `fix/payload-slugs-generation` (slugify + migration + 27 redirects).
- Prochaine etape : créer la secure key `phs_` côté PostHog + env Amplify stage/prod ; trancher `sendFeatureFlagEvents` (commenté → défaut true, events sans flush peu fiables en serverless) ; `build` + vérif live (CMS :4000, navbar publié, cookie consenti) ; push `feat/next-read-payload-navbar` + PR. Footer = attendre 2 décisions review. Slugs = redirects CloudFront AVANT migration prod.

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
