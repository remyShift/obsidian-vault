---
updated: 24-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
24-06-2026 — Cadrage de TASK-1115 (régénération du SKU) suite au revert de Diego : brief de décision EN écrit (template ticket), recommandation = découpler les besoins. Pas de code, à trancher en meeting.

## État du projet
- **TASK-1115 (SKU)** : la PR auto-regen-on-brand-change (`f3ab29959`) a été revertée (`46a14fbf`) car dangereuse. Brief de cadrage rédigé (plan `hier-on-a-fait-glimmering-flamingo.md` + recap du jour). Décision attendue en meeting Michele/Diego.
- Chantiers checkout/footer (sessions précédentes) toujours en attente — voir recaps 22-23/06.

## Faits récents importants
- **Le SKU = clé de jointure BigBlue** : `apps/server` lit l'inventaire BigBlue et matche par SKU (`inventoryMap[sku]`). Le repo ne pousse JAMAIS de SKU vers BigBlue (read-only). Changer un SKU live → out-of-stock.
- **Aucun signal "live sur BigBlue"** ; proxys = `status` (Live/Staged/Offline) + `syncMetadata.lastSyncedAt` (= sync legacy MongoDB, pas BigBlue).
- **Pas de RBAC** : `Users` en auth nu, tous = admin. Pattern `roles` documenté dans `apps/cms/AGENTS.md`, non implémenté.
- Défaut de design : le gel du SKU se déclenche sur "valeur existe" (`generateProductSku.ts:20` + `readOnly`) au lieu de "produit engagé downstream".
- Deux bugs distincts confondus : (A) duplicate ajoute ` - Copy` au SKU (malformé/collision/non éditable) ; (B) aucun moyen de corriger un SKU publié (DB edit ne versionne pas).
- Patterns réutilisables : `syncButton` (`type: 'ui'` + `SyncProductButton`), `CreateOnlyTextField` (EAN). PR `feat/edits-product-picker-admin-label` déplace déjà `useAsTitle` sku → adminLabel.

## Décisions actives
- C'est l'**équipe contenu/client** qui édite les produits → action "régénérer" ouverte à tous = risque, gating par rôle pertinent à terme.
- Reco : Option D (adminLabel + clear SKU au duplicate) pour le duplicate ; Option B (action manuelle confirmée downstream-aware) pour la correction ; Option C (RBAC) différée.

## Prochaines étapes
- Apporter le résumé EN au meeting ; trancher A (auto en zone sûre) vs B (100% manuel) + besoin RBAC, avec Michele/Diego.
- Décider proxys vs vrai signal "live on BigBlue" ; définir le sort des legacy SKUs overridés.
- Diego planifie l'implémentation post-décision.
