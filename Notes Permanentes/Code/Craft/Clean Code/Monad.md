---
tags:
  - SoftwareCraft
---
Un Monad est un pattern de programmation fonctionnelle qui permet de **chaîner des opérations sur une valeur encapsulée** tout en gérant automatiquement un contexte particulier : absence de valeur, erreur, asynchronicité.

Le terme fait peur. En pratique, c'est une abstraction que tu utilises déjà sans le savoir.

---

## La structure de base

Un Monad est une structure qui respecte trois choses :
- Une façon d'encapsuler une valeur (`of` / `return`)
- Une façon d'appliquer une fonction sur la valeur encapsulée et de récupérer un nouveau Monad (`map`)
- Une façon de chaîner des opérations qui retournent elles-mêmes un Monad, sans créer d'imbrication (`flatMap` / `chain` / `bind`)

```js
// Promise — c'est un Monad asynchrone
Promise.resolve(5)          // encapsule 5
  .then(x => x * 2)         // map — transforme la valeur
  .then(x => Promise.resolve(x + 1)) // flatMap — chaîne sans imbriquer
```

Sans `flatMap`, chaîner des `then` qui retournent eux-mêmes des Promises produirait des `Promise<Promise<...>>` imbriquées. `then` aplatit automatiquement : c'est le comportement Monadique.

---

## Maybe / Option - gérer l'absence

Le Monad le plus utile au quotidien. Il encapsule une valeur qui peut être présente (`Some(valeur)`) ou absente (`None`). Il force l'appelant à gérer les deux cas, au lieu de laisser `null` se propager et crasher ailleurs.

```js
class Maybe {
  static of(value) {
    return value == null ? new Nothing() : new Just(value);
  }
}

class Just {
  constructor(value) { this.value = value; }
  map(fn) { return Maybe.of(fn(this.value)); }
  flatMap(fn) { return fn(this.value); }
  getOrElse(_default) { return this.value; }
}

class Nothing {
  map(_fn) { return this; }
  flatMap(_fn) { return this; }
  getOrElse(defaultValue) { return defaultValue; }
}

// Usage
const city = Maybe.of(user)
  .flatMap(u => Maybe.of(u.address))
  .flatMap(a => Maybe.of(a.city))
  .getOrElse('Non renseigné');
```

Comparer avec le optional chaining `user?.address?.city ?? 'Non renseigné'` : même intention, mais le Monad est composable et transformable via `map`, là où le `?.` est juste du sucre syntaxique.

Le lien avec [[Primitives]] : là où `null` ou `undefined` peuvent se propager silencieusement, un `Maybe` rend l'absence explicite dans le type et dans le flux.

---

## Either - gérer les erreurs sans exceptions

Là où `Maybe` gère l'absence, `Either` gère le succès ou l'échec avec information sur l'erreur. Un `Either` est soit un `Right(valeur)` (succès), soit un `Left(erreur)` (échec).

```js
class Right {
  constructor(value) { this.value = value; }
  map(fn) { return new Right(fn(this.value)); }
  flatMap(fn) { return fn(this.value); }
  fold(_leftFn, rightFn) { return rightFn(this.value); }
}

class Left {
  constructor(error) { this.error = error; }
  map(_fn) { return this; }       // les erreurs passent sans toucher à map
  flatMap(_fn) { return this; }
  fold(leftFn, _rightFn) { return leftFn(this.error); }
}

function parseUser(data) {
  if (!data.email) return new Left('Email requis');
  if (!data.name) return new Left('Nom requis');
  return new Right({ email: data.email, name: data.name });
}

parseUser({ email: 'a@b.com', name: 'Rémy' })
  .map(user => ({ ...user, role: 'admin' }))
  .fold(
    err => console.error('Erreur:', err),
    user => console.log('OK:', user)
  );
```

L'avantage sur les `try/catch` : le flux d'erreur est explicite dans le type de retour, composable via `map` et `flatMap`, sans altérer le flux normal d'exécution.

---

## Monads et les lois

Pour être un vrai Monad, la structure doit respecter trois lois algébriques (identité gauche, identité droite, associativité). En pratique, ce qui compte : le comportement est **prévisible et composable**. `Promise` respecte ces lois dans ses grandes lignes, ce qui explique pourquoi `async/await` fonctionne si bien comme abstraction.

---

## Quand l'utiliser

Pas besoin de librairie fonctionnelle complète pour tirer parti de ces idées. Un `Maybe` maison de 20 lignes peut suffire. Le vrai bénéfice : moins de `null` checks dispersés, moins de bugs silencieux, un code qui **explicite** dans son flux ce qu'il peut ou ne peut pas produire.

À lier avec [[Immutabilité]], les Monads produisent des nouvelles valeurs à chaque transformation, ils ne mutent jamais leur contenu.
