---
tags: [SoftwareCraft, DDD]
---

Les notes sur le [[Domain-Driven Design]] couvrent déjà les fondamentaux. Ici on creuse les points qui demandent plus de recul : le design des Aggregates, le Context Mapping, et les erreurs de mise en oeuvre fréquentes.

---

## Aggregate Design : les 4 règles de Vaughn Vernon

Un Aggregate est un groupe d'Entities et de Value Objects traité comme une unité de cohérence. La question qui revient toujours : qu'est-ce qui doit appartenir au même Aggregate ?

**1. Protéger les invariants à l'intérieur d'un Aggregate.** Les règles métier qui concernent plusieurs objets ensemble doivent être vérifiables dans une seule transaction. Si deux concepts doivent être cohérents en permanence, ils appartiennent probablement au même Aggregate.

**2. Concevoir de petits Aggregates.** La tentation est de mettre tout ce qui "va ensemble" dans un seul Aggregate. C'est une erreur : plus l'Aggregate est grand, plus les transactions sont longues, plus les conflits de concurrence augmentent. Un `Order` avec ses `OrderLines` : oui. Un `Order` avec le `Customer` complet et son `PaymentHistory` : non.

**3. Référencer les autres Aggregates par leur identité, pas par référence directe.** Un Aggregate ne charge pas un autre Aggregate dans son graphe objet. Il stocke son ID. La résolution se fait au niveau applicatif via les repositories.

```js
class Order {
  constructor({ id, customerId, lines }) { // customerId, pas customer
    this.id = id;
    this.customerId = customerId; // juste l'ID
    this.lines = lines;
  }
}
```

**4. Mettre à jour les autres Aggregates via des Domain Events.** Si confirmer une commande doit déclencher une réservation de stock, l'`Order` émet un `OrderConfirmed` event. Le handler met à jour le `StockItem` dans une transaction séparée. Eventual consistency assumée, couplage minimal.

---

## Context Mapping

Quand plusieurs Bounded Contexts doivent interagir, il faut définir comment. Le Context Mapping décrit ces relations.

**Shared Kernel** : deux contexts partagent un bout de modèle commun. Simplicité immédiate, couplage à long terme. À réserver pour des concepts vraiment stables.

**Customer/Supplier** : un context (upstream) produit des données, un autre (downstream) les consomme. Le downstream s'adapte à l'upstream. Relation asymétrique, claire.

**Anti-Corruption Layer (ACL)** : le downstream ne consomme pas directement le modèle de l'upstream. Il crée une couche de traduction qui protège son propre modèle. Indispensable quand l'upstream est un système externe, legacy, ou dont le modèle ne correspond pas au vôtre.

```js
// ACL — traduction du modèle Stripe vers le modèle du domaine
class StripePaymentAdapter {
  toDomain(stripeEvent) {
    return new PaymentReceived({
      orderId: stripeEvent.metadata.order_id,
      amount: new Money(stripeEvent.amount / 100, stripeEvent.currency.toUpperCase()),
      receivedAt: new Date(stripeEvent.created * 1000)
    });
  }
}
```

**Open Host Service** : un context publie une API claire et stable pour que les autres puissent s'y connecter. Il gère la compatibilité vers l'arrière.

---

## Les erreurs de mise en oeuvre

**Confondre DDD tactique et DDD.** Les patterns tactiques (Entity, Value Object, Aggregate...) sans la réflexion stratégique sur les Bounded Contexts, c'est du DDD cosmétique. On renomme des classes sans changer l'architecture. Le stratégique donne du sens au tactique.

**Le Repository comme DAO.** Un Repository n'est pas un `OrderDAO` avec des méthodes CRUD. Il expose un contrat orienté domaine : `findById`, `findByCustomer`, `save`. Les détails SQL ou HTTP sont derrière l'interface, invisibles du domaine. Application directe du DIP ([[Les Principes SOLID]]).

**Les Domain Events comme simple logging.** Un Domain Event n'est pas un log. C'est un fait du domaine qui peut déclencher des comportements dans d'autres contexts. Il doit être nommé dans l'Ubiquitous Language, porter les informations nécessaires aux consommateurs, et être traité comme un contrat.

**Les Aggregates trop grands.** C'est l'erreur la plus fréquente. On pense qu'un `User` doit contenir ses `Orders`, ses `Addresses`, ses `Notifications`. Non. Chacun a son propre cycle de vie, ses propres invariants. Sépare-les.

---

## DDD et les contextes sans forte complexité métier

DDD vaut l'investissement sur les **core domains** : les fonctionnalités qui différencient le produit, où la logique métier est riche et changeante. Sur les **generic subdomains** (authentification, envoi d'email, facturation standard), utiliser des solutions off-the-shelf ou un CRUD simple est souvent la meilleure décision. Cf. [[Domain-Driven Design]].
