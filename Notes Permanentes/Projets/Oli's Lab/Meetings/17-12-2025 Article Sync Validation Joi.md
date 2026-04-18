---
date: 2025-12-17
type: meeting
projet: Oli's Lab
tags:
  - backend
  - validation
  - joi
  - refactoring
  - article-sync
  - olis-lab
participants:
  - Diego
  - Remy
notion:
---

# Huddle : Article Sync - Validation & Joi Middleware

---

## Contexte

Review d'une PR sur le système de sync d'articles depuis Notion. Diego identifie des incohérences dans la validation et propose d'introduire Joi pour valider les paramètres de requête côté middleware.

---

## Problème identifié : `syncSpecificArticles` reçoit un tableau mais ne traite qu'un seul article

### Situation actuelle
- L'endpoint `sync-specific-articles` reçoit `articleIds` (tableau) dans le body
- Mais en pratique, Make n'envoie jamais qu'un seul ID à la fois
- La méthode `processArticles` (avec S) appelle `processArticle` (sans S) une par une via un `Promise.all`
- `runArticleSync` reçoit donc toujours exactement un article
- Résultat : on fait semblant de supporter plusieurs articles alors qu'on n'en traite jamais qu'un

### Confusion supplémentaire
- `validateRequest` est utilisé pour deux endpoints différents : sync d'un article et sync de plusieurs
- La même validation est réutilisée pour les deux cas, avec `articleIds` (tableau) même quand on attend un seul ID
- Le nommage `articleIds` vs `articleId` (pluriel vs singulier) est incohérent avec l'usage réel

### Décision
Corriger dans la PR actuelle (scope suffisamment petit) :
- Renommer `articleIds` → `articleId` (singulier) dans l'endpoint "sync specific article"
- L'endpoint n'accepte plus un tableau mais un ID unique
- Mettre à jour Make en conséquence (changer le payload envoyé)
- Mettre à jour tous les endroits où `validateRequest` est utilisé

---

## Introduction de Joi pour la validation

### Pourquoi Joi (ou Zod)
- Actuellement la validation est faite dans le controller (vérification manuelle des champs du body)
- Ce n'est pas la responsabilité du controller. Sa responsabilité c'est la logique, pas la validation des inputs.
- Joi/Zod permettent de définir un schema et de l'utiliser comme middleware : si la validation échoue, la requête n'atteint jamais le controller.

### Comment ça fonctionne (explication de Diego)
```ts
// Schema Joi
const syncSchema = Joi.object({
  articleId: Joi.string().required(),
})

// Usage dans le router (comme middleware)
router.post(
  '/sync-specific-article',
  validateSchema(syncSchema),  // middleware de validation
  syncSpecificArticleController  // controller appelé seulement si validation OK
)
```

Le middleware `validateSchema` est un filtre : il vérifie les body params, et si ça passe, le controller sait qu'il a un `articleId` valide. Plus besoin de vérifier dans le controller.

### Quand utiliser Joi vs validation manuelle
- **1 champ à valider** : la validation manuelle inline dans le controller est acceptable
- **2+ champs** : utiliser Joi, surtout si la même validation est partagée entre plusieurs endpoints

### Exemple déjà en place
La validation Joi existe déjà sur le `userRouter`. Rémy peut s'en inspirer pour le pattern.

---

## Point sur le champ `title`
- Le title était passé dans le body pour builder le slug côté backend
- En réalité le slug est buildé depuis la traduction anglaise, pas depuis le title
- **Décision :** retirer `title` du body de la requête

---

## Ce qui n'a pas été testé ce jour
- Test de migration schema MongoDB avec le nouveau champ `slug` requis sur les articles existants
- Le risque : des documents existants n'ont pas ce champ → la migration pourrait casser si le champ est marqué `required` sans valeur par défaut
- À tester ensemble le lendemain avec la DB locale

---

## Actions

- [ ] **Rémy** - Renommer `articleIds` → `articleId` (singulier) dans l'endpoint sync-specific-article
- [ ] **Rémy** - Mettre à jour Make pour envoyer un ID unique au lieu d'un tableau
- [ ] **Rémy** - Remplacer la validation manuelle dans le controller par un schema Joi (s'inspirer du `userRouter`)
- [ ] **Rémy** - Retirer le champ `title` du body de la requête sync
- [ ] **Rémy** - Mettre à jour les autres usages de `validateRequest` pour aligner
- [ ] **Diego** - Tester avec Rémy la migration schema MongoDB (champ `slug` requis sur articles existants)
