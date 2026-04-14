---
date: 2026-01-05
type: meeting
projet: Oli's Lab
tags:
  - olis-lab
participants:
  - Remy
  - Diego
notion:
---

# Huddle : Optimisation Query Articles - Logique Inverse

---

## Contexte

Rémy avait une query pour récupérer les articles "done" d'un dossier Notion. Diego identifie un problème de logique lié à la limite de 100 items de l'API Notion.

---

## Le problème

### Ce que faisait la query initiale
1. Fetch du dossier → récupération des IDs de tous les articles liés
2. Fetch de tous les articles avec statut `done` → **limité à 100 résultats** par l'API Notion
3. Intersection : pour chaque article du dossier, vérifier s'il est dans la liste des 100 "done"

### Pourquoi c'est problématique
L'API Notion ne peut pas retourner plus de 100 articles par appel (pas de moyen d'augmenter cette limite). Si on a 200 articles "done", la query n'en voit que 100. Les 100 suivants sont invisibles → des articles correctement taggés "done" seraient traités comme "not done".

Un dossier comme "Explore All" a déjà 81 articles. D'autres approchent les 80. On va atteindre 100 dans un avenir relativement proche.

---

## La solution : logique inverse

**Insight clé de Diego :** les articles qui ne sont PAS "done" sont toujours une minorité.

Au lieu de fetcher les "done" (qui peuvent être 100+), on fetch les "not done" (editorial team, scientific revision, etc.) qui seront toujours bien moins de 100.

### Nouvelle logique
1. Fetch du dossier → IDs des articles liés
2. Fetch uniquement des articles avec statut **non-done** (statuts en cours)
3. Un article du dossier qui n'apparaît pas dans cette liste = il est done

```ts
// Avant : fetch des done, risque de dépasser 100
const doneArticles = await notionApi.getArticles({ status: 'done' }) // max 100

// Après : fetch des not-done, toujours une minorité
const inProgressArticles = await notionApi.getArticles({ status: ['editorial', 'scientific'] })
const doneIds = dossierArticleIds.filter(id => !inProgressArticles.has(id))
```

---

## Gestion du risque si on dépasse 100 "not done"

- Probabilité faible à court terme : on ne publie pas 100 articles en cours simultanément
- Si ça arrive un jour, le traitement se fera silencieusement sur seulement les 100 premiers
- **Mitigation :** ajouter un `throw` ou une alerte Make qui envoie un message Slack si le nombre d'articles "not done" approche 100. Ça permet d'être prévenu sans bloquer le traitement actuel.

---

## Optimisation complémentaire

Diego rappelle d'utiliser le paramètre `filter_properties` dans les appels Notion API pour ne récupérer que les champs nécessaires (ici, uniquement les IDs). Ça réduit la taille des réponses et accélère les appels.

---

## Actions

- [ ] **Rémy** - Implémenter la logique inverse : fetch des articles "not done" au lieu des "done"
- [ ] **Rémy** - Ajouter une alerte (throw + message Slack via Make) si le nombre d'articles "not done" approche 100
- [ ] **Rémy** - Utiliser `filter_properties` pour ne récupérer que les IDs dans les appels Notion
