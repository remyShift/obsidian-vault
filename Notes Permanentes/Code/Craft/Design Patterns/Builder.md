---
tags: [SoftwareCraft, DesignPatterns, Creational]
---

Construire un objet complexe **étape par étape**, avec des paramètres optionnels, sans constructeur à rallonge ni objet de configuration fourre-tout.

```js
const query = new QueryBuilder('orders')
  .where('status', 'pending')
  .join('customers', 'orders.customer_id = customers.id')
  .orderBy('created_at', 'DESC')
  .limit(10)
  .build();
```

Chaque méthode retourne `this` pour permettre le chaînage. `.build()` retourne l'objet final.

```js
class QueryBuilder {
  constructor(table) {
    this.table = table;
    this.conditions = [];
    this.joins = [];
    this._limit = null;
    this._orderBy = null;
  }

  where(field, value) {
    this.conditions.push({ field, value });
    return this;
  }

  join(table, on) {
    this.joins.push({ table, on });
    return this;
  }

  limit(n) {
    this._limit = n;
    return this;
  }

  orderBy(field, direction = 'ASC') {
    this._orderBy = { field, direction };
    return this;
  }

  build() {
    // assemble et retourne la query finale
    return { table: this.table, conditions: this.conditions, ...this._orderBy && { orderBy: this._orderBy }, ...this._limit && { limit: this._limit } };
  }
}
```

## En pratique sur Oli's Lab

Les **fixtures de test** sont un cas d'usage direct. Plutôt qu'un `new Product(null, null, null, 'active', null, 12)` illisible :

```js
const product = new ProductBuilder()
  .withName('Sérum Vitamine C')
  .withStatus('active')
  .withPrice(12)
  .build();
```

## Signal d'usage

Constructeur avec 4+ paramètres, surtout s'ils sont optionnels. Dans l'écosystème JS/Node : Knex.js, Mongoose query API, jest.fn() — tous utilisent Builder.

## Erreur classique

Oublier que `.build()` doit valider l'objet avant de le retourner. Si certains champs sont obligatoires, c'est là que tu lèves l'erreur, pas à l'usage.

---

- [[Design Patterns Creational]] — vue d'ensemble des patterns creational
