---
tags: [SoftwareCraft, DDD]
---

Le **Domain-Driven Design** est une approche de conception qui place le **domaine métier** au centre de toutes les décisions techniques. Formalisé par Eric Evans en 2003.

> La complexité d'un logiciel vient rarement de la technique. Elle vient de la **complexité du domaine métier** qu'il modélise.

Le DDD propose de modéliser cette complexité **explicitement dans le code** — pas de la cacher derrière une architecture.

---

## Le problème central

Dans la plupart des projets, il existe un fossé entre ce que les experts métier comprennent et ce que les développeurs ont codé. Résultat : logique métier dispersée dans des services, des controllers, des utils, et une base de code que personne ne peut expliquer à un non-développeur.

---

## Les deux niveaux du DDD

**DDD Stratégique** — comment découper et organiser un système complexe à grande échelle (Bounded Contexts, Context Mapping).

**DDD Tactique** — comment modéliser le domaine dans le code (Entities, Value Objects, Aggregates...).

La plupart des équipes sautent au tactique. Erreur — le stratégique donne du sens au tactique.

---

## Concepts fondamentaux

### Ubiquitous Language

Le concept le plus important, et souvent le plus négligé. Développeurs et experts métier doivent parler le **même langage**, utilisé partout : conversations, tickets, et **code**.

```js
// ❌ Langage technique déconnecté du métier
class OrderProcessor {
  processItem(itemId, qty, discount) { ... }
}

// ✅ Langage du domaine
class Cart {
  addProduct(product, quantity) { ... }
  applyPromoCode(promoCode) { ... }
}
```

### Bounded Context

Un grand système contient plusieurs sous-domaines avec leurs propres règles et vocabulaire. Le mot "client" ne veut pas dire la même chose en facturation et en support.

Un **Bounded Context** est une frontière explicite à l'intérieur de laquelle le modèle est cohérent. Chaque contexte a son propre code, potentiellement sa propre base de données. Lien direct avec le [[Coupling & Cohesion|faible couplage entre sous-systèmes]].

### Domain Model

Représentation en code des concepts, règles et comportements du métier. Ce n'est pas un schéma de BDD. Ce n'est pas du CRUD. C'est une modélisation des **comportements et invariants** du domaine.

---

## Blocs de construction tactiques

**Entity** — objet défini par son **identité**, pas ses attributs. Deux entités avec les mêmes attributs mais des IDs différents sont deux objets distincts. Elles encapsulent leur propre logique métier.

**Value Object** — objet défini par ses **valeurs**, sans identité propre. Immuable. Deux Value Objects avec les mêmes valeurs sont interchangeables. Puissants pour éliminer la [[Code Smells|Primitive Obsession]].

```js
class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
    Object.freeze(this); // immuable
  }
  add(other) {
    if (this.currency !== other.currency) throw new Error('Currency mismatch');
    return new Money(this.amount + other.amount, this.currency);
  }
}
```

**Aggregate** — groupe d'Entities et Value Objects traité comme une unité. Il a une **racine (Aggregate Root)** — la seule entité accessible de l'extérieur. On ne modifie les objets d'un Aggregate qu'en passant par sa racine. Application directe de la [[Loi de Déméter]].

**Repository** — abstraction qui isole la logique métier de la persistance. Le domaine ne sait pas si les données viennent d'une BDD SQL, d'une API, d'un cache. Application directe du DIP ([[Les Principes SOLID]]).

**Domain Service** — logique métier qui n'appartient naturellement à aucune Entity ou Value Object. À utiliser avec parcimonie.

---

## L'anti-pattern central : le Modèle Anémique

Le **Modèle Anémique** (Martin Fowler) est le pattern le plus répandu dans les projets qui croient faire du DDD sans en appliquer l'esprit.

```js
// ❌ Modèle anémique — Order n'a que des getters/setters, zéro logique
class Order {
  setStatus(status) { this.status = status; }
}
class OrderService {
  confirmOrder(order) {
    if (order.getItems().length === 0) throw new Error('...');
    order.setStatus('confirmed'); // le service manipule l'état directement
  }
}

// ✅ Modèle riche — la logique appartient à l'objet
class Order {
  confirm() {
    if (this.items.length === 0) throw new Error('Cannot confirm empty order');
    this.status = 'confirmed';
  }
}
```

Un modèle anémique = violation du SRP + [[Code Smells|Feature Envy]] généralisé + logique métier introuvable.

---

## DDD et les autres pratiques Craft

| Pratique                | Lien avec DDD                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Ubiquitous Language** | Application directe de l'intention (Clean Code, [[L’art du nommage]])                                        |
| **Value Objects**       | Éliminent la Primitive Obsession ([[Code Smells]])                                                           |
| **Aggregates**          | Application du SRP et de la [[Loi de Déméter]]                                                               |
| **Repository**          | Application du DIP ([[Les Principes SOLID]])                                                                 |
| **Bounded Contexts**    | Faible couplage entre sous-systèmes ([[Coupling & Cohesion]])                                                |
| **TDD**                 | [[TDD Outside-In vs Inside-Out\|Outside-In]] est naturel en DDD : on part du comportement attendu du domaine |

---

## À explorer ensuite

- **Context Mapping** — comment les Bounded Contexts communiquent. Patterns : Shared Kernel, Anti-Corruption Layer, Open Host Service.
- **Domain Events** — `OrderConfirmed`, `PaymentReceived`. Lien avec le pattern [[Design Patterns Behavioral|Observer]] et les architectures event-driven.
- **CQRS** — séparer les opérations de lecture (Query) des opérations d'écriture (Command).
- **Aggregate design** — les 4 règles de Vaughn Vernon : protéger les invariants, regrouper par transaction, référencer par ID entre Aggregates, viser de petits Aggregates.
