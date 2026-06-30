---
date: 2026-05-07
type: meeting
projet: "Oli's Lab"
tags:
  - olis-lab
participants:
  - Diego
  - Remy
---

## Huddle : TypeScript Type Inference - Payload CMS

---

### Contexte

Session de pair avec Diego pour identifier et cadrer un problème de typage TypeScript récurrent sur le projet : les types générés par Payload CMS ne reflètent pas correctement l'état des relations après hydratation (depth parameter).

---

### Problème identifié : 3 couches

#### Couche 1 - Relations non hydratées malgré le depth

Quand on fetch avec `depth: 1`, TypeScript continue d'inférer le type des relations comme `string | Media` (ou `string | Brand`, etc.) au lieu de directement `Media` ou `Brand`. Payload génère les types sans tenir compte de la profondeur du fetch, donc l'inférence est incorrecte.

Exemple : `brand.backgroundImage` est typé `string | Media` même avec `depth: 1`. Pour accéder à `image.url`, on est forcé de faire un `typeof image !== 'string'` manuellement à chaque fois.

#### Couche 2 - URL media typée `string | null`

Les objets `Media` ont leur champ `url` typé `string | null` côté Payload, alors que dans la pratique toute image uploadée a une URL. L'objectif est de pouvoir traiter `url` comme toujours défini une fois qu'on a un objet `Media`.

#### Couche 3 (stretch goal) - Raffinement de type par sous-type produit

Certains champs optionnels sur `Product` sont optionnels structurellement (ex : `score` absent pour les lab collectibles). À terme, on voudrait pouvoir exprimer que certains produits ont des propriétés que d'autres n'ont pas. Pas dans le scope immédiat.

---

### Direction technique

#### Ce qu'on ne fait pas

- Patcher Payload lui-même : techniquement possible en open source mais pas worth it
- Se contenter d'assertions de type (`as Brand`) : si quelqu'un retire le depth, ça casse sans warning runtime

#### Ce qu'on vise

Une **fonction d'abstraction** qui :

- Prend un document (n'importe quelle collection Payload)
- Détecte de quelle collection il s'agit (via les types générés dans `payload.config`)
- Détermine si les relations sont hydratées ou non
- Retourne un type correctement resserré

La solution doit fonctionner à la fois dans **Payload** et dans **Next.js** (les deux consomment ces types). Pas de duplication entre les deux codebases.

Kyle a déjà une approche `mapProduct` sur la PDP qui peut servir de point de départ, mais ce n'est pas une solution générique.

#### Contrainte forte

La solution n'est **pas que typologique** : il faut aussi une validation runtime pour éviter que le type soit incorrect si le depth change. Type + guard, pas type seul.

---

### Recherche à mener

- Explorer les solutions existantes autour de "incorrect type inference Payload CMS relationships"
- Voir si la communauté Payload a déjà documenté ou résolu ce pattern
- Piste : utiliser les types de collections (déjà exposés dans le const de config) comme base générique

---

### Actions

- [ ] **Remy** - Explorer les solutions existantes (recherche "incorrect type inference Payload CMS"), documenter les pistes
- [ ] **Remy** - Prototyper une fonction d'abstraction qui couvre les couches 1 et 2
- [ ] **Remy** - S'assurer que la solution est partageable entre Payload et Next.js (pas de duplication)
- [ ] **Team** - Call de suivi de 20 minutes le lendemain pour faire le point sur les pistes et poser les questions
- [ ] **Diego** - Revoir les commentaires laissés sur le code (discussion sur abstraction vs explicite)
