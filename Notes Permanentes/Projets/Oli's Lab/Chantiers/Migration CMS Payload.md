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

## Architecture

### Instances

| Environnement | Source | Lit |
|---|---|---|
| Production | Payload (hosted) | `published` uniquement |
| Stage | Payload (hosted) | `published` + `draft` |
| Local (dev) | DB locale + dump prod | tout |

Une seule instance Payload pour stage et prod. La lecture filtrée par statut est gérée côté API (paramètre draft dans l'appel).

### Stockage des médias

- S3 : toutes les images uploadées dans Payload
- À chaque upload : 2 versions générées (originale + WebP/AVIF converti via Sharp)
- **Consommer toujours la version convertie**, pas l'originale
- Le focal point nécessite de définir des tailles nommées dans le schéma (ex. `large`, `medium`, `small`). Décision de sizing non encore finalisée (Kyle doit valider l'intégration Next.js + Sharp).

### Types TypeScript

Payload génère automatiquement un fichier `payload-types.ts` avec les types de toutes les collections. À utiliser dans le backend et le frontend à la place de types manuels.

### Statuts des documents

| Statut Payload | Équivalent legacy | Usage |
|---|---|---|
| `published` | `live` | Visible en production |
| `offline` | `offline` | Produit complet mais non vendu (rupture, etc.) |
| `draft` | `staged` (déprécié) | Incomplet ou en préparation |

Le statut "staged" legacy est déprécié. Sur staging, on utilise les drafts Payload.

Pour forcer `published` à la création via le script de seed : passer `_status: 'published'` dans les options de `payload.create` (champ interne, `draft: false` ne suffit pas).

---

## Bridge script : Payload → MongoDB legacy

Pendant la transition, le contenu édité dans Payload doit rester synchronisé avec la DB MongoDB legacy (toujours lue par la CRA).

### Architecture retenue

- **CMS (hook Payload)** : endpoint dynamique qui accepte le nom de la collection en paramètre et redirige vers la bonne route statique
- **Server backend** : routes statiques dédiées par collection, chacune avec son controller propre

```
/internal/sync/brands       → BrandsController
/internal/sync/categories   → CategoriesController
/internal/sync/subcategories → SubcategoriesController
```

Pas de controller générique avec des `if`. Si une collection a des edge cases, elle a son propre controller.

### Pourquoi pas un script générique

Chaque collection a une structure trop différente en MongoDB :
- `brands` : mapping relativement simple
- `categories` : collection MongoDB standard
- `subcategories` : **n'existent pas comme collection** en MongoDB. Elles sont des clés d'objets dans `categories`. Renommer une subcategory = `unset` + `set` d'une clé d'objet.
- `products` : les subcategories sont hardcodées dans le document produit (pas liées par référence)

Tenter un script générique produit inévitablement des `if` par collection → code smell → mieux vaut dupliquer et avoir des controllers clairs.

### Identifiant de liaison

Pendant la transition, les documents MongoDB référencent leur équivalent Payload via un champ `legacy_id` (string contenant l'ID Payload UUID). Ce n'est pas un ObjectId cross-database car ça nécessiterait de maintenir un schéma Mongoose miroir. Acceptable pendant la transition ; quand tout sera dans Payload, on pourra faire des références internes propres.

---

## Collections migrées / à migrer

| Collection | Statut | Notes |
|---|---|---|
| `brands` | PR mergée | Seed script à vérifier sur stage |
| `categories` | En cours | Slug obligatoire sur chaque document |
| `subcategories` | En cours | Edge case : clés d'objets dans `categories` MongoDB |
| `products` | En cours | Tout migrer, incomplets en `draft` |
| `concerns` | À faire | Lier par référence, pas string traduite |
| `skin_types` | Schema draft | Descriptions actives embedded dans skin_types |
| `actives` | À faire | Attend validation schéma de Michele |
| `articles` | Non démarré | - |
| `bundles` | Non démarré | - |

### Règles de migration produits

- Produit complet (title + images + description + how-to-use + brand) → `published` ou `offline`
- Produit incomplet → `draft`
- Produits sans marque ni image (fantômes issus du scraping) → `draft`, conserver pour le futur scanner

### Routing catégories côté front

Flow décidé pour la lecture des catégories :

1. Front-end → Payload SDK (source de vérité pour les slugs et la liste des catégories)
2. Au clic sur une catégorie → le slug est envoyé au backend
3. Backend → résolution slug → ID via Payload → filtre des produits par ID

Ne pas modifier les routes existantes. Créer de nouvelles routes sous feature flag, basculer quand stable.

---

## État actuel (avril 2026)

- Infrastructure S3 + image conversion : en place
- Brands collection : mergée
- Catégories/sous-catégories : en cours de migration
- Produits : migration stratégie validée, implémentation en cours
- Sync script : architecture décidée, refacto en cours (suppression du script générique)
- Hébergement : encore sur Lightsail (phase exploratoire), à migrer vers une instance production propre
- Décision Make/Payload : point de décision était prévu au 16 mars → Make devrait être phased out au profit de Payload

---

## Réunions source

- [[2026-02-11 Payload CMS POC Premier Etat des Lieux]]
- [[2026-02-17 CMS Infrastructure Image Upload]]
- [[2026-02-20 Categories Slug Routing]]
- [[2026-03-02 CMS Payload Strategie Images]]
- [[2026-03-26 Migration Produits Payload Schemas]]
- [[2026-03-31 CMS Sync Script Code Review]]
- [[2026-03-02 Tech Weekly]] (point de décision Make/Payload)
- [[2026-03-23 Tech Weekly]] (statut PRs CMS)
