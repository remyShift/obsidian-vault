---
date: 2026-04-14
type: chantier
projet: Oli's Lab
tags: [cms, payload, chantier, olis-lab]
---

# Chantier : Migration CMS Payload

---

## Pourquoi

Notion + Make (automation) comme CMS atteint ses limites : gestion des traductions complexe, pas de CRUD natif propre, couplage fort avec l'automation qui peut écraser des données, difficile à maintenir à mesure que le catalogue grossit.

Payload CMS est **code-first** : le schéma est en code, l'UI admin en est le reflet direct. On garde le contrôle total, on génère les types TypeScript automatiquement, et on peut le déployer sur notre propre infra.

---

## Objectif

Remplacer Notion + Make par Payload comme source de vérité pour le contenu éditable (produits, marques, catégories, articles, actives, concerns, skin types). La migration se fait en parallèle de la CRA qui continue de fonctionner, avec un bridge script qui synchronise Payload → MongoDB legacy pendant la transition.

---

## Infrastructure & hébergement

L'infrastructure a été posée par Diego. Tout tourne dans `eu-west-3` (Paris). Deux targets de déploiement :

| Target | Usage | Détail |
|---|---|---|
| **ECS Fargate** | Production | Cluster `olis-cms`, service managé, ALB, secrets via SSM `/cms/production/` |
| **EC2 t3.small** | Dev/exploration | Instance stoppable, secrets via SSM `/cms/dev/`, Docker avec `--restart unless-stopped` |

Lightsail est abandonné (c'était la phase exploratoire initiale).

Les déploiements sont déclenchés via GitHub Actions ("Deploy CMS" workflow) avec un paramètre `target` (`ecs` ou `ec2`). L'image Docker est poussée sur ECR (`olis-cms` pour prod, `olis-cms-dev` pour dev).

Les secrets ne sont jamais dans le code ni dans les env files : ils sont stockés dans SSM Parameter Store et injectés au démarrage du container.

---

## Collections implémentées

### `Media`
- Upload **AVIF uniquement** (les autres formats sont rejetés)
- Si l'image source n'est pas AVIF, elle est convertie via Sharp avant upload
- Une taille définie : `thumbnail` (64×64, position centre)
- Focal point activé
- Hook `afterRead` : réécrit les URLs vers le CDN (`CDN_URL/media/<filename>`) au lieu de l'URL interne Payload
- Versioning activé

### `LogoMedia`
- Collection séparée de `Media` pour les logos SVG uniquement (`image/svg+xml`)
- Même hook CDN que Media (prefix `logoMedia`)
- Pas de resize ni de focal point (SVG = vectoriel)

### `Brands`
- Champ `notionId` : unique, indexé, sidebar, read-only (identifiant de liaison avec le legacy)
- Champ `syncMetadata` : groupe en sidebar avec `lastSyncedAt`, `lastSyncedBy`, `syncStatus` (`success`/`failed`). Mis à jour automatiquement après chaque sync.
- Bouton `SyncBrandButton` en sidebar : déclenche le sync Payload → MongoDB via l'endpoint `/api/sync/brand/:id`
- Statuts : `Live`, `Staged`, `Offline` (champ select custom, pas le draft Payload)
- `backgroundImage` → `media`, `logoImage` → `logo-media`
- Tiles : array localisé (preTitle, title, subTitle, image, articleSlug)
- Slug auto-généré depuis `name`
- Versions/drafts activés
- Delete désactivé depuis l'UI

### `Categories`
- Champ `legacyId` : string contenant le MongoDB `_id` (pas un ObjectId cross-DB, string suffisant pour la transition)
- Nom localisé, image obligatoire, slug auto
- Create et delete désactivés depuis l'UI (les catégories ne se créent pas depuis Payload)
- Live preview configuré
- SEO plugin activé (tab SEO dans l'UI)
- Versions/drafts activés

### `Subcategories`
- Relation vers `categories` (champ `category` requis)
- Validation d'unicité composite (name + category, slug + category) gérée **par query Payload** car MongoDB ne supporte pas les contraintes composites nativement
- Slug avec `unique: false` au niveau DB (la contrainte est dans la validation custom)
- Create et delete désactivés depuis l'UI
- SEO plugin activé
- Versions/drafts activés

### `Users`
- Collection standard Payload pour l'authentification admin

### Config globale
- Locales : `['en', 'fr', 'it', 'es']`, defaultLocale `en`, fallback activé
- SEO plugin activé sur `categories`, `subcategories`, `brands` (pas encore sur products)
- S3 plugin configuré avec deux prefixes distincts : `media` et `logo-media`
- CORS restreint à `BASE_FRONTEND_URL` + `localhost:3000`
- Endpoint custom : `POST /api/sync/brand/:id`

---

## Architecture sync : Payload → MongoDB legacy

### Flow complet pour les brands

```
Éditeur clique "Sync" dans l'UI Payload
→ SyncBrandButton → POST /api/sync/brand/:id (endpoint Payload)
→ Fetch le Brand en 4 locales en parallèle (en, fr, it, es)
→ transformPayloadBrandToLegacy() → shape notion_brands legacy
→ findOneAndUpdate sur olis_lab (prod) ET olis_lab_dev en parallèle
→ Update syncMetadata sur le document Payload (lastSyncedAt, status)
```

### Validation à la frontière legacy (Zod)

Le schéma Zod `LegacyBrandSchema` valide les documents lus depuis `olis_lab.notion_brands` **avant** toute transformation. Si un document ne passe pas la validation, il est skippé avec un warning (jamais une erreur silencieuse).

Zod vit uniquement à la **frontière de lecture legacy**, pas côté écriture Payload.

### Transformer bidirectionnel

`src/sync/transformers/brands.ts` contient deux fonctions :

- `transformLegacyBrandToPayload(raw, images)` → utilisé par le seed script (legacy → Payload)
- `transformPayloadBrandToLegacy(brand, existing)` → utilisé par l'endpoint sync (Payload → legacy)

La direction Payload → legacy préserve les champs que Payload ne gère pas (`shopBanner`, etc.) en les lisant depuis le document `existing` avant d'écraser.

---

## Seed script : legacy MongoDB → Payload

`src/scripts/seed/brands.ts` — idempotent, dry-run par défaut.

```bash
# Dry run (preview, aucune écriture)
pnpm --filter cms payload run src/scripts/seed/brands.ts

# Écriture réelle
pnpm --filter cms payload run src/scripts/seed/brands.ts -- --no-dry-run

# Filtres
pnpm --filter cms payload run src/scripts/seed/brands.ts -- --include 507f1f77 abc
pnpm --filter cms payload run src/scripts/seed/brands.ts -- --exclude 507f1f77
```

**Fonctionnement :**
1. Fetch les brands depuis `olis_lab.notion_brands` via `fetchLegacyBrands()`
2. Validation Zod de chaque document
3. Skip si `notionId` déjà présent dans Payload (idempotence)
4. Upload images en parallèle : `backgroundImage` (AVIF), `logoImage` (SVG), tiles EN (AVIF)
5. `payload.create` avec locale `en` + `_status: 'published'`
6. `payload.update` pour chacune des 3 autres locales (fr, it, es), en réutilisant les tile IDs Payload assignés à la création (pour cibler les mêmes items d'array)

**Note importante :** pour forcer `published` à la création, il faut passer `_status: 'published'` dans `data`. `draft: false` seul ne suffit pas — c'est un champ interne de Payload.

---

## Collections à implémenter

| Collection | Statut | Notes |
|---|---|---|
| `Brands` | ✅ Implémenté | Seed script fonctionnel, PR mergée |
| `Categories` | ✅ Implémenté | Sans seed script pour l'instant |
| `Subcategories` | ✅ Implémenté | Validation composite custom |
| `Media` / `LogoMedia` | ✅ Implémenté | Deux collections distinctes |
| `Products` | En cours | Stratégie de migration validée avec Michele |
| `Concerns` | À faire | Lier par référence, pas string traduite |
| `SkinTypes` | Schema draft | Descriptions actives embedded dans skin_types |
| `Actives` | À faire | Attend validation schéma de Michele |
| `Articles` | Non démarré | |
| `Bundles` | Non démarré | |

### Règles de migration produits

- Produit complet (title + images + description + how-to-use + brand) → `published` ou `offline`
- Produit incomplet → `draft`
- Produits sans marque ni image (fantômes issus du scraping) → `draft`, conserver pour le futur scanner de produits

---

## Décisions techniques notables

**Deux collections Media séparées** (`media` et `logo-media`) : les logos SVG et les images raster ont des contraintes trop différentes (format, resize, focal point) pour partager une même collection.

**Slug auto depuis `name`** : utilise le helper `slugField` de Payload. Pour les subcategories, la contrainte d'unicité est composite (slug + category) et gérée par query, pas par index MongoDB.

**`context: { skipSync: true }`** : passé dans tous les `payload.create` / `payload.update` internes (seed, sync metadata) pour éviter de déclencher des hooks de sync en boucle.

**Sync écrit sur prod ET dev en parallèle** : `Promise.all` sur `olis_lab` et `olis_lab_dev`. Le dev est toujours à jour avec la prod sans intervention manuelle.

---

## Réunions source

- [[2026-02-11 Payload CMS POC Premier Etat des Lieux]]
- [[2026-02-17 CMS Infrastructure Image Upload]]
- [[2026-02-20 Categories Slug Routing]]
- [[2026-03-02 CMS Payload Strategie Images]]
- [[2026-03-26 Migration Produits Payload Schemas]]
- [[2026-03-31 CMS Sync Script Code Review]]
- [[2026-03-02 Tech Weekly]]
- [[2026-03-23 Tech Weekly]]
