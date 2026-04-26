> Plateforme : `competitive gaming` avec wallet, withdrawals, KYC, ranked, winamatch.
> Stack : Next.js 16 (App Router) + Supabase + Stripe/Viva/Xsolla.
> Périmètre : `apps/web` (public, 142 routes API), `apps/admin` (back-office), `packages/shared-types` (vide), `apps/web/database/` (57 SQL bruts).
> Repo : zéro branche, zéro CI.

---

## TL;DR

**Verdict global : 🔴 CRITIQUE - non shippable en l'état.**

C'est une plateforme financière (argent réel) avec : (1) 2FA volontairement bypassé en prod, (2) middleware de sécurité orphelin (CSP/HSTS/X-Frame-Options jamais appliqués), (3) rate limit en mémoire qui ne tient pas une seule instance Vercel, (4) zéro test unitaire/intégration sur 142 routes API, (5) versioning SQL anarchique (12 versions de `wallet_*.sql`), (6) zéro CI, zéro monitoring, zéro audit log immuable, (7) si c'est du wagering monétisé, conformité ANJ/MGA absente.

**Top 3 risques bloquants** :
1. 🔴 2FA accepte `/^\d{6}$/` --> n'importe quel code à 6 chiffres ouvre la session (`apps/web/src/app/api/settings/security/2fa/verify/route.ts:58`).
2. 🔴 `middleware-security.ts` n'est jamais appelé depuis `middleware.ts` → CSP, HSTS, anti-clickjacking absents en prod malgré le code écrit.
3. 🔴 Aucun test sur les flux wallet/KYC/withdrawals + zéro CI + 1 seul commit = un bug en prod = blast radius non maîtrisé sur l'argent des users.

**Orientation stratégique** : la fragilité ci-dessus est un symptôme, pas la cause. La cause, c'est l'absence de couche domaine isolée (modèle anémique généralisé, 142 routes qui parlent directement à Supabase). Refonte d'architecture progressive (Hexagonal + DDD + patterns financiers) à enclencher en parallèle des sprints sécurité.

---

## 1. Sécurité - Verdict : 🔴 CRITIQUE

> Réf : Tests de Sécurité.md, Les Principes SOLID.md (DIP, couche service), Code Smells.md (Long Method, Primitive Obsession `any`).

### 🔴 Critiques

**1.1 - 2FA totalement bypassable**
- `apps/web/src/app/api/settings/security/2fa/verify/route.ts:51-58`
```ts
// const isValid = authenticator.verify({ token, secret: twoFASettings.secret });
// Temporary: Accept any 6-digit code for testing until otplib is installed
const isValid = /^\d{6}$/.test(validatedData.code);
```
- `otplib` EST dans `apps/web/package.json:61` (`"otplib": "^13.4.0"`). Le code TOTP est commenté et remplacé par une regex.
- Impact : tout attaquant qui devine n'importe quel code à 6 chiffres (ex : `000000`) active le 2FA et passe la vérification. Le 2FA est **un faux sentiment de sécurité**.
- Remédiation : décommenter `authenticator.verify(...)`, supprimer la ligne 58. Ajouter un test unitaire qui vérifie un faux code refusé.

**1.2 - `middleware-security.ts` jamais appelé**
- `apps/web/src/middleware.ts:1-99` n'importe **pas** `securityMiddleware` ni `SECURITY_HEADERS`.
- `apps/web/src/middleware-security.ts:5-35` exporte une fonction orpheline : aucun call site dans tout le repo.
- Conséquence directe : **aucun** des headers définis (`Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `Permissions-Policy`, `Referrer-Policy`) n'est posé sur les réponses. Tous les pen-tests automatisés (Mozilla Observatory, securityheaders.com) tomberont en F.
- Remédiation : dans `middleware.ts` après `getUser()`, fusionner les headers : `Object.entries(SECURITY_HEADERS).forEach(([k,v]) => supabaseResponse.headers.set(k, v))`. Ne pas appeler `securityMiddleware` séparément (il crée un `NextResponse.next()` séparé qui casse le refresh de session Supabase).

**1.3 - Routes de debug exposées en prod**
- `apps/web/src/app/api/test/route.ts` (12 lignes) : aucune auth, retourne 200 OK.
- `apps/web/src/app/api/test-stats/route.ts` (53 lignes) : auth simple, dump du `profile_statistics` du user dans la réponse + 4 `console.log` exposant `user.id`.
- Impact : surface d'attaque inutile, énumération possible des shapes internes de la DB.
- Remédiation : `rm -rf apps/web/src/app/api/test apps/web/src/app/api/test-stats`. Ajouter une règle ESLint qui interdit la création de routes nommées `test*` en `app/api/`.

**1.4 - Rate limiting en mémoire (single-instance only)**
- `apps/web/package.json` déclare `@upstash/ratelimit` et `@upstash/redis` mais le code utilise un `Map<string, RateLimitEntry>()` JS en mémoire (cf. `lib/auth/rateLimiter.ts`, confirmé par l'agent).
- Vercel = multi-instance/edge → chaque instance a sa propre Map → l'attaquant tape N×limit en parallélisant sur les régions.
- Remédiation : remplacer par `@upstash/ratelimit` (déjà installé). Cible : 5 tentatives/15min sur signin/signup/forgot-password/withdraw, sliding window.
- Réf : Tests de Sécurité.md.

**1.5 - Service role et clés sensibles**
- `bcrypt` natif dans `apps/web` (binaire) coexiste avec `bcryptjs` (pure JS) dans `apps/admin` → deux implémentations crypto différentes.
- `bcrypt` natif **plante en Edge Runtime** (Vercel Middleware/Edge Functions). À ce jour le code n'est pas appelé en Edge, mais c'est une mine.
- Vérifié : `SUPABASE_SERVICE_ROLE_KEY` n'apparaît pas dans des fichiers `'use client'`. ✓
- Vérifié : pas de clé en dur (grep `sk_live`, `pk_live`).
- 🟠 Remédiation : standardiser sur `bcryptjs` (web et admin), documenter que les password hashes sont **gérés par Supabase Auth**, et n'utiliser `password_history` qu'en lecture (jamais comme source de vérité).

**1.6 - Webhook Viva : pas d'idempotence anti-replay**
- `apps/web/src/app/api/wallet/webhooks/viva/route.ts:35-46` vérifie HMAC SHA-256 ✓.
- MAIS aucune table `processed_webhook_events` ni vérification que `payload.EventData.TransactionId` n'a pas déjà été traité. Replay = double crédit.
- `add_to_wallet` (RPC) + `transactions.insert` ne sont pas dans une transaction atomique → désync possible (wallet crédité, transaction non loggée, ou inverse).
- Remédiation : créer table `webhook_events(provider, event_id PK, processed_at)`, INSERT avec `ON CONFLICT DO NOTHING` avant tout traitement. Wrapper le crédit dans une fonction PL/pgSQL `process_viva_event()` SECURITY DEFINER atomique.

**1.7 - `images.remotePatterns: [{ hostname: '**' }]`**
- `apps/web/next.config.js:163-168` : tout domaine HTTPS est accepté comme source d'image.
- Impact : SSRF/exfiltration via `next/image` proxy, hébergement gratuit de contenu illicite, facturation Vercel image optimization sur des domaines tiers.
- Remédiation : whitelist explicite. Ex : `[{ hostname: 'supabase.co' }, { hostname: '*.supabase.co' }, { hostname: 'cdn.winalia.com' }]`.

### 🟠 Majeurs

**1.8 - `wallet/withdraw/route.ts` : validation maison non atomique**
- `apps/web/src/app/api/wallet/withdraw/route.ts:18-74`
- `validateWithdrawal(supabase: any, …)` lit balance + KYC + cumul jour, **puis** appelle `createWithdrawalRequest` → race condition (TOCTOU). Deux requêtes parallèles passent les checks puis débitent le wallet 2×.
- `accountDetails` schéma : tous les champs `optional()` → un user peut soumettre un withdrawal `paypal` sans email.
- Daily limit hard-codé `$1,000` (ligne 50), pas de limite hebdo/mensuelle, pas de cohérence avec la doc `withdrawal_limits` de la table.
- Pas de rate limit sur la route.
- Remédiation : déplacer toute la validation **dans une RPC PL/pgSQL `request_withdrawal(p_user, p_amount, p_method, p_details) RETURNS uuid`** avec `BEGIN; SELECT … FOR UPDATE;` sur la balance, vérification KYC inline, insertion atomique. Retirer la validation TS. Discriminer le schéma Zod par méthode (`z.discriminatedUnion('method', ...)`).

**1.9 - RLS Supabase : audit incomplet faute de source de vérité**
- 57 SQL bruts dans `apps/web/database/`. Au moins **12 versions** de `wallet_*` (`wallet_clean`, `wallet_complete`, `wallet_complete_schema`, `wallet_enhancements`, `wallet_final`, `wallet_fix`, `wallet_functions`, `wallet_schema`, `wallet_step1_tables`, `wallet_step2_clean/features/safe`).
- Impossible de savoir lequel est appliqué en prod sans accès au cluster. Risque d'avoir des tables sensibles **sans RLS** ou avec policies anciennes.
- L'agent rapporte 6 `USING (true)` dans `rankings_system.sql` -> légitimes pour leaderboards publics, mais à valider individuellement.
- Remédiation : reset complet de `apps/web/database/` → migrer vers `supabase/migrations/` avec la CLI officielle (`supabase migration new …`). Audit script : `for table in wallet wallets withdrawal_requests transactions kyc_verifications matches ranked_seasons; do echo $table; psql -c "SELECT relrowsecurity FROM pg_class WHERE relname = '$table'"; done`. Toute table sensible sans RLS = bug.

**1.10 - CSP trop permissive**
- `lib/security/middleware.ts` (rapporté par l'agent) : `script-src 'unsafe-eval' 'unsafe-inline'` → la CSP devient cosmétique.
- Remédiation : passer en `nonce`-based CSP via `next/headers`. Doc : https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy.

**1.11 - CRON auth utilise client anon**
- `apps/web/src/app/api/auth/cron/route.ts:14-15` : `createClient(cookieStore)` → client **anon**. Toutes les UPDATE/DELETE dépendent des policies RLS, qui pour un cron doivent être permissives → risque de couplage néfaste.
- Remédiation : utiliser un client `service_role` dédié (`@supabase/supabase-js` direct, pas `@supabase/ssr`).

### 🟡 Mineurs

**1.12 - Bot blocking trop large**
- `apps/web/src/middleware-security.ts:16-26` blackliste `/curl/`, `/python/`, `/java/`, `/php/` → bloque pen-test légitimes, monitoring, certains User-Agents headless. (Note : ce code est inerte, cf. 1.2.)
- Remédiation : si réactivé, allowlist GoogleBot/BingBot/Slackbot, et limiter le block au signup/login.

**1.13 - `password_history` + bcrypt 12 rounds + Edge**
- Coût par changement de password : ~250ms × 10 entrées historiques. Pas grave en pratique mais à monitorer.
---

## 2. SEO - Verdict : 🟠 À CORRIGER

### 🟠 Majeurs

**2.1 - Pas de `sitemap.ts` ni `robots.ts` dynamiques**
- `apps/web/public/robots.txt` statique avec `https://winalia.com` hardcodé.
- Pas de `apps/web/src/app/sitemap.ts` ni `apps/web/public/sitemap.xml`.
- Impact : Google n'a aucune carte d'index → crawl aléatoire, pages marketing oubliées.
- Remédiation : `app/sitemap.ts` qui itère sur les routes publiques (Home, About, Privacy, Terms, FAQ, Referral, Affiliate, VIP, Ranked-Info, WinaMatch-Info, Battle-Pass, Leaderboard, Blog).

**2.2 - Aucune page marketing n'a `generateMetadata`**
- Le `layout.tsx` racine pose un `metadata` global, mais les 14 pages marketing identifiées n'ont pas de `metadata` ni `generateMetadata` exporté.
- Impact : meta description, OG image, OG title identiques partout → 0 différenciation dans les SERPs et les previews sociales.
- Remédiation : pour chaque `(main)/.../page.tsx`, exporter un `metadata` ou `generateMetadata` typé `Metadata`.

**2.3 - Zéro JSON-LD / Schema.org**
- Aucun `application/ld+json` détecté. Pas de `Organization`, `Product` (pour battle pass/skins), `FAQPage`, `BreadcrumbList`.
- Impact : pas de rich snippets.
- Remédiation : injecter un script LD-JSON serveur dans `layout.tsx` (Organization), et par page (FAQPage, BreadcrumbList).

### 🟡 Mineurs

**2.4 - `'use client'` sur le `layout` `(app)` et la home**
- Confirmation par l'agent : la home `(main)/page.tsx` est en `'use client'` → contenu d'accueil non rendu côté serveur, mauvais pour le SEO de la landing principale.
- Remédiation : passer le layout en RSC + isoler les blocs interactifs (CTA, formulaires) en composants client imbriqués.

**2.5 - `next-pwa@5.6.0`**
- Très ancienne version. Pas critique (`disable: NODE_ENV === development` empêche les régressions en dev), mais `next-pwa` est à l'arrêt en faveur de `serwist`. À surveiller pour Next 16+.

**2.6 - `next/image` config trop ouverte**
- Cf. 1.7 - performance ET sécurité.

---

## 3. Clean code, architecture, type safety, tests - Verdict : 🔴 CRITIQUE

### Architecture monorepo  🔴

**3.1 - `packages/shared-types/` est un fantôme**
- `packages/shared-types/` ne contient qu'un README. Pas dans le workspace : `pnpm-workspace.yaml` ne liste que `apps/*`, le `package.json` racine `workspaces: ["apps/*"]`.
- L'admin et le web dupliquent : 3 types `User`, 2-3 types `Transaction`, 2 types `Match` (rapporté par l'agent).
- Impact direct sur le DIP (dépendre d'abstractions), il n'y a **aucun** contrat partagé.
- Réf : Coupling & Cohesion.md (faible couplage entre apps), Les Principes SOLID.md (DIP).
- Remédiation : créer `packages/shared/` (workspace pnpm), y mettre tous les schémas Zod + types Supabase générés + types métier (User, Wallet, Transaction, Match, Withdrawal). Remplacer les imports.

**3.2 - Drift de versions massif entre `web` et `admin`**
| Package | apps/web | apps/admin | Sévérité |
|---|---|---|---|
| `next` | 16.0.8 | 16.1.6 | 🟡 |
| `react` | 19.0.0 | 19.2.0 | 🟡 |
| `@supabase/supabase-js` | 2.101.1 | 2.102.1 | 🟡 |
| `zod` | **3.25.76** | **4.3.6** | 🔴 incompatible |
| `tailwindcss` | 3.4.15 | 4.1.17 | 🔴 syntaxe @tailwind différente |
| `typescript` | 5.7.2 | 5.9.3 | 🟡 |
| password hash | `bcrypt` (natif) | `bcryptjs` (pure JS) | 🟠 |

- Zod 3 vs Zod 4 = API d'erreur différente, schémas non partageables tels quels.
- Tailwind 3 vs 4 = directives `@tailwind` vs `@import "tailwindcss"`, incompatibilité CSS.
- Remédiation : harmoniser via `pnpm` workspace + `^` cohérent (au prix d'un sprint d'alignement).

**3.3 - `package-lock.json` ET `pnpm-lock.yaml` cohabitent**
- Le root scripts utilisent `npm run --workspace web` (donc npm). `pnpm-workspace.yaml` est posé mais non utilisé. Le `pnpm-lock.yaml` est `untracked` dans `git status`.
- Impact : build non déterministe, deps installées différemment selon qui clone. CI break à venir.
- Remédiation : choisir **pnpm** (mieux pour monorepo). Supprimer `package-lock.json`. Ajouter `engines.packageManager: "pnpm@9.x"`. Documenter dans README.

**3.4 - Deps au root `package.json` qui ne devraient pas y être**
- `apps/*` Next 16 n'a aucune raison d'avoir `dotenv`, `@supabase/auth-helpers-nextjs`, `@supabase/supabase-js`, `sharp` au root.
- `@supabase/auth-helpers-nextjs` est **deprecated** depuis 2024 (remplacé par `@supabase/ssr`, déjà utilisé dans `apps/web`). Présent au root + dans `apps/web`.
- Remédiation : supprimer toutes les deps du root, garder uniquement `devDependencies` strictement build (ex: `turbo`).

**3.5 - `eslint` cassé dans les deux apps**
- `apps/web/package.json:86` : `"eslint": "^10.0.1"`, **ESLint 10 n'existe pas** (max stable v9.x). L'install fait foo silencieusement ou choisit une autre version.
- `apps/admin/package.json:63` : `"eslint": "^4.0.0"`, version de 2017, archaïque.
- Les deux : `eslint-config-next: "^0.2.4"`, la vraie version pour Next 16 est `16.x.x`. C'est probablement un autre package (typo).
- Impact : `npm run lint` est silencieusement no-op ou pète selon la lockfile.
- Remédiation : `eslint@^9`, `eslint-config-next@^16`, run `npm run lint` en CI.

**3.6 - `apps/admin` réinvente tout**
- Aucun composant UI partagé avec `apps/web` (Radix dans web, dnd-kit/fullcalendar/apexcharts dans admin → légitime spécifique, mais Button/Input/Modal/Card ne devraient pas être dupliqués).
- `bcryptjs` vs `bcrypt`, `dompurify`/`isomorphic-dompurify` admin only (pourquoi pas web ?), Zod 3 vs 4.
- Remédiation : `packages/ui/` (composants headless), `packages/lib-auth/`, `packages/lib-supabase/`, `packages/shared/` (cf. 3.1).
- Réf : Coupling & Cohesion.md, duplication = forte cohésion locale mais couplage caché par convention non écrite.

### Type safety 🟠

**3.7 - `tsconfig.base.json` strict ✓ mais non respecté**
- `strict: true` à la racine ✓.
- 38 occurrences de `: any` dans `apps/web/src` (rapporté par l'agent), dont 6 rien que dans `inventory/use/route.ts`.
- ~50 `as any`.
- 0 `@ts-ignore`/`@ts-expect-error` (bon point, pas de désactivation explicite).
- Exemple direct : `apps/web/src/app/api/wallet/withdraw/route.ts:18-22`
```ts
async function validateWithdrawal(
  supabase: any,
  userId: string,
  amount: number
): Promise<{ allowed: boolean; reason?: string }>
```
- Le `supabase: any` cache que la fonction lit `kyc_verifications.status`, `withdrawal_requests.amount`, `wallets.usd_balance`, TS ne peut rien valider.
- Remédiation :
  1. `npx supabase gen types typescript --project-id <id> > apps/web/src/lib/supabase/database.types.ts`
  2. Typer `SupabaseClient<Database>`.
  3. Ajouter règle ESLint `@typescript-eslint/no-explicit-any: error`.
- Réf : Code Smells.md (Primitive Obsession, un `any` est l'ultime primitif qui efface l'intention).

### Tests 🔴

**3.8 - Couverture quasi-nulle**
- 1 fichier de test détecté : `apps/web/tests/e2e/example.spec.ts` (placeholder Playwright).
- 0 `*.test.ts(x)`, 0 `*.spec.ts(x)` dans `apps/web/src/` ni `apps/admin/src/`.
- Pourtant : `vitest@4.0.16`, `@testing-library/react@16`, `msw@2.12.4` dans web ; `jest@25` (??), `@testing-library/react@16` dans admin.
- 142 routes API → 0 test, dont les routes wallet/withdraw/deposit/kyc/2fa qui touchent à de l'argent réel.
- Réf : Tests.md (« Test early, test often »), Anatomie d'un test.md, Tests Unitaires.md, Tests d'Intégrations.md.
- Pyramide cible (selon Tests.md) :
  - **Unitaires (70 %)** : pour chaque fonction de `lib/(app)/wallet/`, `lib/auth/`, helpers de validation, calcul ELO ranked, calcul earnings winamatch.
  - **Intégration (20 %)** : routes API critiques contre une DB Supabase test (Docker via `supabase start`). Couvrir : signin, signup, withdraw (TOCTOU), deposit webhook (replay), 2FA verify, KYC approve.
  - **E2E (10 %)** : Playwright sur les golden paths (signup → KYC → first deposit → first withdraw).
- Nommage : `should_X_when_Y` ou Given/When/Then (cf. Anatomie d'un test.md).

**3.9 - `jest@25.0.0` incompatible avec `jest-environment-jsdom@30.2.0`**
- `apps/admin/package.json:65,67` : Jest 25 (2020) avec env-jsdom 30 (2024). Configurations incompatibles.
- Remédiation : harmoniser sur **Vitest** (déjà choisi dans web), supprimer Jest de admin.

### SOLID sur les modules critiques 🔴

**3.10 - `apps/web/src/app/api/wallet/withdraw/route.ts` (161 lignes)**
- SRP 🟠 : la route fait validation Zod + auth + lecture profile + validation métier (KYC, daily limit, balance) + insertion + audit log. 5 responsabilités.
- DIP 🔴 : `validateWithdrawal(supabase: any, …)` couple directement à Supabase, impossible à mocker.
- Réf : Les Principes SOLID.md (SRP, DIP), Coupling & Cohesion.md.
- Refactor proposé :
  - `WithdrawalService` (façade DDD) : `requestWithdrawal(userId, amount, method, details)`.
  - Service appelle une RPC PL/pgSQL atomique `request_withdrawal(...)` qui fait le `SELECT FOR UPDATE` + INSERT.
  - Route = parse + auth + délégation. ~30 lignes.

**3.11 - `apps/web/src/app/api/inventory/use/route.ts` (231 lignes, rapporté)**
- 4 handlers `handleEquipItem`, `handleUnequipItem`, `handleUseItem`, `handleTokenUse` colocalisés, tous prennent `(supabase: any, userId, inventoryItem: any, shopItem: any)`.
- Smell : Long Method + Switch on Type (cf. Code Smells.md).
- Refactor : `InventoryService` avec polymorphisme (`equip()`, `use()`) et factory selon `item.type`. OCP : ajouter un nouveau type d'item = nouveau strategy, pas modification.

**3.12 - `apps/web/src/lib/(app)/settings/analytics-service.ts` (710 lignes, rapporté)**
- God class : 3 interfaces métier (`KYCVerification`, `SecurityAuditLog`, `VerificationAnalytics`) + opérations transverses dans un seul fichier.
- Réf : Code Smells.md (God Class), Les Principes SOLID.md (SRP).
- Refactor : 1 service par responsabilité (`KycReader`, `SecurityAuditReader`, `VerificationAnalytics`).

**3.13 - Composants React monstres**
| Fichier | Lignes |
|---|---|
| `TeamsClient.tsx` | 1049 |
| `ProfileOverview.tsx` | 880 |
| `ranked/[id]/page.tsx` | 868 |
| `winamatch/[id]/page.tsx` | 856 |
| `ShopProductModalTabbed.tsx` (admin) | 794 |

- Réf : Code Smells.md (Long Method/Class), Structurer le code.md.
- Remédiation : extract sub-components par section UX (TeamsList, TeamSearchBar, TeamMembersPanel, etc.). Cible : composants ≤ 300 lignes.

### DDD 🔴 absent

**3.14 - Modèle anémique généralisé**
- Pas de couche domaine. Tous les routes API = procedures (validation → call Supabase → log).
- 22 contextes naturels détectés (`wallet/`, `auth/`, `ranked/`, `winamatch/`, `shop/`, `teams/`, `profile/`, `watch/`, `premium/`, `battle-pass/`, `affiliates/`, `referrals/`, `inventory/`, `notifications/`, `settings/`, `dashboard/`, `rankings/`, `stats/`, `users/`, `user/`, `matches/`) aucun n'est isolé en bounded context.
- La logique métier est en **PL/pgSQL** (RPC `complete_match`, `record_ranked_match_result`, `add_to_wallet`, `subtract_from_wallet`, `request_withdrawal`).
- Réf : Domain-Driven Design.md (« le modèle anémique = anti-pattern central »).
- Conséquences pratiques :
  - Logique métier non testable en TS.
  - Logique éparpillée entre TS, SQL, RPC, hooks.
  - Difficile d'introduire de l'event sourcing (`MatchCompleted`, `WithdrawalApproved`).
- Remédiation incrémentale (ne pas tout refondre) :
  1. Pour chaque bounded context, créer `apps/web/src/lib/(app)/<context>/service.ts` qui devient **la seule façade** appelée par les routes.
  2. Routes API = parse + auth + délégation.
  3. Garder les RPC SQL pour l'atomicité, mais les wrapper dans le service.
  4. Cible : 1 service par contexte.

### Loi de Déméter 🟠

**3.15 - Chaînes Supabase profondes**
- Pattern récurrent : `(await supabase.from('profiles').select('id').eq('user_id', user.id).single()).data?.id`. Lisible mais dupliqué dans presque toutes les routes (~80×). 
- Remédiation : helper `getProfileId(supabase, userId)` dans `lib/auth/`. Réutilisé partout.
- Réf : Loi de Déméter.md, Code Smells.md (Message Chains, Duplicate Code).
### 🟡 Mineurs

**3.16 - `apps/web/package.json` : `next dev --webpack`**
- Force webpack alors que Next 16 utilise Turbopack par défaut. Dev plus lent.
- Remédiation : retirer le flag, garder Turbopack en dev.

**3.17 - `swiper@12.1.2` figé sans `^`**
- Un seul package figé pin-exact dans `apps/web` parmi des `^` partout. Ou bien volontaire (bug connu) ou erreur. À documenter ou aligner.
---

## 4. CI/CD et configuration repo - Verdict : 🔴 CRITIQUE

### 🔴 Critiques

**4.1 - `.github/` n'existe pas**
- Aucun workflow GitHub Actions, aucune branch protection, aucun template PR/issue, aucun CODEOWNERS.
- Plateforme financière sans CI = chaque commit est une roulette russe.

**4.2 - Aucun hook pre-commit**
- Pas de `.husky/`, pas de `lint-staged`, pas de `commitlint`.
- Le typecheck/lint ne sont jamais exécutés sauf manuellement.

**4.3 - Pas de Dependabot ni Renovate**
- 80+ dépendances dont `next`, `@supabase/*`, `bcrypt`, `otplib`, `swiper`. Aucune politique de patch security.

### 🟠 Majeurs

**4.4 - Pas de migrations Supabase versionnées**
- `apps/web/database/` = SQL bruts (cf. 1.9, 5.3). Pas de `supabase/migrations/` (mentionné dans le `README.md` mais inexistant).
- Aucun rollback possible, aucune trace de qui a appliqué quoi en prod.

### Pipeline CI minimum viable proposé

`.github/workflows/ci.yml` :
1. **Sur PR** :
   - `pnpm install --frozen-lockfile`
   - `pnpm typecheck` (web + admin)
   - `pnpm lint`
   - `pnpm test:unit` (Vitest)
   - `pnpm test:integration` (Vitest + Supabase test container)
   - `pnpm test:e2e` (Playwright sur preview Vercel)
   - `pnpm build` (web + admin)
2. **Branch protection `main`** : 1 review + tous les checks verts.
3. **`gitleaks`** + **`trufflehog`** sur chaque PR.
4. **Dependabot** : weekly, groupé par écosystème.
5. **Conventional commits** (`commitlint` + `husky` pre-commit).

### Templates manquants

- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/CODEOWNERS`
- `CONTRIBUTING.md`

---

## 5. Structure du projet Verdict - 🟠 À CORRIGER

### 🔴 Critiques

**5.1 - `apps/web/database/` : 57 SQL avec doublons**
- Échantillon wallet : `wallet_clean.sql` (12.5K), `wallet_complete.sql` (11.6K), `wallet_complete_schema.sql` (5.5K), `wallet_enhancements.sql` (12.9K), `wallet_final.sql` (11.5K), `wallet_fix.sql` (1.4K), `wallet_functions.sql` (2.4K), `wallet_schema.sql` (8.9K), `wallet_step1_tables.sql` (4.7K), `wallet_step2_clean.sql` (7.1K), `wallet_step2_features.sql` (6.4K), `wallet_step2_safe.sql` (7.0K). **12 fichiers**.
- Idem pour `premium_*` (8 fichiers), `teams_*` (6 fichiers), `referrals_*` (4 fichiers), `profile_*` (4 fichiers), `notifications_*` (2 fichiers), `affiliates_*` (3 fichiers), `battle_pass_*` (4 fichiers).
- Aucun moyen de savoir ce qui tourne en prod.
- Remédiation immédiate :
  1. Faire un `pg_dump --schema-only` du cluster prod.
  2. Régénérer une migration initiale propre via `supabase db diff`.
  3. Archiver `apps/web/database/` (dans un `apps/web/database-legacy.tar.gz` au pire) et supprimer du repo.
  4. Utiliser `supabase migration new <name>` pour toute évolution.

**5.2 - Artefacts debug en racine `apps/web/`**
- `apps/web/debug-test.html`, `test-local.html`, `test-simple.html`, `test-supabase.html` → 4 fichiers HTML jetables.
- `apps/web/check-env.js`, `apps/web/fix-all-params.js`, `apps/web/fix-params-await.sh`, `apps/web/fix-routes.sh` → 4 scripts de migration ad-hoc.
- Remédiation : déplacer dans `scripts/_archive/` ou supprimer. `.gitignore` une convention `*.test-local.html`.

### 🟠 Majeurs

**5.3 - `packages/shared-types/` n'est pas dans le workspace**
- `pnpm-workspace.yaml` ne liste que `apps/*`. Le package n'est ni installable, ni utilisé.
- Remédiation : étendre à `packages/*` et implémenter le contenu (cf. 3.1).

**5.4 - Documentation référencée mais inexistante**
- `README.md` mentionne `PRODUCTION_CHECKLIST.md`, `SUPABASE_HEADER_REQUIREMENTS.md`, dossier `supabase/` → aucun n'existe.
- Remédiation : soit créer ces docs, soit retirer les références.

### 🟡 Mineurs

**5.5 - `vercel.json` dans web et admin**
- Configurations séparées, à auditer pour cohérence sur les redirects et headers (les agents indiquent que la config existe).

---

## 6. Autres axes - Verdict : 🔴 CRITIQUE (gambling + observabilité)

### 🔴 Critiques

**6.1 - Aucune observabilité**
- Pas de `@sentry/nextjs`, pas de Datadog, pas d'OpenTelemetry, pas de Logtail.
- `next.config.js:155-157` : `removeConsole: process.env.NODE_ENV === 'production'` → tous les `console.error` sont **strippés en prod** (≥ 100 occurrences détectées dans `app/api/`). Plus aucun log d'erreur en runtime.
- Plateforme à argent réel sans monitoring d'erreur = on apprend les bugs par les tickets support.
- Remédiation : Sentry sur web + admin + edge. `removeConsole: { exclude: ['error', 'warn'] }` (Next 16 supporte). Ajouter un Logtail/Pino pour les routes API critiques (wallet/kyc/withdrawal/auth).

**6.2 - Pas d'`audit_log` immuable**
- Le code utilise une RPC `log_security_event(p_user_id, p_action, p_category, p_details)` → existe probablement une table `security_audit_log`.
- Mais : aucune trace d'append-only constraint (`UPDATE` et `DELETE` autorisés ?), pas d'horodatage server-side trusted, pas de signature.
- Critique pour KYC, withdrawals, role changes, password resets.
- Remédiation : table `audit_log` avec `BEFORE UPDATE/DELETE` triggers `RAISE EXCEPTION`. Ou bucket Supabase Storage append-only.

**6.3 - Conformité jeux d'argent**
- Plateforme avec `wallet`, `withdraw`, `winamatch` (matches cash), `ranked` avec rewards, `KYC verification`. C'est un produit de **skill gaming monétisé**.
- En France (siège du dev) : la frontière entre skill gaming et jeu d'argent dépend de la part d'aléatoire et de l'enjeu réel. À évaluer avec un avocat **avant le launch**.
- Si tombe sous le régime ANJ : agrément obligatoire, dépôts AML, lutte contre le blanchiment, vérification d'âge stricte (18+), modération des limites de dépôt, auto-exclusion.
- Aucune trace dans le code : pas de check `birth_date >= today - 18ans`, pas de `deposit_limits`, pas de `self_exclusion`, pas de licence header.
- Remédiation : **avis juridique avant tout autre travail technique de prod**. Si gambling : ANJ + intégration AML provider (Sumsub, Onfido étendu).
- 🟡 Si pure compétence (ex : esports tournois) : documenter le statut, ajouter age gate, mentionner clairement le statut sur Terms.

**6.4 - RGPD : implémentation partielle**
- ✓ Routes existent : `/api/settings/security/delete-account/route.ts`, `/api/settings/data-export/route.ts`, page `/privacy`.
- ✗ Aucun cookie banner (CookieBanner component non détecté). Plateforme française = consentement explicite obligatoire.
- ✗ Pas de mentions légales / éditeur / hébergeur.
- ✗ Pas de DPO mentionné.
- Remédiation : composant `CookieBanner` (catégories : nécessaire/analytics/marketing), intégration GTM consent mode, page `/legal` avec éditeur + hébergeur + DPO contact.

### 🟠 Majeurs

**6.5 - Performance DB non vérifiée**
- 57 SQL bruts → impossible d'auditer les indexes sans connexion au cluster.
- Audit suggéré : `EXPLAIN ANALYZE` sur les routes critiques (rankings/leaderboard, wallet/transactions paginated, matches/available).
- Remédiation : `pg_stat_statements` + `auto_explain` activés, capture des slow queries > 100ms.

**6.6 - Backups Supabase**
- Politique non documentée. Sur Supabase Pro : PITR 7-30 jours selon plan.
- Remédiation : doc `RUNBOOK.md` avec RPO/RTO cible, procédure restore, snapshot pre-deploy.

### 🟡 Mineurs

**6.7 - A11y**
- Bon point : Radix UI partout (ARIA gratuit).
- Reste : tester avec axe DevTools sur signup/login/withdraw forms, vérifier focus trap des Modals/Dialogs.

**6.8 - i18n**
- Plateforme EN-only. Pas de `next-intl`. Si lancement EU multi-pays prévu, à anticiper (dossier `apps/web/i18n/` rapporté côté autre app dans le projet, mais pas dans Winalia).

---

## Plan de remédiation priorisé

### Sprint 1 - Bloquants sécurité

1. ✅ **Activer le 2FA réel** : décommenter `authenticator.verify` dans `apps/web/src/app/api/settings/security/2fa/verify/route.ts`. Test E2E. (1 j)
2. ✅ **Brancher les security headers** : intégrer `SECURITY_HEADERS` dans `apps/web/src/middleware.ts`. Tester via securityheaders.com. (0.5 j)
3. ✅ **Supprimer `/api/test` et `/api/test-stats`**. (0.1 j)
4. ✅ **Migrer rate-limiter vers `@upstash/ratelimit`** sur signup/signin/forgot-password/withdraw/2fa-verify. (1 j)
5. ✅ **Restreindre `images.remotePatterns`** (next.config.js). (0.1 j)
6. ✅ **Idempotence webhooks** Viva + Xsolla : table `webhook_events`, INSERT `ON CONFLICT DO NOTHING`. (0.5 j)
7. ✅ **Refondre withdraw en RPC atomique** `request_withdrawal()` PL/pgSQL. (1 j)
8. ✅ **Audit RLS** : script qui dump `pg_policies` pour toutes les tables sensibles. Combler les manques. (1 j)
9. ✅ **Avis juridique gambling**. (en parallèle)

### Sprint 2 - CI/CD + observabilité

10. ✅ **Sentry** sur web + admin + edge.
11. ✅ **Workflow CI GitHub Actions** : install + typecheck + lint + build + Playwright + tests unitaires.
12. ✅ **Branch protection main** : 1 review + checks verts.
13. ✅ **Husky + lint-staged + commitlint**.
14. ✅ **Dependabot weekly** + `gitleaks`.
15. ✅ **Migrer `apps/web/database/` → `supabase/migrations/`** (CLI officielle, dump prod, regen propre).
16. ✅ **Standardiser pnpm** : supprimer `package-lock.json`, harmoniser `engines.packageManager`.
17. ✅ **Choisir Zod 3 OU Zod 4** dans les deux apps. Idem Tailwind 3 OU 4.

### Sprint 3 - Plomberie de la refonte

18. ✅ **Créer les packages** : `packages/domain`, `packages/application`, `packages/infrastructure`, `packages/contracts`, `packages/ui`, `packages/tsconfig`, `packages/eslint-config`.
19. ✅ **Étendre `pnpm-workspace.yaml` à `packages/*`**, supprimer `packages/shared-types/` (remplacé par `contracts` + `domain`).
20. ✅ **Configurer Vitest** au niveau workspace (rapport coverage par package).
21. ✅ **ESLint `no-restricted-imports`** : interdire `@supabase/supabase-js`, `next/*` dans `domain/` et `application/`.
22. ✅ **Premier pas pédagogique** (cf. §7.9) : `Money.ts` Value Object + 10 tests unitaires. Faire relire en PR pour valider l'approche avant d'aller plus loin.
23. ✅ **Génération types Supabase en CI** : `npx supabase gen types typescript` injecté dans `infrastructure/supabase/database.types.ts` à chaque migration.

### Sprint 4 - Refonte Wallet

24. ✅ **Domaine Wallet** : `Wallet` (Aggregate Root), `Money`, `WithdrawalRequest`, events, policies, errors. 100 % testé unitairement (cible : ≥ 50 tests).
25. ✅ **Use cases Wallet** : `RequestWithdrawal`, `ProcessVivaDepositWebhook`, `ProcessXsollaDepositWebhook`, `ApproveWithdrawal`, `RejectWithdrawal`. Tests avec `InMemoryWalletRepository`.
26. ✅ **Adapters infrastructure** : `WalletSupabaseRepository` (atomicité `SELECT FOR UPDATE`), `UpstashIdempotencyStore`, `OutboxDispatcher` (worker), `AuditLogSupabase` (hash chaîné), `VivaProvider` + `XsollaProvider`.
27. ✅ **Tables nouvelles** : `outbox_events`, `webhook_events` (idempotency providers), `audit_log` (append-only, triggers RAISE EXCEPTION).
28. ✅ **App `apps/workers/`** : worker dispatch outbox + cron audit log verification.
29. ✅ **Routes wallet ré-écrites** en couche fine (parse + auth + délégation use case + map Result vers HTTP).
30. ✅ **Feature flag `WALLET_USE_NEW_DOMAIN`** : bascule progressive, fallback à l'ancien si Sentry détecte une régression.
31. ✅ **Observation 2 semaines** : compare comportement nouveau/ancien sur le replay des webhooks récents. Décision go/no-go pour la suite.

### Sprint 5 - Refonte KYC

32. ✅ Domaine + use cases + adapter Supabase pour KYC. Audit log signé sur `ApproveKyc`, `RejectKyc`, `RevokeKyc`.

### Sprint 6 - Refonte Identity / Auth

33. ✅ `User`, `Profile`, `Session`, `Role`, `TwoFactorAuth` (avec le vrai `otplib`), `PasswordHistory`.
34. ✅ Politique de mot de passe + lockout + rate limit unifié dans le domaine.

### Sprint 7-9 - Refonte Ranked, Winamatch, Shop/BattlePass/Premium

35. ✅ Ranked + event sourcing ELO (2 sem).
36. ✅ Winamatch + Saga dispute (1.5 sem).
37. ✅ Shop + BattlePass + Premium + intégration Stripe Subscription (2 sem).

### En parallèle -> Hygiène et qualité de vie

38. ✅ **Cookie banner RGPD** + page `/legal` (CNIL).
39. ✅ **Refactor composants > 400 lignes** (TeamsClient, ProfileOverview, ranked/[id]/page) en sous-composants ≤ 300 L. Indépendant de la refonte archi.
40. ✅ **Performance DB** : `EXPLAIN ANALYZE` top 20 queries, indexes manquants.
41. ✅ **PR templates, CODEOWNERS, CONTRIBUTING.md, RUNBOOK.md** (RPO/RTO documentés).
42. ✅ **Dépréciation progressive RPC PL/pgSQL** : la logique métier passe en TS, les RPC restent comme wrappers d'atomicité minimaux.

---

## Métriques chiffrées (synthèse)

| Métrique                                              | Valeur actuelle                                          | Cible                                                                             |
| ----------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Routes API `web/` totales                             | 142                                                      | —                                                                                 |
| Routes API avec validation Zod                        | ~85 % (échantillon)                                      | 100 %                                                                             |
| Routes de debug exposées                              | 2                                                        | 0                                                                                 |
| Headers de sécurité posés                             | 0/6                                                      | 6/6                                                                               |
| Webhooks idempotents                                  | 0/2                                                      | 2/2                                                                               |
| 2FA fonctionnel                                       | NON                                                      | OUI                                                                               |
| Rate limit distribué                                  | NON (in-memory)                                          | OUI (Upstash)                                                                     |
| Tables sensibles avec RLS confirmé                    | inconnu (57 SQL bruts)                                   | 100 %                                                                             |
| Fichiers SQL dupliqués                                | ≥ 40/57                                                  | 0 (migrations versionnées)                                                        |
| `: any` dans `apps/web/src`                           | 38                                                       | 0                                                                                 |
| `as any`                                              | ~50                                                      | 0                                                                                 |
| `@ts-ignore`                                          | 0                                                        | 0 ✓                                                                               |
| Tests unitaires                                       | 0                                                        | ~ 200                                                                             |
| Tests intégration                                     | 0                                                        | ~ 30 (routes critiques)                                                           |
| E2E                                                   | 1 (placeholder)                                          | ~ 5 (golden paths)                                                                |
| Coverage estimée                                      | < 1 %                                                    | ~ 50-70 % services métier                                                         |
| Fichiers > 400 lignes                                 | ≥ 10                                                     | < 5                                                                               |
| Composant le plus gros                                | 1049 L (TeamsClient)                                     | < 300 L                                                                           |
| Drift majeur web/admin                                | Zod 3 vs 4, Tailwind 3 vs 4                              | 0 drift                                                                           |
| `.github/` workflows                                  | 0                                                        | 1+                                                                                |
| Hooks pre-commit                                      | 0                                                        | husky + lint-staged                                                               |
| Sentry/observabilité                                  | absent                                                   | actif                                                                             |
| Cookie banner RGPD                                    | absent                                                   | actif                                                                             |
| Commits                                               | 1                                                        | flux normal                                                                       |
| Branches actives                                      | main only                                                | feat/fix/chore par tâche                                                          |
| Couche domaine TypeScript pure                        | absente                                                  | `packages/domain/` ≥ 6 contextes (wallet, kyc, identity, ranked, winamatch, shop) |
| Use cases isolés (`packages/application/`)            | 0                                                        | ≥ 30 (au moins toutes les mutations sensibles)                                    |
| Repositories abstraits (ports)                        | 0                                                        | 1 par aggregate root                                                              |
| Idempotency store distribué                           | absent                                                   | actif sur toutes les mutations argent                                             |
| Outbox pattern (cohérence wallet ↔ events)            | absent                                                   | actif                                                                             |
| Audit log immuable signé (hash chaîné)                | absent                                                   | actif sur KYC, withdrawal, role, password, 2FA                                    |
| Routes API en couche fine (parse + auth + délégation) | 0/142                                                    | ≥ 90 % après refontes                                                             |
| Logique métier en PL/pgSQL                            | 100 % critique (RPC complete_match, request_withdrawal…) | ≤ 20 % (uniquement atomicité minimale)                                            |

---

## Notes finales

- **Ce qui est fait de bien** : `tsconfig.base.json` strict, validation Zod sur la majorité des routes, séparation `apps/web` vs `apps/admin`, vérification HMAC sur webhooks Viva/Xsolla, routes RGPD `delete-account` et `data-export` présentes, Radix UI (a11y gratuite), DOMPurify côté admin, `removeConsole` en prod.
- **Ce qui doit s'arrêter immédiatement** : faux 2FA, headers orphelins, routes `/test`, rate limiter mémoire, schemas SQL sans versioning.
- **Ce qui doit commencer immédiatement** : CI minimum (typecheck + lint + build), Sentry, migrations Supabase officielles, packages partagés (`packages/domain`, `packages/application`, `packages/infrastructure`, `packages/contracts`).
- **Ce qui doit commencer dès le sprint 3** : la refonte d'architecture cible. Sur une plateforme à argent réel, l'option « patcher l'existant » est plus chère et plus risquée que la refonte progressive avec strangler fig. Premier livrable : `Money.ts` Value Object + 10 tests, en PR cette semaine, comme galon technique pour valider l'approche.

> Référence générale Agilité.md (P9 Excellence Technique, P10 Simplicité, P12 Amélioration Continue) : la quantité de fonctionnalités est impressionnante, mais elle est inversement proportionnelle à la solidité des fondations. **La dette est devant le revenu, et l'architecture est devant la dette.**

---

## Vérification end-to-end

### Après les sprints 1-2 (sécurité bloquants + CI/CD/observabilité)
1. `pnpm typecheck && pnpm lint && pnpm test:unit && pnpm test:integration` doit passer.
2. `curl https://winalia.com -I` doit montrer CSP, HSTS, X-Frame-Options.
3. Tentative 2FA avec `000000` → 401.
4. `curl https://winalia.com/api/test` → 404.
5. Replay d'un webhook Viva → second appel = 200 mais aucun crédit ajouté.
6. Mozilla Observatory → grade A minimum.
7. `supabase db diff` ne montre aucune divergence avec les migrations.
8. `git log --oneline | wc -l` > 50 (preuve d'un flux normal).

### Après le sprint 4 (refonte Wallet)
9. `pnpm test --filter=@winalia/domain` → ≥ 50 tests verts, exécution < 2 sec (preuve d'isolation domaine).
10. `grep -r "supabase.from" packages/domain packages/application` → 0 résultat (preuve d'isolation Supabase).
11. `RequestWithdrawal.usecase.ts` testable avec `InMemoryWalletRepository` sans Docker.
12. Replay de N webhooks identiques → 1 seul crédit (preuve idempotence).
13. Lecture forcée d'`audit_log` modifié → la chaîne de hash est cassée et détectée par le job de vérification.
14. Bascule `WALLET_USE_NEW_DOMAIN=false` puis `=true` à chaud → comportement identique sur les flux principaux.

### Après les sprints 5-9 (refonte complète)
15. `packages/domain/` couvre ≥ 6 bounded contexts.
16. ≤ 20 % de la logique métier reste en PL/pgSQL (uniquement atomicité minimale).
17. Onboarding nouveau dev mesuré : compréhension des règles wallet en lisant `packages/domain/wallet/` < 30 min, premier PR contribuant en < 1 semaine.
18. Bascule fictive de provider (Viva → Stripe Connect en POC) faisable sans toucher au domaine ni à `apps/web`.