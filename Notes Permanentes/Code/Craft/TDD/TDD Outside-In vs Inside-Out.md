---
tags: [SoftwareCraft, Tests, TDD]
---

Quand tu pratiques le [[TDD]] sur un vrai système, tu dois décider **par où commencer**. Deux écoles s'affrontent.

---

## Inside-Out — École de Chicago

Tu commences par les **unités les plus internes** (logique métier pure, sans dépendances) et tu remontes progressivement vers les couches externes.

```
Logique métier → Service → Repository → Controller
```

L'architecture **émerge** des tests. Peu ou pas de mocks — les tests sont plus robustes. Tu comprends vraiment le domaine avant de construire l'interface.

Risque principal : tu ne sais pas si l'architecture globale tient avant d'être avancé. Potentiellement beaucoup de refactoring quand tu connectes les couches.

**À utiliser quand :** la logique métier est complexe et centrale, ou sur un kata/librairie/algorithme.

---

## Outside-In — École de London

Tu commences par les **tests de haut niveau** (acceptance tests) qui décrivent le comportement attendu de l'extérieur, puis tu **descends** vers l'implémentation en mockant les dépendances.

```
Test d'acceptance → Controller (mock Service) → Service (mock Repo) → Repository
```

L'architecture est guidée par l'usage réel dès le début. Adapté aux features complètes de bout en bout, aux systèmes avec beaucoup de dépendances externes.

Risque principal : sur-mocking. On finit par tester les mocks, pas le comportement réel.

```js
// ❌ Tester l'implémentation, pas le comportement
expect(mockRepo.save).toHaveBeenCalled();

// ✅ Tester le comportement observable
expect(order.id).toBeDefined();
expect(order.status).toBe('pending');
```

**À utiliser quand :** feature complète de l'UI à la BDD, contrat d'API à respecter, microservices.

---

## En pratique

Les deux approches se combinent. On commence souvent par un test d'acceptance (outside-in) qui échoue, puis on implémente les unités internes en inside-out, et on revient au test d'acceptance pour vérifier l'intégration.

Dans le contexte d'une API Express + frontend React (Oli's Lab), Outside-In est souvent le point de départ naturel pour une feature — mais les unités métier au cœur méritent un Inside-Out rigoureux.

---

## Tableau comparatif

| | Inside-Out (Chicago) | Outside-In (London) |
|---|---|---|
| **Point de départ** | Logique métier interne | Comportement utilisateur |
| **Mocks** | Peu ou pas | Nombreux |
| **Architecture** | Émerge des tests | Guidée dès le départ |
| **Risque principal** | Mauvaise architecture globale | Sur-mocking, tests fragiles |
| **Auteurs** | Kent Beck | Freeman & Pryce, Sandro Mancuso |

---

## Liens

- [[TDD]] — les deux approches sont des déclinaisons du même cycle Red / Green / Refactor
- [[Domain-Driven Design]] — Outside-In est naturel en DDD : on part du comportement attendu du domaine
- [[Doublures de tests]] — les mocks sont au cœur du Outside-In, leur bon usage est critique
