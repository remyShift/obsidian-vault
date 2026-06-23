---
updated: 23-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
23-06-2026 — Deux chantiers : (1) Footer CMS de bout en bout côté CRA (PR `feat/footer-global-cra-read` ouverte, en attente de retours) ; (2) **suppression complète du legacy checkout CRA** sur `chore/remove-legacy-cra-checkout` (5 commits faits, pas de push).

## État du projet
- **`chore/remove-legacy-cra-checkout`** (commits faits, NON pushé) : legacy checkout CRA supprimé. 95 fichiers, −15 653 lignes, 81 fichiers supprimés. `AddressCard` déplacé dans le profil, cart+rebuy redirigent en dur vers Next `/<locale>/secure-checkout`, flag `dev_checkout_v2` retiré, routes `/checkout`+`/success` supprimées, i18n `checkout.*` purgé (sauf `voucherErrors`), deps `@stripe/*` retirées. tsc + lint OK. PR à ouvrir (message déjà rédigé).
- **`feat/footer-global-cra-read`** (PR ouverte) : global Payload `footer` (image, newsletter, trustBar, linkColumns, legalLinks, socialLinks, paymentIcons, `secureCheckoutLabel` required, tagline, copyright) ; read web_client (`guardFooter`, flag `dev_payload_footer`, `useFooterQuery`) ; rendu option A façon navbar (composants `@olis-lab/ui/Footer` data-injectables, `FooterSection` CMS vs legacy). **Flag OFF = byte-identique.**
- En attente ailleurs : `feat/next-read-payload-navbar` (read navbar Next, PostHog server-side) ; `fix/payload-slugs-generation` (slugify + 27 redirects).

## Faits récents importants
- Checkout Next `/secure-checkout` **à 100% en prod** (confirmé Rémy) → fallback CRA + flag supprimés, **plus de rollback**.
- Code partagé GARDÉ : `deliveryApi`, `voucherUtils`, `mapboxApi`/`ordersApi`, stores `Bag`/`Shipping`, `react-apple-signin-auth` (sign-in, pas Apple Pay). Le cart utilise encore `checkout.voucherErrors` → i18n purgé chirurgicalement.
- **Pièges environnement** : `mise exec node@X -- pnpm` ne prime pas sur `/usr/local/bin/node` v21 → forcer `PATH="$(mise where node@20.19.5)/bin:$PATH"`. Hook **lint-staged+prettier** au pre-commit. Node **20.19** obligatoire.
- Crash de session a reverté tout le working tree (branche conservée) — refait depuis le plan.
- Globals footer+navbar seedés en DB locale (vraies données EN+FR), seed direct `payload run`, pas de migration, **data locale non versionnée**. S3 creds locaux invalides.

## Décisions actives
- Commits **sans scope entre parenthèses** (`refactor:`/`chore:` plats). NE JAMAIS committer/pusher sans demande explicite. Jamais de `Co-Authored-By: Claude`.
- Footer : liens + trust bar + payment icons en CMS ; icônes via `select` validé. Mocks `dev_payload_footer`/`dev_payload_navbar` à `false` (passer à `true` pour rendu CMS local).

## Prochaines étapes
- **Checkout** : push `chore/remove-legacy-cra-checkout` + ouvrir PR ; test navigateur e2e (cart→checkout, rebuy, AddressCard, voucher error) ; vérifier aucune behavior CloudFront vers `/checkout`.
- **Footer** : suivre retours PR ; rejouer seed footer+navbar sur stage/prod ; régénérer creds S3 locaux ; read footer côté Next (apps/web).
