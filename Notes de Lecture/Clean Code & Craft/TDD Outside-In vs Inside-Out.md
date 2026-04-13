> [!info]- Tags
> #SoftwareCraft #Tests #TDD

# TDD Outside-In vs Inside-Out

**Source :** J.B. Rainsberger, Sandro Mancuso — *Software Craftsmanship*, Steve Freeman & Nat Pryce — *Growing Object-Oriented Software Guided by Tests*

---

## Le problème de départ

Quand tu pratiques le TDD sur un vrai système (pas un kata), tu dois décider **par où commencer**. Deux écoles s'affrontent :

- **Inside-Out** (Chicago / Classique)
- **Outside-In** (London / Mockiste)

---

## Inside-Out — École de Chicago

### Principe

Tu commences par les **unités les plus internes** (logique métier pure, sans dépendances) et tu remontes progressivement vers les couches externes (controllers, API).

```
Logique métier → Service → Repository → Controller
```

### Comment ça fonctionne

1. Tu identifies la logique métier centrale
2. Tu écris des tests unitaires pour cette logique (pas de mocks, pas de dépendances)
3. Tu construis couche par couche en intégrant
4. L'architecture **émerge** des tests

### Avantages
- Tests solides sur la logique métier
- Pas de mocks = tests plus robustes, moins fragiles
- Tu comprends vraiment le domaine avant de construire l'interface

### Inconvénients
- Tu ne sais pas si l'architecture globale tient avant d'être avancé
- Risque de devoir refactorer profondément quand tu connectes les couches
- Moins adapté quand tu as un contrat d'interface externe à respecter (API)

---

## Outside-In — École de London

### Principe

Tu commences par les **tests de haut niveau** (acceptance tests, tests d'intégration) qui décrivent le comportement attendu de l'extérieur, puis tu **descends** vers l'implémentation en mockant les dépendances.

```
Test d'acceptance → Controller (mock Service) → Service (mock Repo) → Repository
```

### Comment ça fonctionne

1. Tu écris un test qui décrit le comportement attendu de bout en bout
2. Le test échoue car rien n'existe
3. Tu implémentes la couche externe en mockant la couche suivante
4. Tu descends couche par couche, guidé par les mocks

### Avantages
- L'architecture est guidée par l'usage réel dès le début
- Tu respectes les contrats d'interface
- Adapté aux systèmes avec dépendances externes nombreuses (APIs, BDD)
- Correspond bien au développement d'une feature complète de bout en bout

### Inconvénients
- Beaucoup de mocks → tests fragiles si les interfaces changent
- Le sur-mocking est un piège courant : on finit par tester les mocks, pas le code
- Demande une bonne maîtrise des doublures de tests

---

## Tableau comparatif

| | Inside-Out (Chicago) | Outside-In (London) |
|---|---|---|
| **Point de départ** | Logique métier interne | Interface externe / comportement utilisateur |
| **Mocks** | Peu ou pas | Nombreux |
| **Architecture** | Émerge des tests | Guidée dès le départ |
| **Risque principal** | Mauvaise architecture globale | Sur-mocking, tests fragiles |
| **Adapté pour** | Logique métier complexe, domaine riche | Features complètes, systèmes orientés API |
| **Auteurs associés** | Kent Beck | Freeman & Pryce, Sandro Mancuso |

---

## En pratique : comment choisir ?

**Utilise Inside-Out quand :**
- La logique métier est complexe et centrale
- Tu veux t'assurer de bien comprendre le domaine avant de construire
- Tu travailles sur un kata, une librairie, un algorithme

**Utilise Outside-In quand :**
- Tu développes une feature complète (de l'UI à la BDD)
- Tu as un contrat d'API à respecter (back → front, microservices)
- Tu veux guider ton design par l'usage réel

**Dans un contexte réel :** les deux approches se combinent. On commence souvent par un test d'acceptance (outside-in) qui échoue, puis on implémente en inside-out les unités internes, et on revient au test d'acceptance pour vérifier l'intégration.

---

## Piège classique du Outside-In : le sur-mocking

```js
// ❌ Tester les mocks, pas le comportement réel
it('should call repository.save', () => {
  const mockRepo = { save: jest.fn() };
  const service = new OrderService(mockRepo);
  service.createOrder(data);
  expect(mockRepo.save).toHaveBeenCalled(); // on teste juste qu'on appelle save
});

// ✅ Tester le comportement observable
it('should return created order with generated id', () => {
  const order = await service.createOrder(data);
  expect(order.id).toBeDefined();
  expect(order.status).toBe('pending');
});
```

Le premier test est couplé à l'implémentation. Le second teste le comportement. Si tu refactores l'intérieur de `createOrder`, le premier casse, le second non.

---

## À retenir

Il n'y a pas d'approche universellement supérieure. La vraie compétence est de savoir **pourquoi tu choisis** l'une ou l'autre selon le contexte. Dans ton contexte Oli's Lab (API Express + frontend React), Outside-In est souvent le point de départ naturel pour une feature — mais les unités métier au cœur méritent un Inside-Out rigoureux.
