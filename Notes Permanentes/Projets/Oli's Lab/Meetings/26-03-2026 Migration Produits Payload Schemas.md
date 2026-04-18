---
date: 2026-03-26
type: meeting
projet: Oli's Lab
tags:
  - cms
  - payload
  - migration
  - products
  - schema
  - olis-lab
participants:
  - Michele
  - Remy
lien: https://olislab.slack.com/docs/T06E4T3H87M/F0AP77KMUUC
---

# Huddle : Migration Produits vers Payload & Schémas CMS

---

## Contexte

Rémy et Michele alignent la stratégie de migration des produits vers Payload CMS et clarifient plusieurs questions de schéma (skin types, actives, concerns).

---

## Stratégie de migration des produits

### Ce qu'on migre
**Tout**, y compris les produits incomplets et offline. Pas seulement les produits live.

### Règles de statut

| Situation | Statut dans Payload |
|---|---|
| Produit complet et live | `published` (live) |
| Produit complet mais offline (ex. rupture de stock temporaire) | `offline` |
| Produit incomplet (champs requis manquants) | `draft` |
| Produit fantôme / test sans marque ni image | `draft` |

**Champs requis pour qu'un produit soit considéré "complet" :** title, images, description, how-to-use, brand.

### Statut "staged" : déprécié
- On garde le champ pendant la période de transition pour ne pas casser
- Mais on arrête de le supporter activement : seuls `live` et `offline` comptent
- Sur staging, on utilisera la feature **draft** de Payload plutôt que le statut "staged"

### Drafts dans Payload
- Payload supporte nativement les drafts (paramètre à passer dans l'appel API pour les lire ou non)
- Production : ne lit que les `published`
- Stage : peut lire les drafts si on passe le paramètre

**Feature future :** preview des drafts directement dans l'UI Payload. Payload peut inclure des composants React Next.js, ce qui permettrait de prévisualiser un produit draft dans le vrai rendu de l'app. Pas dans le scope actuel mais à garder en tête.

### Pourquoi garder les produits incomplets / anciens
Michele veut conserver les données même pour des produits jamais mis en vente ou des marques qui n'ont pas abouti. Raison : vision future du **scanner de produits**. Plus on a de données sur des produits (même non vendus), mieux l'outil pourra reconnaître un produit scanné et donner des infos à l'utilisateur.

---

## Schémas à créer dans Payload

### Concerns
- Collection existante en DB mais très pauvre : juste un nom anglais + notion ID, pas de traduction
- Problème actuel : les concerns sur les produits sont stockés comme des **strings traduits**, pas comme des **références** à la collection concerns. Résultat : si on renomme un concern, il faut changer tous les produits manuellement.
- **Décision :** migrer concerns vers Payload ET lier les produits par référence (relation) au lieu de stocker la string. Ça permettra de modifier un concern une seule fois et de le voir mis à jour partout.

### Skin types
- Rémy a fait un premier draft du schéma, Michele doit reviewer et répondre aux questions laissées dans Notion (beaucoup de champs dont l'utilité n'est pas claire)
- La collection skin types a des descriptions d'actives associées ("pourquoi cet actif est bon pour ce type de peau") qui ne sont ni dans `actives` ni dans `skin_types` mais dans une collection intermédiaire

**Décision sur les descriptions d'actives liées aux skin types :**
- Ces descriptions sont spécifiques à la page skin type et n'existent nulle part ailleurs
- **Option retenue :** les garder embedded dans la collection `skin_types` plutôt que créer une collection séparée
- MongoDB/Payload étant NoSQL, on n'est pas forcé de normaliser → garder ce qui est simple et logique

### Actives
- Collection référencée par skin types
- Rémy attend la réponse de Michele sur le schéma avant de commencer à coder

---

## Point process : communication avant de coder

Rémy soulève explicitement le problème : il a eu des retours en arrière parce qu'il commençait à coder avant d'avoir validation sur l'approche.

Sa nouvelle règle : **écrire le plan dans Notion et attendre du feedback avant de toucher au code**, même si ça ralentit le démarrage.

Michele valide l'approche mais ajoute un point important : Diego a beaucoup d'inputs à gérer. Il faut comprendre que ses retours peuvent prendre du temps, et que c'est pour ça que la communication proactive et les documents Notion en amont sont essentiels (pas pour bloquer mais pour réduire les allers-retours).

---

## Actions

- [ ] **Rémy** - Migrer tous les produits vers Payload : complets en `published`/`offline`, incomplets en `draft`
- [ ] **Rémy** - Mettre à jour les PRs pour refléter la stratégie draft pour les produits incomplets
- [ ] **Rémy** - Finaliser le draft du schéma skin types + actives dans Notion
- [ ] **Rémy** - Ajouter concerns comme collection dans Payload avec références produits (pas strings)
- [ ] **Michele** - Reviewer le draft schéma skin types/actives/concerns et répondre aux questions dans Notion
- [ ] **Michele** - Répondre au message de Rémy dans #project-cms sur le plan du general script avant qu'il commence à coder
