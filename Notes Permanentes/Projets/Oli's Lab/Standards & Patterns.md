---
date: 2026-04-14
type: reference
projet: Oli's Lab
tags: [standards, patterns, olis-lab]
---

# Standards & Patterns - Oli's Lab

Règles et patterns établis par Diego (et validés par Michele) lors des code reviews. À consulter avant toute décision d'implémentation.

---

## Architecture backend

### Pattern load / execute / return

Structure attendue pour toutes les méthodes de service dans l'API v2 :

```ts
// load   → appel DB, pas de logique métier
const cart = await cartRepository.findById(cartId)

// execute → logique métier pure, pas d'appel DB
const updatedCart = applyDiscount(cart, code)

// return  → retour du résultat
return updatedCart
```

Conséquence : la business logic dans `execute` est testable sans MongoDB. Les tests d'intégration couvrent `load`, les tests unitaires couvrent `execute`.

### Responsabilité du controller

Le controller ne valide pas les inputs. Sa seule responsabilité : orchestrer la logique.

La validation se fait en **middleware** avec Joi :

```ts
// Schema Joi
const schema = Joi.object({
  articleId: Joi.string().required(),
})

// Dans le router
router.post('/sync', validateSchema(schema), myController)
```

Règle : 1 champ à valider → validation manuelle inline acceptable. 2+ champs ou validation partagée entre endpoints → Joi obligatoire.

### Schémas partagés entre apps

Les schémas Mongoose utilisés par plusieurs apps (server, web-client) vont dans le package `@shared`. On partage le schéma, pas juste l'interface, pour pouvoir inférer les types via Mongoose.

### Scripts en production

**Aucun script ne tourne en production sans :**
1. Approbation de Michele ou communication préalable à l'équipe dans le channel tech
2. Le script étant commité dans le dossier `/scripts` du repo concerné (web app ou scientifique)

Jamais de scripts exécutés depuis Mongo Compass. Toujours passer par des fichiers versionnés.

---

## Frontend React

### useEffect : règles strictes

`useEffect` est la source la plus fréquente de bugs et de re-renders infinis. Règles sans exception :

**1. Chaque dépendance doit être stable.** Ne jamais mettre un array, un objet ou une fonction créée inline dans les dépendances : leur référence change à chaque render → boucle infinie.

```ts
// ❌ boucle infinie
useEffect(() => { fetchData() }, [myArray])

// ✅ stable
useEffect(() => { fetchData() }, [myArray.length])

// ✅ mount only si c'est vraiment ce qu'on veut
useEffect(() => { fetchData() }, [])
```

**2. Lire les warnings ESLint React Hooks.** Quand ESLint se plaint d'une dépendance manquante, c'est souvent un vrai problème qui indique la bonne dépendance à utiliser.

**3. Utiliser le React DevTools Profiler** après chaque modification de `useEffect` pour vérifier que le nombre de cycles reste raisonnable (< 80 sur cette app, alarm si > 500).

### Gestion du loading state

Anti-pattern : avoir un atom ou un state global de loading.

Pattern correct : loading state local au composant qui fait l'appel.

```ts
// ✅
const { data: orders, isLoading } = useUserOrders()
if (isLoading) return <Skeleton />
// ici, orders est toujours défini (jamais undefined)
```

Double bénéfice : état explicite dans le contexte + TypeScript sait que la donnée est définie après le check.

### State management : règles Jotai

Un atom Jotai est justifié si et seulement si l'état est **partagé entre plusieurs composants non liés par un parent commun proche**.

- État utilisé dans un seul composant → `useState` local
- État partagé dans un sous-arbre de composants → `useContext`
- État vraiment global (user, cart) → atom Jotai
- Données serveur (produits, commandes, etc.) → React Query, pas un atom

### Abstractions : règle des 10 lignes

Ne pas abstraire moins de 10 lignes de code sauf si :
- La logique est complexe et non évidente
- Le code est fortement réutilisé (3+ usages)

Trop d'abstractions = surcharge mémoire browser + perte de traçabilité au debug. Quand un `if` apparaît à l'intérieur d'une abstraction supposément générique, c'est un signal que cette abstraction devrait être deux fonctions séparées.

**Règle de Diego : dupliquer d'abord, abstraire si nécessaire.**

### Erreurs en frontend

`console.error` en production ne sert à rien. Personne ne voit la console en dehors du Q&A.

```ts
// ❌
console.error('Something failed', error)

// ✅
Sentry.captureException(error)
```

Sentry envoie les erreurs dans le channel Slack `#posthog-alerts`.

### TypeScript

Interdiction de `unknown` et `any`. Toujours utiliser des types génériques propres ou des types inférés depuis les schémas Mongoose/Payload.

---

## Base de données MongoDB

### Indexation

Règles de base :
- Le champ `_id` est toujours indexé → `findById()` est toujours rapide
- N'indexer que les champs interrogés fréquemment
- Chaque index coûte de la RAM et ralentit les écritures → ne pas tout indexer

Pour les index composites, l'ordre des champs est critique : mettre en premier le champ le plus sélectif (celui qui réduit le plus le nombre de documents).

```ts
// Filtrage par category puis subcategory → logique hiérarchique correcte
{ category: 1, subcategory: 1 }
```

### Analyser une requête

En développement, utiliser `.explain()` pour valider qu'une query est correctement indexée :

```ts
await Model.find(condition).explain('executionStats')
```

Métriques à regarder dans MongoDB Atlas (Query Insights) :
- **Documents examined** : plus important que l'execution time. Si on examine 90k documents pour retourner 10 résultats, il manque un index ou la requête est mal construite.
- **Execution time** : acceptable jusqu'à 1-2s, alarme au-delà.

### Migrations de schéma

Avant d'ajouter un champ `required` sur une collection existante, vérifier que tous les documents existants ont déjà une valeur pour ce champ. Sinon la migration casse.

Tester en local/staging avant la prod. Documenter la migration dans Notion, faire valider par Diego ou Michele avant d'exécuter.

### Champs gérés par l'automation Notion

Ne jamais écraser un champ dont la valeur vient de l'automation Notion (Make). L'automation va recrire par-dessus au prochain trigger.

Si un nouveau besoin émerge (ex. split scientifique des ingrédients) → créer un **nouveau champ** explicitement nommé, ne pas modifier le champ existant.

---

## Process & PRs

### Avant de coder

Pour les tâches non triviales : écrire le plan dans Notion et attendre validation avant de commencer à implémenter. Ça évite les allers-retours en review.

Si Diego ou Michele ne review pas le plan rapidement → commencer quand même après un délai raisonnable, mais signaler qu'on commence sans validation.

### Pendant la PR

Les discussions d'architecture restent dans Notion ou en réunion dédiée, pas dans les commentaires de code. Les commentaires GitHub sont réservés aux observations sur le code lui-même.

Si une suggestion de review est trop grosse pour être intégrée dans la PR en cours → ouvrir une PR séparée qui démontre l'approche.

### Philosophie startup

Michele : choisir le "bon assez" plutôt que l'idéal. La migration vers la nouvelle API et Next.js prime sur la perfection des tests ou des abstractions maintenant.

Corollaire de Diego : ne pas créer des factories ou de l'infrastructure de test pour de la business logic qui n'existe pas encore.
