---
updated: 05-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
05-06-2026 — Announce bar : fixes review PR #1784 (row, typage générique Payload, RowLabel) + intégration CRA sous flag `dev_announcement_bar` (asserter, hook query, builder extrait dans `useTopBannerMessages`, anti-flicker, fallback ancien, fix uppercase composant `ui`). Rien commité.

## État du projet
- **Announce bar (PR #1784, branche `feat/announce-bar-global`)** : global Payload OK + 3 fixes review appliqués (segments en `row`, `condition`/`validate` typés `satisfies Condition/Validate<...,TextField>`, RowLabel typé via type généré). Intégration CRA derrière `dev_announcement_bar` (REPLACE + fallback ancien si CMS vide). Hook `apps/web_client/src/hooks/useTopBannerMessages.tsx` possède tout le contenu bannière ; `App.tsx` allégé. Uppercase forcé dans `packages/ui` TopBanner. Typechecks verts. **À commiter + répondre aux commentaires.**
- **Trading plan** : refacto Zod→asserter `assertTradingPlan` sur branche `refactor/remove-old-tradingplan-integration` (séparée). Contenu prod à remplir avant merge.
- **Picker Edits** : `adminLabel` raccourci, migration à rejouer, branche non commitée.
- Migration Content API v2.1 → Merchant API avant le 18 août 2026. Page builder blocks : prochain gros chantier.

## Faits récents importants
- ⚠️ En fin de session le working dir semblait **revenu à un état sans les changements announce** (payload.config sans AnnouncementBar, ui sans uppercase) → vérifier la branche/les fichiers avant de commiter (`git status`, bonne branche `feat/announce-bar-global`).
- Types Payload d'un array ne sont **pas** une union discriminée → narrowing via asserter `createAsserter().required` (`packages/shared/src/payload/guard.ts`), pas de Zod.
- Payload exporte `Condition<TData extends TypeWithID, TSiblingData>`, `Validate<TValue,TData,TSiblingData,TFieldConfig>`, `TextField` ; `satisfies` type les params.
- `@olis-lab/ui` consommé en **`dist`** (gitignoré), legacy importe `@olis-lab/ui/styles.css` → **rebuild `ui`** après toute modif de composant. `@olis-lab/shared` aussi en dist → rebuild après modif.
- TopBanner Next.js (composant séparé) force déjà `uppercase` ; le partagé (legacy) comptait sur des chaînes i18n en capitales.
- Node 20.19.x obligatoire → `source $HOME/.nvm/nvm.sh && nvm use 20` avant pnpm. `rm` aliasé `-i` → `/bin/rm -f`.
- Flicker flags : `!flagsReady || (flag && isLoading)` (pattern Home/Shop) ; App fait `if (!flagsReady) return <LoadingComponent/>`.

## Décisions actives
- Announce bar : intégration **REPLACE** sous flag + **fallback ancien** si CMS vide ; scope **CRA only** (Next = suivi) ; lien = URL texte libre (champ `link`, `<Link>` interne/`<a>` externe) ; hook dans `hooks/` (pas `service/cms/`) ; uppercase = propriété du composant ; pas de Zod (asserter).
- Comportement flag-OFF préservé à l'identique (vieux couplage « GWP gate toute la barre »).

## Prochaines étapes
- Vérifier la branche/fichiers, **commiter** announce bar sur `feat/announce-bar-global`, répondre aux 3 commentaires inline, re-demander review despinoz.
- Vérif runtime CRA (flag OFF/ON, CMS rempli/vide → fallback, uppercase, liens, EN/FR, dismiss, pas de flicker).
- Corriger l'espacement des segments côté contenu CMS (espace avant le lien).
- Suivi : intégration Next.js TopBanner ; tokens dynamiques free-shipping ; `'announcement-bar'` dans plugin `translator`.
- Trading plan : remplir contenu prod + merge ; picker : rejouer migration + commiter.
