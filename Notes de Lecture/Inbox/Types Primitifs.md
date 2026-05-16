---
created: 2025-05-16 00:00
type: fleeting
status: to-process
tags: [inbox, CleanCode, DDD]
---

# Types Primitifs

## Idée brute

Un **type primitif** est une valeur de base fournie par le langage (`string`, `number`, `boolean`, `null`, `undefined` en JS). Pas d'identité, pas de comportement, juste une donnée brute.

Le problème : dès qu'un concept métier est représenté par un primitif, on perd l'expressivité et la sécurité.

```js
// Que représente ce "string" ? Un email ? Un nom ? Un slug ?
function createUser(id, email, role) { ... }
createUser("usr_123", "remy@oli.com", "admin"); // on est à un typo d'un bug silencieux
```

Ce que ça provoque en cascade :
- La validation est éparpillée partout dans le code (chaque service re-vérifie que l'email est valide)
- Un `number` pour un prix et un `number` pour une quantité sont interchangeables pour le compilo, mais pas pour le métier
- Les invariants du domaine ne sont appliqués nulle part de façon centralisée

La solution directe est le [[Value Object]] : encapsuler le primitif dans un type dédié qui porte les règles de validation et l'intention.

```js
class Email {
  constructor(value) {
    if (!value.includes('@')) throw new Error('Email invalide');
    this.value = value.toLowerCase();
    Object.freeze(this);
  }
}

class Money {
  constructor(amount, currency) {
    if (amount < 0) throw new Error('Montant négatif impossible');
    this.amount = amount;
    this.currency = currency;
    Object.freeze(this);
  }
}
```

C'est exactement ce que le DDD appelle **Primitive Obsession** dans les [[Code Smells]].

## Contexte

Concept transversal qui traverse le DDD (Value Objects), les Code Smells (Primitive Obsession) et le Clean Code (Révéler l'intention). Vu en lisant les notes sur le [[Domain-Driven Design]] et [[Code Smells]].

## À faire

- [ ] Trier : garder / promouvoir en Note Permanente / supprimer
- [ ] Relier à [[Value Object]] et [[Code Smells]]
- [ ] Cas concret sur Oli's Lab : prix, quantité, email client sont tous des primitifs en ce moment
