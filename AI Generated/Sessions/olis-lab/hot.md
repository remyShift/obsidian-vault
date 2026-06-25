---
updated: 25-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
25-06-2026 — Fix bug navbar CMS labels (PR #1839) : labels d'onglets mobile ignoraient les overrides CMS ; `resolveNavLabel` extrait en fonction pure partagée desktop/mobile. Non commité. (Session précédente : fix slug PR #1850.)

## État du projet
- **Navbar CMS labels (PR #1839, branche `feat/next-read-payload-navbar`)** : bug Devin confirmé par Diego, fixé. `resolveNavLabel(item, cmsLabels, t)` extrait dans `cmsNavbarSections.ts`, consommé par `Navbar.tsx` (desktop) et `NavbarMenu.tsx` (mobile, prop `cmsLabels` ajouté). `tsc` + eslint clean. **3 fichiers non commités.** 2e commentaire Devin (revalidate 1h→24h) = faux positif écarté.
- **Slug fix (PR #1850, commité `5a283e721`, fix CI non commité)** : génération via hooks collection `beforeValidate` (`ensureProductSlug`/`ensureSubcategorySlug`, comme `generateProductSku`). Stabilisé (génère au create, jamais de régen auto). Test int `productSlug.int.spec.ts`. Fix CI (nom brand unique) **pas encore commité**.
- **Top banner (planif)** : reco Option 3 (token `{freeShippingThreshold}` + helper `@olis-lab/shared`).
- **Bulk-add Products→Edit (planif)** : Approche B (composant + endpoint), `join` découplé (YAGNI).
- **TASK-1115 (SKU)** : PR auto-regen revertée. Décision meeting Michele/Diego.
- **RFC RBAC** : doc EN rédigé, à coller dans Notion + faire trancher l'équipe.
- Chantiers checkout/footer toujours en attente.

## Faits récents importants
- Résolution de label navbar = **fonction pure partagée**, pas closure inline → desktop et mobile alignés, une seule source de vérité. `'brands'` toujours en i18n.
- next-intl non typé strict dans `apps/web` (`labelKey: string` passe dans `t()`) → threader `t: (key: string) => string` dans un helper pur est OK (pas de contravariance).
- Bot Devin : commentaires inline avec sévérité (🟡 BUG / 🚩 ANALYSIS), tri humain requis ; Diego répond sur le commentaire pertinent.
- **Slug = hook collection `beforeValidate`, JAMAIS hook de champ** : Payload valide les champs en parallèle (`Promise.all`) → générateur de champ async perd la course contre la validation `required` → `400 "Slug invalid"`. Générer en collection `beforeValidate` (séquentiel, avant validation).
- `/app` dans une stacktrace = build standalone conteneurisé → un fix non redéployé reste périmé. Index Mongo `unique` parfois non appliqué en local mais appliqué en CI → divergence.

## Décisions actives
- Navbar : `resolveNavLabel` fonction pure dans `cmsNavbarSections.ts`, consommée des deux côtés ; prop `cmsLabels` passé à `NavbarMenu`.
- Slug stabilisé (`if (data.slug || originalDoc?.slug) return`, comme SKU) ; génération en collection `beforeValidate` ; checkbox neutralisée, arg `slugify` pour le bouton.
- Tests de régression int conservés (seul filet pour ces classes de bug).
- Migration subcategory non découplée — figer ou non = à trancher.

## Prochaines étapes
- Commit du fix navbar (PR #1839, 3 fichiers) ; décider si répondre au thread Devin/Diego.
- Commit + push du fix CI slug (test brand) → CI verte ; finaliser PR #1850.
- Rebuild/redéployer le conteneur CMS depuis le HEAD corrigé.
- Vérifier le bouton "Generate" en live dans le CMS.
- Trancher : figer la migration subcategory ou non.
- Reprendre banner / bulk-add / SKU / RFC RBAC.
