> [!info]- Tags
> #SoftwareCraft #DDD #LectureNote

# Domain-Driven Design — Introduction

**Source :** Eric Evans — *Domain-Driven Design: Tackling Complexity in the Heart of Software* (2003), Vaughn Vernon — *Implementing Domain-Driven Design*

---

## Qu'est-ce que le DDD ?

Le **Domain-Driven Design** est une approche de conception logicielle qui place le **domaine métier** au centre de toutes les décisions techniques. Il a été formalisé par Eric Evans en 2003.

L'idée de départ est simple mais radicale :

> La complexité d'un logiciel vient rarement de la technique. Elle vient de la **complexité du domaine métier** qu'il modélise.

Le DDD propose un ensemble de pratiques pour dompter cette complexité — pas en la cachant derrière une architecture, mais en la **modélisant explicitement dans le code**.

---

## Le problème que DDD résout

Dans la plupart des projets, il existe un fossé entre :
- Ce que **les experts métier** comprennent du problème
- Ce que **les développeurs** ont codé

Ce fossé se traduit par : des noms de variables incompréhensibles pour le métier, une logique métier dispersée dans des services, des controllers, des utils, et une base de code que personne ne peut expliquer à un non-développeur.

DDD propose de **combler ce fossé** en faisant du code le reflet direct du domaine.

---

> [!note] Notes dédiées à créer
> Les concepts suivants auront chacun leur propre note : [[Ubiquitous Language]] `#TODO`, [[Bounded Context]] `#TODO`, [[Domain Model]] `#TODO`, [[Entity]] `#TODO`, [[Value Object]] `#TODO`, [[Aggregate]] `#TODO`, [[Repository (DDD)]] `#TODO`, [[Domain Service]] `#TODO`.

## Les deux niveaux du DDD

Eric Evans distingue deux parties dans son approche :

**DDD Stratégique** — comment découper et organiser un système complexe à grande échelle.
**DDD Tactique** — comment modéliser le domaine dans le code au niveau des classes et objets.

La plupart des équipes sautent directement au tactique. C'est une erreur — le stratégique est ce qui donne du sens au tactique.

---

## Concepts fondamentaux

### Ubiquitous Language (Langage Omniprésent)

Le concept le plus important du DDD, et souvent le plus négligé.

L'idée : développeurs et experts métier doivent parler le **même langage**. Ce langage doit être utilisé partout — dans les conversations, les tickets, et **dans le code**.

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

Si un expert métier lit ton code et ne reconnaît pas les mots qu'il utilise au quotidien, c'est un signal que l'Ubiquitous Language n'est pas appliqué.

### Bounded Context (Contexte Délimité)

Un grand système métier contient plusieurs sous-domaines qui ont leurs propres règles, leur propre vocabulaire, parfois même leurs propres définitions des mêmes mots.

Exemple : le mot **"client"** ne veut pas dire la même chose dans le contexte **facturation** (un débiteur avec un solde) et dans le contexte **support** (une personne avec un historique de tickets).

Un **Bounded Context** est une frontière explicite à l'intérieur de laquelle un modèle de domaine est cohérent et unifié. En dehors de cette frontière, le même mot peut avoir un sens différent.

```
[ Contexte Commande ]      [ Contexte Facturation ]
  Client = acheteur          Client = débiteur
  Produit = article           Produit = ligne de facture
```

Chaque Bounded Context a son propre modèle, son propre code, potentiellement sa propre base de données.

### Domain Model

Le **modèle de domaine** est la représentation en code des concepts, règles et comportements du métier. Ce n'est pas un schéma de base de données. Ce n'est pas une liste de CRUD. C'est une modélisation des **comportements et invariants** du domaine.

---

## Blocs de construction tactiques (Building Blocks)

### Entity

Un objet défini par son **identité**, pas par ses attributs. Deux entités avec les mêmes attributs mais des IDs différents sont deux objets distincts.

```js
// Un Order est une Entity — il a un ID unique
class Order {
  constructor(id, customer, items) {
    this.id = id; // identité
    this.customer = customer;
    this.items = items;
    this.status = 'pending';
  }

  confirm() {
    if (this.items.length === 0) throw new Error('Cannot confirm empty order');
    this.status = 'confirmed';
  }
}
```

### Value Object

Un objet défini par ses **valeurs**, sans identité propre. Deux Value Objects avec les mêmes valeurs sont interchangeables. Ils sont **immuables**.

```js
// Money est un Value Object — pas d'ID, immuable
class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
    Object.freeze(this); // immuable
  }

  add(other) {
    if (this.currency !== other.currency) throw new Error('Currency mismatch');
    return new Money(this.amount + other.amount, this.currency); // retourne un nouveau VO
  }

  equals(other) {
    return this.amount === other.amount && this.currency === other.currency;
  }
}
```

Value Objects sont puissants pour **éliminer la Primitive Obsession** (cf. Code Smells).

### Aggregate

Un **Aggregate** est un groupe d'Entities et Value Objects traité comme une unité. Il a une **racine (Aggregate Root)** — la seule entité accessible de l'extérieur.

Règle clé : on ne modifie les objets d'un Aggregate qu'en passant par sa racine.

```js
// Order est l'Aggregate Root — OrderLine ne s'accède qu'à travers Order
class Order { // Aggregate Root
  addLine(product, quantity) {
    const line = new OrderLine(product, quantity); // Entity interne
    this.lines.push(line);
  }

  // L'extérieur n'accède jamais directement à OrderLine
}
```

### Repository

Abstraction qui **isole la logique métier de la persistance**. Le domaine ne sait pas si les données viennent d'une BDD SQL, d'une API, d'un cache.

```js
// Interface du domaine — pas de SQL ici
class OrderRepository {
  findById(id) { throw new Error('Not implemented'); }
  save(order) { throw new Error('Not implemented'); }
}

// Implémentation infrastructure — séparée
class PostgresOrderRepository extends OrderRepository {
  findById(id) { return db.query('SELECT ...'); }
}
```

### Domain Service

Logique métier qui **n'appartient naturellement à aucune Entity ou Value Object**. À utiliser avec parcimonie — si trop de logic se retrouve dans des services, c'est souvent le signe d'un modèle anémique.

---

## Modèle Anémique — l'anti-pattern central

Le **Modèle Anémique** (Martin Fowler) est le pattern le plus répandu dans les projets qui *croient* faire du DDD sans en appliquer l'esprit.

```js
// ❌ Modèle anémique — Order n'a que des getters/setters, zéro logique
class Order {
  getId() { return this.id; }
  getStatus() { return this.status; }
  setStatus(status) { this.status = status; }
}

// Toute la logique est dans un service externe
class OrderService {
  confirmOrder(order) {
    if (order.getItems().length === 0) throw new Error('...');
    order.setStatus('confirmed'); // le service manipule l'état directement
  }
}
```

```js
// ✅ Modèle riche — la logique appartient à l'objet qui en a la responsabilité
class Order {
  confirm() {
    if (this.items.length === 0) throw new Error('Cannot confirm empty order');
    this.status = 'confirmed';
  }
}
```

Un modèle anémique = violation du SRP + Feature Envy généralisé + logique métier introuvable.

---

## DDD et les autres pratiques Craft

| Pratique | Lien avec DDD |
|---|---|
| **Ubiquitous Language** | Application directe de l'intention (Clean Code) |
| **Value Objects** | Éliminent la Primitive Obsession (Code Smells) |
| **Aggregates** | Application du SRP et de la Loi de Déméter |
| **Repository** | Application du DIP (SOLID) |
| **Bounded Contexts** | Faible couplage entre sous-systèmes (Coupling & Cohesion) |
| **TDD** | Le TDD Outside-In est naturel en DDD : on part du comportement attendu du domaine |

---

## Pistes pour étendre cette note

Les sujets ci-dessous sont la suite logique — à explorer dans cet ordre :

**1. Context Mapping** `#TODO`
Comment les Bounded Contexts communiquent entre eux. Patterns : Shared Kernel, Customer/Supplier, Anti-Corruption Layer, Open Host Service. C'est le cœur du DDD Stratégique.

**2. Domain Events** `#TODO`
Les événements métier comme première classe du modèle. `OrderConfirmed`, `PaymentReceived`. Lien direct avec le pattern Observer et les architectures event-driven.

**3. CQRS — Command Query Responsibility Segregation** `#TODO`
Séparer les opérations de lecture (Query) des opérations d'écriture (Command). Souvent couplé au DDD dans les systèmes complexes.

**4. Event Sourcing** `#TODO`
Plutôt que de stocker l'état courant, stocker la séquence d'événements qui y a mené. Lié aux Domain Events et CQRS.

**5. Bounded Contexts en pratique** `#TODO`
Comment délimiter concrètement les contextes dans une codebase existante. Applicable directement à Oli's Lab (catalogue produits, commandes, paiement = contextes distincts ?).

**6. Aggregate design en profondeur** `#TODO`
Les 4 règles de Vaughn Vernon pour bien concevoir les Aggregates : protéger les invariants, regrouper par transaction, référencer par ID entre Aggregates, viser de petits Aggregates.
