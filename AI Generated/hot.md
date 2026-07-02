---
updated: 02-07-2026
---

## Hot Cache — Global

> Vue cross-projets. Max 500 mots. Chaque projet a une entree courte.

### Derniere activite

02-07-2026 - olis-lab : `ProductActives.name` localise + migration EN->FR, PR #1870 ouverte, review Diego traitee (payload.find au lieu du driver natif, valide par test int jetable). BUG a fixer avant execution : le find a perdu `pagination:false, limit:0` -> 10 docs max.

### Projets actifs

#### olis-lab

- Derniere session : 02-07-2026
- Etat : **`ProductActives.name` localise (en/fr) + migration auto-trad EN->FR (resolver OpenAI), PR #1870 ouverte, PAS executee.** Review Diego traitee : `payload.find({locale:'en'})` remplace le driver natif — verdict par test int jetable : le read sert le scalaire legacy tel quel, mais un write `fr` en premier DROPPE l'original -> ordre EN-d'abord load-bearing. **BUG branche : find sans `pagination:false, limit:0` = 10 docs max, a fixer avant execution.** PR body : gotcha faux a reecrire ; 2 reponses EN Diego a poster. Fallback `true` : read `fr` vide sert `en` (aussi relations). **Chantiers en cours (inchanges)** : curated PLP (PR ouverte, bloquee par donnee = `cartProduct` manquant), cart #1859 (9/9 int verts, PR ouverte), navbar #1839 (fix posthog server flag, pas commite), PR #1853 SKU/EAN, plan globals `apps/cms` (T2->1->4->3). Securite : `NEXT_PUBLIC_FEATURE_FLAGS_SECURE_API_KEY` fuitee dans le bundle client, a renommer server-only.
- Etat archive (curated) : CMS `apps/cms/src/lib/curation/` (interleave, orderCuratedProducts, resolveCurationSection, buildCuratedList, `getCuratedProducts`, keepValidProducts, CuratedQuerySchema) + handler `endpoints/read/curatedProducts.ts` + enregistre `payload.config.ts`. Web : `getProductsCurated` (`cms.request()` SDK) swap dans `page.tsx`. Source = `trading-plan.curationSettings.homepage`. Ordre : priority en tete + interleave A-B-C-D deterministe + cap `maxPerBrand` ; **shuffle du reste non-curated assume** (fraicheur legacy). Curation seulement si `sort`==defaut, obeit au `where`. **Validation 1× cote serveur** : `keepValidProducts`→`assertProduct` retourne `TProduct` ; web = enveloppe Zod `z.custom<TProduct>` + `response.ok`, pas de re-assert. **Offline-on-read actif** (Remy) = passe invalides en `status:Offline` → **destructeur sur donnees imparfaites**, Remy a bascule `.env.local` sur localhost `cms_local` (au lieu d'Atlas `cms_dev` partagee). **BLOQUEUR live = donnee** : quasi tous les produits `cms_dev` sans `cartProduct` (hook `computeCartSnapshot`, #1801/#1859) → droppes → PLP vide ; l'ancienne PLP planterait pareil. **Drop-post-pagination** a revoir (page 1 invalide = 0 produit, pas de backfill). Decouvertes : `assertProduct` = validateur ET mapper raw→TProduct (mainImage.url) ; valide le produit ENTIER (PDP) mais la PLP n'a besoin que des champs carte, sauf `cartProduct` requis par la carte ; PLP = RSC dynamique → hard refresh/filtre = 1 req CMS (rien cache) ; `cms.request({args})` serialise via qs-esm interne (pas besoin de dep). Plan de depart : `~/.claude/plans/peppy-whistling-mist.md` (v2 `ok-j-aimerais-corrig-un-deep-wadler.md`). **Plan globals valide (NON implemente, `~/.claude/plans/j-aimerais-faire-le-plan-cuddly-breeze.md`)** : 4 ameliorations sur `apps/cms`. **T1** path navbar requis si item ET section non-disabled (validation actuelle ignore `sectionDisabled` ; helper pur `isNavItemPathRequired(data, path)` via `data`+`path` du `ValidateOptions`). **T2 (trivial)** remplir `globals:['navbar','announcement-bar','trading-plan']` du plugin `translator` (infra openAIResolver deja la, bouton Translate fourni). **T3** route preview UNIQUE interne au CMS (`/preview/header`, meme origine -> zero CORS, pas besoin que `apps/web` tourne) rendant announcement+navbar ensemble via `useLivePreview` + composants `packages/ui` (`Navbar` props-driven + `TopBanner`). **T4** groupe `brands` (label localise + path valide) dans le global Navbar + wiring front (infra `getCmsNavLabels`/`resolveNavLabel` existe deja, exclut juste brands ; remplace le hardcode `ROUTES.hotBrands`). Faits : 3 globals seulement (pas de Footer) ; Navbar existe dans `packages/ui` (legacy props-driven) ET `apps/web` (partiellement CMS) ; `TopBanner` apps/web non portable mais `packages/ui/…/TopBanner/index.tsx` reutilisable ; `validate` Payload donne `data`+`path` (acces aux ancetres). Tradeoff navbar preview = UI `packages/ui` legacy, pas `apps/web` au pixel. **(0) Cart hook — PR 1859 OUVERTE** (`feat/test-cms-computeCartSnapshot-expanded`, reintroduit dans la pr 1801/TASK-1005 reverte `8f03cb807`) : implementee + verifiee. Reexport valeur `cartProductSchema` (`shared/payload/index.ts`), hook remis en version 1801 TEL QUEL, `validate` Zod sur le champ `cartProduct` (`Products.ts`), factory `legacyId?:string|null`, `computeCartSnapshot.int.spec.ts` recree (8 cas + 9e de constat " publie sans legacyId → pas de snapshot ", logger non asserte). Typecheck shared+cms, eslint, **9/9 int verts en local** (mongo pid 886 ; env Node 26 vs pin 20.19 contourne via `npm_config_engine_strict=false`). `legacyId` confirme non-required au publish. Pas commite par Claude. Reste : CI verte + review Diego + merge. **Follow-up separe "soon"** : guard `beforeValidate` empechant de publier/passer Live sans legacyId — vrai fix d'un bug deja en prod (signale par Suze) ET **remonte a Sentry** a chaque publication pre-backsync (`reportError`→`captureException`), bruit visible dans `productSlug.int.spec.ts`. Plan : `~/.claude/plans/diego-a-revert-hier-lucky-truffle.md`. **(1) Navbar PR 1839 (`feat/next-read-payload-navbar`, apps/web)** : bug navbar/announcement bar CMS = `null` permanent **corrige**. `getServerFeatureFlag` sortait avant son log (ligne `!distinctId`) ; le `distinctId` venait d'un cookie posthog `ph_<key>_posthog` jamais pose car posthog-js est en `opt_out_capturing_by_default: true` + `cookieless_mode: 'on_reject'` (pas de cookie tant que pas d'opt-in). Fix dans `posthog-server.ts` : eval avec id constant `SERVER_FLAG_DISTINCT_ID='server-side'`, retrait `onlyEvaluateLocally: true` (self-heal via endpoint distant au cold start), `sendFeatureFlagEvents: false`, suppr `getDistinctId`. Mock rebranche sur `NODE_ENV==='development'` via helper partage `getLocalFlagFallback` (`feature-flags.ts`), symetrique serveur + client (`useFeatureFlags.ts`) ; Remy a ajoute un early-return dev (court-circuite PostHog en local). Trou d'archi note : si serveur defere (`null`), le client ne peut pas refetch le CMS (prop deja `null`). 4 fichiers, tsc+eslint verts, **pas verifie en live** (env Node casse), **pas commite**. **Securite** : `NEXT_PUBLIC_FEATURE_FLAGS_SECURE_API_KEY` = personal API key fuitee dans le bundle client, a renommer server-only + coordonner Amplify. **(2) PR 1853 (`refactor/unlock-availability-ean-sku-fields`, TASK-1125, OUVERTE)** : `LockableTextField` (sku+ean), lock = `_status==='published'`, Generate SKU masque si `status==='Live'`, review IA de Diego traitee (5 findings, repo en issue comments), reponse EN a poster, pas verifie en live. En attente : slug 1850 (fix CI + rebuild conteneur), top banner, bulk-add, TASK-1115 SKU (meeting), RFC RBAC, checkout/footer. Decouvertes : deux statuts produit `_status` (lock) vs `status` Live (regen) ; `NODE_ENV` = signal local/deploye fiable ; coupler flag a un cookie de consentement = anti-pattern pour contenu public. Pieges env : shell Node 26 vs pin 20.19.
- Prochaine etape : **fixer `pagination:false, limit:0` dans le find de la migration**, corriger le PR body, poster les reponses Diego, puis **executer la migration sur `cms_local` localhost** (`migrate:status`->`migrate`, `OPENAI_API_KEY` chargee), lire le mapping EN->FR, verif admin EN/FR, traiter les `skipped`, puis review+merge #1870. **curated PLP** = backfiller `cartProduct` + trancher drop-post-pagination + review/merge. cart #1859 = CI + review Diego + merge, puis guard `beforeValidate` legacyId (bruit Sentry/CI). Navbar #1839 = verif live Node 20 + commit/push + renommer cle API exposee (Amplify). PR #1853 = reponse Diego + verif admin + commit. globals = plan valide (T2->1->4->3). Parallele : slug 1850, banner / bulk-add / SKU meeting / RFC RBAC.

#### ingredient-manager

- Derniere session : 08-06-2026
- Etat : back-office de notation produits Oli's Lab (matching INCI/COSING + scoring 10 regles R01-R10, sources shop/ewg/lancome). TS strict + Zod + Express 5 + Mongo + Next 14. Inspecte + documente en 4 notes de lecture. Dette : `ext-scoring.repo.ts` 3314 lignes (God file), abstraction par source qui fuit (`if shop else ext` dans le service), logique scoring dupliquee dans la couche data.
- Prochaine etape : si refacto, sortir la logique scoring des repos vers le domaine (point 1 du plan note 03) ; trier les notes Inbox (to-process).

#### seed4t-perso

- Derniere session : 24-06-2026
- Etat : monorepo pnpm `remyShift/seed4t` (privé), domaine pur dans **`packages/domain`** (renommé depuis `core` ; nom de package resté `@seed4t/core` → à aligner). **PR 2 mergée**, 14 tests verts. Deps stockées **par nom** (`string[]`) → catalog = source de vérité ; `build()` throw sur dépendance inconnue ; helper `uniqueBy` ; garde-fou CI `verify:exports` (le `main` doit exister après build). **Modèle acté** : brick = package npm, grappe = brick + deps ; transitivité profonde/cycles = terrain TDD hors besoin produit (grappes réelles plates). Le domaine résout mais ne **produit rien** encore.
- Prochaine etape : **Phase 3 = output `package.json`** (`Recipe` + sérialisation), le vrai cœur V1 manquant ; puis Phase 2 versions (latest + ranges, port `IVersionResolver`) ; T12 deps vs devDeps ; aligner `@seed4t/core`→`@seed4t/domain`.

#### ts-seed (predecesseur, repo mob)

- Derniere session : 29-05-2026
- Etat : boilerplate Next.js + vitest, docs/skills en anglais, plan TDD premiere brique valide, zero code metier encore
- Prochaine etape : remplace par seed4t-perso pour le travail solo

#### piqure

- Derniere session : 19-05-2026
- Etat : PR has() prete a merger (squash a faire), PR circular deps a ouvrir
- Prochaine etape : squash + merge has(), puis ouvrir circular deps

#### obsidian-vault

- Derniere session : 24-06-2026
- Etat : **Harnais shell stable** (fish + dotfiles 100% chezmoi `remyShift/dotfiles` + Brewfile). Ajout de 5 alias git fish (`gf`, `gm`, `glgg`, `gsta`, `gstp`) dans `~/.config/fish/conf.d/aliases.fish` ; note `Code/Setup Shell.md` recalée sur le contenu réel (2 tables : binaires boostés + git, 11 alias git) ; push chezmoi `ac3b254`. Workflow dotfile = éditer la source chezmoi → `chezmoi apply <fichier>` → `chezmoi git -- add/commit/push`. **Splashboard stabilisé, tout statique** (2 dashboards home/project, `ANIMATION_WINDOW` 2s codée en dur, hook cd `--on-cd`, token github via `~/.splashboard/secrets.toml`). Découverte récurrente : Bash de Claude = zsh figé sans TTY (ne rend pas les TUI).
- Prochaine etape : **Rémy : régénérer le token GitHub** (compromis via screenshot, scope `notifications`) + réécrire `secrets.toml`. Reste (Rémy) : sudo python.org, rotation mdp Mongo Atlas, suppr backup `~/shell-migration-backup-*`, tester `/coach`. Optionnel : splash home hors-repo (fish custom), widget PR titre-seul (ReadStore), `yazi`, pimp `starship.toml`.

#### lyoncraft-2026

- Derniere session : 12-05-2026
- Etat : theming dark/light operationnel, slides en cours de finalisation
- Prochaine etape : remplacer placeholders (KicksFolio slide 19, LinkedIn slide 22), chronometrer les actes

#### claude-obsidian

- Derniere session : 02-05-2026
- Etat : infra vault stabilisee (PostCompact, hot cache deux niveaux, /recap, /autoresearch, Sommaire)
- Prochaine etape : tester /autoresearch sur sujet reel

#### portfolio-gameboy-next

- Derniere session : 28-04-2026
- Etat : migration pnpm done (PR 37), PageTitle RSC extrait avec tests
- Prochaine etape : Tailwind 4 + ESLint 10 flat-config (backlog)

#### winalia

- Derniere session : 28-04-2026
- Etat : audit tech + produit livre, prospection envoyee, en attente de retour
- Prochaine etape : si mission acceptee — Sprint 1 bloquants secu ; sinon archiver

### Contexte personnel actif

- Korea move : test de 3 mois a Seoul a planifier dans les prochains mois ; prevoit changer de PC a ce moment (→ dotfiles chezmoi = env reconstructible en 4 commandes)
- Freelance : mission Oli's Lab long terme, deadline migration GMC le 18 aout 2026
- LinkedIn ghostwriting : 2 posts rediges (reconversion valide, coreen/React en attente validation)
- LyonCraft 2026 : theming done, contenu finalise, script + timing restant

### Threads ouverts cross-projets

- PostHog olis-lab : flag `dev_search_page` retire du code, a archiver cote dashboard. Flickering trading plan fixe (3 etats flag + fetch eager), verif runtime fenetre privee a faire avant commit.
- XML feed olis-lab : feeds GMC + Klaviyo faits, automatisation planifiee (CRON), bug S3 bloquant
- Feed Meta olis-lab : pas encore implemente
- Trading plan CMS olis-lab : flag supprime + view-model Zod migre vers asserter partage `assertTradingPlan` (100% Payload) ; BLOQUANT remplir global prod (EN+FR) avant merge, sinon Home/Shop -> ErrorPage
- Page builder olis-lab : plan approuve, prochain gros chantier
- Winalia : statut juridique ANJ = question ouverte determinante avant toute mission
