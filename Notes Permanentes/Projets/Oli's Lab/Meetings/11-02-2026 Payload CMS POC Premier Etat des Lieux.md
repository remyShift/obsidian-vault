---
date: 2026-02-11
type: meeting
projet: Oli's Lab
tags:
  - cms
  - payload
  - poc
  - data-modeling
  - olis-lab
participants:
  - Diego
  - Remy
lien:
---

# Huddle : Payload CMS POC - Premier état des lieux

---

## Contexte

Rémy a commencé le POC Payload depuis un projet blank. Diego fait un point sur l'avancement, identifie les trous dans l'implémentation et cadre les prochaines étapes.

---

## Ce que Rémy a mis en place

- Projet Payload créé depuis zéro (`npx create-payload-app`)
- Collections : categories (avec subcategories imbriquées) + images avec focal point
- Suppression puis re-ajout des collections `media` et `users` (nécessaires, pas optionnelles)
- Localization activée (mais l'italien ne fonctionnait pas encore)
- Fonctionnel en local avec une DB locale

---

## Points de discussion et décisions

### Stockage des fichiers media
- Rémy pensait que les fichiers étaient stockés en DB. Diego corrige : les fichiers sont sur le filesystem local (dossier `media/`), pas en base.
- La vraie cible est S3 avec un plugin Payload. S3 donne accès au buffer complet de l'image, pas juste une URL, donc toutes les capacités de manipulation (crop, resize, focal point) restent disponibles.
- **Pour l'instant :** ne pas s'en préoccuper, c'est une étape future.

### Slugs sur les collections
- Rémy n'avait pas ajouté de slug sur les catégories. Diego insiste : **le slug est obligatoire**.
- Le slug est la représentation idiomatique d'un document (pas l'ID UUID). C'est ce qui sera utilisé dans les URLs et pour identifier les documents de façon lisible.
- La localisation du slug peut venir plus tard, pas une priorité maintenant.

### Référence categories → products : ObjectId vs String
- Question : comment référencer les catégories Payload depuis les produits MongoDB legacy ?
- **ObjectId** : plus robuste et typé, mais nécessite de créer une connexion cross-database + maintenir un schéma Mongoose miroir du schéma Payload. Trop de boilerplate pour la phase de transition.
- **String (ID Payload)** : moins élégant, mais acceptable pendant la transition. On peut indexer la string pour les performances.
- **Décision : string pour l'instant.** Quand tout sera dans Payload (vision long terme), on pourra faire des références internes propres dans la même DB.

### Génération automatique des types TypeScript
- Payload exporte automatiquement les types TypeScript de toutes les collections dans un fichier `payload-types.ts`
- Ces types peuvent être utilisés dans le backend et le frontend directement
- Diego : très utile, mais à gérer proprement quand le fichier deviendra gros (potentiellement splitter par domaine)

### Draft / Published et contrôle d'accès
- Payload supporte nativement les statuts draft/published
- Production lira uniquement les documents `published`, Stage pourra lire les drafts aussi
- Contrôle d'accès par groupe d'utilisateurs : possible de restreindre quelles collections sont visibles par qui (ex. équipe scientifique ne voit pas les collections e-commerce)
- Diego : à configurer en détail plus tard

### Récupération des catégories côté front
- Question ouverte : les catégories viennent-elles du backend Oli's Lab ou directement du SDK Payload ?
- Rémy penche pour le SDK Payload directement
- Diego : ça a du sens, mais Michele doit valider aussi

---

## Trous identifiés dans le POC

- Pas de slug sur les collections categories/subcategories
- Pas de référence entre categories et products encore
- Pas de stratégie URL définie (slug anglais ? localisé ? UUID ?)
- Version control non activé

---

## Prochaines étapes

1. Rémy fait un dump MongoDB des collections catégories/sous-catégories depuis la prod pour avoir des données réelles en local
2. Rémy crée la référence entre categories et products (string ID Payload dans le schéma MongoDB)
3. Rémy prépare un **document Notion de planification** (pas de code) sur la stratégie URL/slug et le flow front-end → backend pour les catégories, à discuter en session demain
4. Diego sync avec Michele sur les choix d'architecture

---

## Actions

- [ ] **Rémy** - Ajouter le slug aux collections categories et subcategories
- [ ] **Rémy** - Dump MongoDB prod pour récupérer les données catégories/sous-catégories en local
- [ ] **Rémy** - Créer la référence categories → products (string ID Payload dans le schéma legacy)
- [ ] **Rémy** - Rédiger un document Notion de planification : stratégie URL, slug, flow front/back pour les catégories
- [ ] **Rémy** - Envoyer les variables d'environnement et le nom de la branche à Diego
- [ ] **Diego** - Syncer avec Michele sur les choix d'architecture (front SDK vs backend, slug strategy)
- [ ] **Diego + Rémy** - Session de suivi le lendemain pour discuter le document de planification
