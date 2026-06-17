---
updated: 17-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
17-06-2026 — Plan validé pour une nouvelle global Payload `footer` (contenu éditorial du footer, image incluse). En parallèle, PR slugify toujours en review.

## État du projet
- **Footer global (plan validé, pas encore codé)** : global Payload `footer` centralisant image de fond, newsletter, colonnes de liens, liens légaux, réseaux sociaux, tagline, copyright. Calquée sur `AnnouncementBar`/`TradingPlan` (`versions.drafts`, `access.read`, champs localisés EN/FR, `isValidLink`, type guard `assert.media`, fetch `cmsClient.findGlobal`). Plan : `~/.claude/plans/j-aimerais-cr-er-une-global-polished-flask.md`.
- **`fix/payload-slugs-generation` (PR ouverte)** : fix slugify Payload (accents perdus + tirets multiples). Util `apps/cms/src/lib/slugify.ts`, migration `20260617_100000_fix_slugs.ts` (recompute à changement minimal + WARN). 27 redirects (26 produits + 1 brand). Misaj = seul cassé non auto.
- Migrations antérieures : navbar global, announce-bar Next, backfill subcategory adminLabel.

## Faits récents importants
- Footer : liens INCLUS en CMS (choix Rémy). Icônes (trust bar, paiement) + logo SVG restent en code. Section "More" auth → flag `visibility` (always/loggedOut/loggedIn), FE filtre selon auth.
- Footer : seed pas bloquant car derrière feature flag → seed manuel avant de flipper. `apps/web/lib/api/cms.ts` n'a PAS de `findGlobal` (à ajouter). Users CMS = nu, aucun RBAC.
- Footer Next a déjà un TODO "Pass image from CMS" (bg = URL S3 hardcodée).
- Slugify : sync Payload→legacy manuelle (bouton / `POST /api/sync/product/:id`), Node 20 obligatoire (nvm), rebuild dist `@olis-lab/shared` si périmé. En JS `\w` inclut les chiffres. Misaj → `misaj-body-moisturiser-natural-repellent`.

## Décisions actives
- Footer : 2 questions laissées OUVERTES sur le ticket (non tranchées) : (1) `target` éditable par l'éditrice vs permission par rôle vs dérivation par path ; (2) année copyright figée vs préfixée en code. Ne rien coder sur ces points avant décision review.
- Slugify : scope cms uniquement, migration à changement minimal (jamais recompute en bloc), Misaj/titres disparus = warn + re-save manuel. `grown-alchemist-skin-renewal-toner` / `face-body-serum` : décisions figées.
- Redirects CloudFront = Rémy + Michele/Diego, hors scope code, BLOQUANTS avant migration prod.
- NE JAMAIS committer/pusher sans demande explicite. Jamais de `Co-Authored-By: Claude`.

## Prochaines étapes
- Footer : attendre décisions review (2 questions) → puis coder `Footer.ts` + RowLabels + registre `payload.config` + `guardFooter` (shared) + `getGlobal` (web) + `useFooterQuery` (web_client).
- Slugify : suivre review PR. Séquence prod = redirects CloudFront (Michele/Diego) AVANT migration → migration Payload prod → propagation legacy via sync (26 produits) → re-save manuel Misaj.
