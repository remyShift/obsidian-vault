---
updated: 17-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
17-06-2026 — olis-lab : plan validé pour une nouvelle global Payload `footer` (contenu éditorial du footer, image incluse) ; 2 questions laissées ouvertes sur le ticket. PR slugify toujours en review.

## Projets actifs

### olis-lab
- Derniere session : 17-06-2026
- Etat : **Footer global (plan validé, pas codé)** : nouvelle global Payload `footer` centralisant image de fond + newsletter + colonnes de liens + liens légaux + réseaux sociaux + tagline + copyright, calquée sur `AnnouncementBar`/`TradingPlan`. Liens INCLUS en CMS (choix Rémy), icônes/logo restent en code, section "More" via flag `visibility`. 2 questions OUVERTES sur le ticket (`target` éditable vs rôle vs dérivé du path ; année copyright). Seed non bloquant (feature flag). En parallèle **`fix/payload-slugs-generation` (PR ouverte)** : fix slugify (util `slugify.ts` + migration `20260617_100000_fix_slugs.ts`, 27 redirects, Misaj non auto). Autres branches en attente : `feat/read-announcement-bar-next` (#1817) ; `feat/navbar-global` (PR à ouvrir). Pièges : Node 20 via nvm, rebuild dist shared, brancher depuis `origin/develop`.
- Prochaine etape : footer = attendre décisions review (2 questions) puis coder global + guard + fetch web/legacy. Slugs = suivre review PR ; séquence prod = redirects CloudFront (Michele/Diego) AVANT migration → migration prod → propagation legacy via sync (26 produits) → re-save Misaj. Puis #1817 + PR navbar.

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
- Derniere session : 15-06-2026
- Etat : harnais enrichi depuis Kenjaku. RAG semantique local operationnel (`~/vault-rag/`, embedder in-process gratuit, serveur MCP `vault-rag` global, 1003 docs). Skill `/coach` (Radical Candor) cree. Boucle de friction auto-capture (regle globale) + commande `/improve`. Delegation sous-agents passee en regle globale (anti context-rot). `/lint` supprime. lean-ctx retire partout.
- Prochaine etape : tester `/coach` en reel ; optionnel ajouter vault aux additionalDirectories + permissions mcp__vault-rag__* ; investiguer hook SessionStart qui plante ; prochain /evolve vendredi 20-06

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
