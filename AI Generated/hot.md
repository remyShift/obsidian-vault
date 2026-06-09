---
updated: 09-06-2026
tags: [meta, hot-cache, global]
---

# Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

## Derniere activite
09-06-2026 — olis-lab : planifie la feature bulk-add "Add selected Products to an Edit" (plan mode, comparatif Approche A champ relation + bulk-edit natif vs B composant + endpoint custom), verifie les APIs Payload 3.84.1 et produit une image annotee des slots d'injection de la list view. Plus tot : RFC `PAYLOAD_FRONTEND_TYPING_RFC.md` + 2 PRs adminLabel.

## Projets actifs

### olis-lab
- Derniere session : 09-06-2026
- Etat : **Bulk-add Products->Edit (en planification)** — `Edits.products` (`hasMany`) existe deja, aucun changement de schema. Plan EN dans `~/.claude/plans/en-suivant-le-template-rustling-toucan.md`. Approche pas tranchee (A : champ `Products.edits` + bulk-edit natif, mais replace-only + casse le sync ; B : composant `admin.components` + endpoint custom pour append). Pivot du choix = append vs replace. Tous les slots list view sont dans le `SelectionProvider` (`useSelection` marche partout) ; aucun slot public dans la barre native selection. Image slots : `~/Desktop/products-slots-annotated.png`. **RFC typage Payload->frontend (`PAYLOAD_FRONTEND_TYPING_RFC.md`, racine, untracked)** — perimetre = asserter runtime only. Root cause : `apps/cms` deploye separe -> `web` (Next) + `web_client` (CRA) sur `@payloadcms/sdk` HTTP -> union `string|T` non narrow (ni SDK ni Local API, limitation universelle ; Local API = in-process only, supprime la frontiere HTTP + le besoin d'asserter partage, pas le typage). 6 options, axe = wrapper client (Opt 3) vs DTO serveur (Opt 4). Reco : wrapper SDK type (depth par methode) + Zod interne + lint ; eviter wrapper `as`-only. Doc de discussion, trancher au call. **adminLabel (2 PRs)** — `feat/subcategories-payload-admin-label` (#1798) + `feat/edits-product-picker-admin-label`, champ `adminLabel` denormalise + `useAsTitle`, a merger ; Nested Docs (Michele) abandonne. **Hook SKU (PR `feat/sku-hook-products-collection`)** — Design A working tree (non commite), tests verts. **isValidLink** commite (`56d4c03ae` sur `origin/feat/announce-bar-global`). **Navbar** plan valide, pas implemente. **Announce bar (PR #1784)** fixes Kyle non commites, 3 arbitrages en attente.
- Prochaine etape : trancher l'approche bulk-add (append -> B : endpoint `POST /api/edits/:id/add-products` + composant `AddToEditButton.tsx` ; replace -> A possible mais inverse la source) ; partager le RFC a Kyle/Diego + preparer le call ; merger les 2 PRs adminLabel + poster reponse a Michele ; SKU — commiter Design A + review PR #1793 ; brancher navbar depuis `feat/announce-bar-global` ; announce bar — trancher 3 arbitrages + commit.

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
