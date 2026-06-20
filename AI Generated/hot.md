---
updated: 20-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
20-06-2026 — obsidian-vault : migration complète zsh → fish (fish en login shell, pnpm câblé, `.zshrc`/oh-my-zsh supprimés) + passe /evolve appliquée + skill /evolve durci.

## Projets actifs

### olis-lab
- Derniere session : 19-06-2026
- Etat : **`feat/cms-test-cart-hook`** : tests d'intégration `computeCartSnapshot` réparés (19/19 verts, tsc clean), fix dans `apps/cms/tests/factories/product.ts` (produit bilingue + `legacyId` via faker) + assertion ajustée dans le spec ; **pas encore commité**, hook/schéma non touchés (= spec). **`feat/read-announcement-bar-next` (PR #1817)** : rename `onDismiss`→`handleDismiss` commité, merge `BLOCKED` côté GitHub malgré « c'est merge » de Rémy → à reconfirmer. **`feat/navbar-global` (PR #1822, OPEN)** : navbar en global Payload, siblingData typé via génériques + `TNavItem`, validateur scindé, `NAVBAR_STALE_TIME` 24h. **Footer global (plan validé, pas codé)**, 2 questions OUVERTES. **`fix/payload-slugs-generation`** : slugify + migration `20260617_100000_fix_slugs.ts`, 27 redirects, Misaj non auto. Pièges : `apps/cms` consomme `shared` via dist buildé → rebuild `shared` avant tests locaux ; Node 20 ; brancher depuis `origin/develop`. Convention : `handleX` (fonction) vs `onX` (prop). Hook cart : snapshot écrit seulement sur update d'un produit publié sans `skipCartSnapshot`.
- Prochaine etape : `feat/cms-test-cart-hook` décider de committer les fixes (+ optionnel `dependsOn:["^build"]` sur tâche turbo `test`). #1817 confirmer statut + résoudre thread Kyle + merger. #1822 push + threads + merge. Footer = attendre 2 décisions review. Slugs = redirects CloudFront AVANT migration → migration prod → sync legacy (26 produits) → re-save Misaj.

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
- Derniere session : 20-06-2026
- Etat : **migration zsh → fish terminée** (fish = login shell via `chsh` + `/etc/shells`, pnpm câblé dans `config.fish`, `.zshrc`/oh-my-zsh + tous reliquats zsh supprimés ; reste `.zshenv` = cargo + shims mise). Effet de bord : 2 pièges build olis-lab résolus (Node 20 sans `nvm use`, `rm -i` qui hangeait). Setup shell final dans `Notes Permanentes/Code/Setup Shell.md`. **Harnais vault durci** : /evolve appliquée (memory olis-lab, build traps, note Setup Shell) + skill /evolve durci contre les faux positifs d'audit (A1/A4 reclassés via `Audit clos`, pas via memory) + `/wrap` nettoyé.
- Prochaine etape : **commiter/pusher les dotfiles** (`chezmoi git -- add -A && commit && push`, 3 changements). Valider au prochain /evolve que A1/A4 ne remontent plus. Reste (Rémy) : sudo python.org, rotation mdp Mongo Atlas, suppr backup `~/shell-migration-backup-*`, tester `/coach`. Optionnel : `yazi`, pimp `starship.toml`.

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
