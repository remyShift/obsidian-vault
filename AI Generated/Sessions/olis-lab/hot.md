---
updated: 17-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
17-06-2026 — Fix du slugify Payload (accents perdus + tirets multiples) : util partagé + migration de recompute des slugs existants. Branche `fix/payload-slugs-generation`, PR ouverte.

## État du projet
- **`fix/payload-slugs-generation`** (PR ouverte) : `apps/cms/src/lib/slugify.ts` (NFD + strip diacritiques + collapse tirets + trim bords), branché sur Brands (option `slugify` du `slugField` natif) et Products (slugify local supprimé). Migration `20260617_100000_fix_slugs.ts` : recompute à changement minimal (locale source + fallback préfixe brand) + WARN sur slug non reproductible depuis le titre actuel. Typecheck vert. Pas committé par Claude (règle).
- Migrations antérieures : navbar global, announce-bar Next, backfill subcategory adminLabel.

## Faits récents importants
- Inventaire complet : 233 produits → 206 conformes, 26 produits + 1 brand à changer = **27 redirections** (map = ticket Notion).
- **Misaj** : seul slug cassé non auto-corrigeable (titre prod entièrement réécrit) → re-save manuel admin → `misaj-body-moisturiser-natural-repellent`.
- Sync Payload→legacy `shop_products` est **manuelle** (bouton admin / `POST /api/sync/product/:id`), pas d'`afterChange`. Brands : pas de slug en legacy.
- En JS `\w` inclut les chiffres → slugify ne supprime pas les nombres. Strip de `/` et `.` conservé volontairement.
- Migration = **Node 20** obligatoire (nvm). Rebuild `packages/shared` requis si dist périmé (`pnpm --filter @olis-lab/shared build`).
- `apps/server/utils/generateSlug.js` même bug mais hors scope (pas le chemin qui fait foi).

## Décisions actives
- Scope cms uniquement. Migration à changement minimal (jamais recompute en bloc). Misaj/titres disparus = warn + re-save manuel. `grown-alchemist-skin-renewal-toner` et `face-body-serum` : décisions figées (laisser / pas de préfixe brand).
- Redirects CloudFront = Rémy + Michele/Diego, hors scope code, mais BLOQUANTS avant migration prod.
- NE JAMAIS committer/pusher sans demande explicite. Jamais de `Co-Authored-By: Claude`.

## Prochaines étapes
- Suivre review PR `fix/payload-slugs-generation`.
- Avant prod : redirections CloudFront live AVANT la migration (sinon liens cassés).
- Séquence prod : redirects → migration Payload prod → propagation legacy via sync (26 produits) → re-save manuel Misaj.
