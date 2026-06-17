---
updated: 16-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
16-06-2026 — olis-lab : diagnostic erreur prod sur le sync d'un Edit (`Product relationship is not populated`) — relation orpheline (produit supprimé, Payload renvoie l'ID string même à depth:1). Fix pensé, non implémenté (diagnostic seul demandé).

## Projets actifs

### olis-lab
- Derniere session : 16-06-2026
- Etat : 2 branches en cours. **`feat/read-announcement-bar-next` (PR #1817)** : review Kyle traitée et commitée (pas poussée) — carousel Embla **local** (le TopBanner de `@olis-lab/ui` casse le SSR), logique dans `useTopBannerMessages`, liens via `<ExternalLink>`, classes inline, `useFeatureFlags` au typage simplifié ; **anim à confirmer en runtime** (structure DOM calquée sur `FooterTrustBar`, la réf Embla qui marche dans Next). **`feat/navbar-global`** : global Payload `navbar` hybride + read CRA gaté `dev_payload_navbar` (legacy conservée, seed manuel), PR à ouvrir (sortir le commit `.env.local` `0281f9d23` avant). #1784 mergée. Pièges : brancher depuis `origin/develop` puis `git push -u origin X` ; `@olis-lab/ui` TopBanner casse le SSR ; cms consomme le dist de shared. Node 20.19.6 via nvm.
- Prochaine etape : **débloquer prod** — retrouver l'Edit référençant le produit supprimé `69e11655b772ed2f05ac8516` (API `?where[products][in]=` / mongosh), le retirer en admin, relancer le sync ; **fix durable de `edits.ts`** (filtrer l'orphelin comme `products.ts`, garder throw `legacyId`) en TDD quand demandé. Puis : vérif anim TopBanner + pousser #1817 ; ouvrir PR navbar (sortir `0281f9d23`) + remplir global admin (EN+FR).

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
