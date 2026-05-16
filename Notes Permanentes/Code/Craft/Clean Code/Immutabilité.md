---
tags:
  - SoftwareCraft
  - CleanCode
---
Un objet immuable est un objet dont l'état **ne peut pas être modifié après sa création**. Pour "modifier" quelque chose, on crée un nouvel objet avec les nouvelles valeurs. L'original reste intact.

C'est le comportement natif des [[Primitives|primitives]] en JavaScript, et c'est ce qu'on cherche à reproduire sur nos objets et structures de données.

---

## Pourquoi ça simplifie tout

La mutation partagée est une source majeure de bugs dans les systèmes concurrents et dans les codebase complexes. Quand un objet peut être modifié depuis n'importe où, il devient impossible de raisonner sur son état à un instant donné.

```js
// ❌ mutation partagée — le bug est loin de la cause
const cart = { items: [], total: 0 };

function addItem(cart, item) {
  cart.items.push(item);     // mutation directe
  cart.total += item.price;  // mutation directe
  return cart;
}

const cart2 = addItem(cart, { name: 'Sérum', price: 45 });
console.log(cart === cart2); // true — c'est le même objet
// quiconque avait une référence à cart voit la modification
```

```js
// ✅ immuable — chaque opération produit un nouvel état
function addItem(cart, item) {
  return {
    items: [...cart.items, item],
    total: cart.total + item.price
  };
}

const cart2 = addItem(cart, { name: 'Sérum', price: 45 });
console.log(cart === cart2); // false — deux objets distincts
// cart est intact, cart2 est le nouvel état
```

---

## `Object.freeze()`

Mécanisme natif JavaScript pour rendre un objet non-modifiable en surface. Toute tentative de modification échoue silencieusement (ou lève une erreur en strict mode).

```js
const money = Object.freeze({ amount: 100, currency: 'EUR' });
money.amount = 200; // silently fails
console.log(money.amount); // 100
```

**Limitation** : `freeze` est **superficiel**. Les objets imbriqués ne sont pas gelés.

```js
const order = Object.freeze({
  id: '123',
  customer: { name: 'Rémy' }  // pas frozen
});

order.customer.name = 'Hack'; // ça passe
```

Pour un deep freeze, il faut une fonction récursive ou une librairie. En pratique, on gère ça par convention et discipline plutôt que par enforcement technique à chaque niveau.

---

## Immuabilité dans les [[Value Object|Value Objects]]

Les Value Objects en DDD **doivent être immuables** par définition. C'est leur contrat. `Object.freeze()` à la construction est le moyen le plus simple de le garantir.

```js
class Money {
  constructor(amount, currency) {
    if (amount < 0) throw new Error('Montant invalide');
    this.amount = amount;
    this.currency = currency;
    Object.freeze(this);
  }

  add(other) {
    if (this.currency !== other.currency) throw new Error('Devises incompatibles');
    return new Money(this.amount + other.amount, this.currency); // nouvel objet
  }
}
```

---

## Les structures de données immuables

Pour les tableaux et objets, les opérations immuables sont celles qui retournent une nouvelle structure sans modifier l'originale.

```js
// Tableaux — opérations immuables
const newItems = [...items, newItem];          // ajout
const filtered = items.filter(i => i.id !== id); // suppression
const updated = items.map(i => i.id === id ? { ...i, ...changes } : i); // update

// Objets — spread operator
const updatedUser = { ...user, email: newEmail };
```

`push`, `pop`, `splice`, `sort`, `reverse` sont **mutantes**. à éviter sur des données partagées ou qui transitent entre composants.

---

## `const` n'est pas de l'immuabilité

`const` empêche la **réassignation** de la variable, pas la mutation de l'objet référencé. C'est une confusion fréquente.

```js
const items = [];
items.push('a'); // ça passe — on mute l'objet, on ne réassigne pas la variable
items = [];      // TypeError — là, const protège
```

---

## Immuabilité et performance

Créer de nouveaux objets à chaque opération a un coût. En pratique, sur des objets de taille raisonnable, ce coût est négligeable comparé au gain en prévisibilité et en maintenabilité.

Pour des structures de données très larges avec beaucoup de modifications, des librairies comme **Immer** (qui utilise des Proxy pour permettre d'écrire du code "mutatif" qui produit en réalité des structures immuables) ou **Immutable.js** (structure de données persistantes avec structural sharing) résolvent ce problème. En dehors de ces cas, l'immuabilité "naïve" au spread operator est suffisante.

---

## Lien avec les autres pratiques

Les [[Monad|Monads]] sont immuables par nature : chaque `map` produit un nouveau Monad. [[Memoize]] fonctionne correctement uniquement si les arguments sont immuables (sinon, la clé de cache peut référencer des données mutées). Les [[Value Object|Value Objects]] en DDD sont la matérialisation de l'immuabilité au niveau du domaine.
