---
tags: [SoftwareCraft, DDD, Architecture]
---
s
La Vertical Slice Architecture organise le code **par feature** plutôt que par couche technique. Chaque feature est un slice vertical qui traverse toutes les couches, de la requête HTTP jusqu'à la base de données.

C'est une réponse à un problème réel des architectures en couches : pour ajouter ou modifier une feature, on touche des fichiers dans tous les dossiers du projet (`controllers/`, `services/`, `repositories/`). Le couplage horizontal entre features augmente progressivement, et comprendre ce que fait une feature nécessite de naviguer dans toute la codebase.

---

## La différence d'organisation

```
Architecture en couches           Vertical Slice Architecture
────────────────────────         ──────────────────────────────
controllers/                     features/
  orderController.js               placeOrder/
  productController.js               handler.js        (endpoint)
  recommendationController.js        placeOrder.js     (use case)
services/                            Order.js          (domaine local)
  orderService.js                    orderRepository.js
  productService.js                  placeOrderSchema.js
repositories/                      applyPromoCode/
  orderRepository.js                 handler.js
  productRepository.js               applyPromoCode.js
                                     PromoCode.js
                                   getRecommendations/
                                     handler.js
                                     getRecommendations.js
                                     CompatibilityScorer.js
```

Chaque feature est **auto-contenue**. Pour comprendre ce que fait `placeOrder`, on regarde dans `features/placeOrder/`, c'est tout.

---

## Application concrète

### Structure

```
src/
  features/
    checkout/
      placeOrder/
        index.js                  // point d'entrée, branche la route
        PlaceOrderHandler.js      // controller HTTP
        PlaceOrderUseCase.js      // logique applicative
        placeOrderSchema.js       // validation Joi
      applyPromoCode/
        index.js
        ApplyPromoCodeHandler.js
        ApplyPromoCodeUseCase.js
        applyPromoCodeSchema.js

    catalog/
      getProductListing/
        index.js
        GetProductListingHandler.js
        GetProductListingQuery.js  // Read Model query (CQRS)
      getProductDetail/
        index.js
        GetProductDetailHandler.js
        GetProductDetailQuery.js

    recommendations/
      getRecommendations/
        index.js
        GetRecommendationsHandler.js
        GetRecommendationsUseCase.js
        CompatibilityScorer.js

  shared/                          // ce qui est vraiment partagé
    domain/
      Order.js
      Cart.js
      Money.js
      DomainError.js
    infrastructure/
      MongoOrderRepository.js
      database.js
```

### Une feature complète : PlaceOrder

```javascript
// features/checkout/placeOrder/PlaceOrderHandler.js
// Tout ce qui concerne cette feature est ici
class PlaceOrderHandler {
  constructor(placeOrderUseCase) {
    this.useCase = placeOrderUseCase
  }

  async handle(req, res) {
    try {
      const result = await this.useCase.execute({
        cartId: req.body.cartId,
        customerId: req.user.id,
        shippingAddress: req.body.shippingAddress,
      })
      res.status(201).json(result)
    } catch (error) {
      if (error instanceof DomainError) return res.status(422).json({ error: error.message })
      throw error
    }
  }
}

// features/checkout/placeOrder/PlaceOrderUseCase.js
class PlaceOrderUseCase {
  constructor({ cartRepository, orderRepository, orderFactory, eventBus }) {
    this.cartRepository = cartRepository
    this.orderRepository = orderRepository
    this.orderFactory = orderFactory
    this.eventBus = eventBus
  }

  async execute({ cartId, customerId, shippingAddress }) {
    const cart = await this.cartRepository.findById(cartId)
    if (!cart) throw new NotFoundError('Cart not found')

    const order = this.orderFactory.createFromCart(cart, customerId, shippingAddress)
    await this.orderRepository.save(order)
    await this.eventBus.publish({ type: 'OrderPlaced', orderId: order.id })

    return { orderId: order.id }
  }
}

// features/checkout/placeOrder/index.js
// Câblage local à la feature
module.exports = function mountPlaceOrder(router, container) {
  const useCase = new PlaceOrderUseCase({
    cartRepository: container.cartRepository,
    orderRepository: container.orderRepository,
    orderFactory: container.orderFactory,
    eventBus: container.eventBus,
  })
  const handler = new PlaceOrderHandler(useCase)

  router.post(
    '/orders',
    container.authMiddleware,
    validate(placeOrderSchema),
    (req, res) => handler.handle(req, res)
  )
}
```

---

## Ce que ça change pour le développement

Ajouter une feature = créer un nouveau dossier dans `features/`. On ne touche pas aux features existantes, pas de risque de régression.

Supprimer une feature = supprimer un dossier. Si la feature est bien isolée, rien d'autre ne casse.

Comprendre une feature = lire un seul dossier. Un développeur qui arrive sur `getRecommendations/` voit immédiatement tout ce que cette feature fait.

---

## Le vrai problème : la duplication

La Vertical Slice Architecture introduit un risque réel : si plusieurs features ont besoin de la même logique (charger un `Order`, calculer un total, valider une adresse), on est tenté de dupliquer.

La réponse c'est le dossier `shared/` pour ce qui est vraiment partagé. Mais il faut résister à la tentation de tout y mettre : un `shared/` qui grossit indéfiniment redevient une architecture en couches déguisée.

La règle : si deux features ont besoin de la même chose, la duplication est acceptable jusqu'à trois occurrences. À la troisième, on extrait dans `shared/`.

---

## Vertical Slice et DDD

La Vertical Slice Architecture et le DDD se complètent bien. Chaque slice correspond souvent à un cas d'usage du domaine (`PlaceOrder`, `ApplyPromoCode`, `GetRecommendations`). À l'intérieur d'un [[Bounded Context]], les slices sont organisées par feature. Entre les [[Bounded Context|Bounded Contexts]], la séparation se fait au niveau des dossiers de haut niveau.

```
src/
  ecommerce/              // Bounded Context E-commerce
    features/
      placeOrder/
      applyPromoCode/
      manageCart/
    shared/

  skinScience/            // Bounded Context Scientifique
    features/
      getRecommendations/
      scoreSkinProfile/
      reclassifyIngredient/
    shared/
```

Avec [[CQRS]], les slices se séparent naturellement entre Commands (write) et Queries (read) sans avoir besoin d'une architecture technique rigide pour les distinguer.

---

### Erreurs classiques

**Slice qui dépend d'une autre slice :** `placeOrder/` qui importe depuis `applyPromoCode/`. Si c'est nécessaire, la logique partagée va dans `shared/`, pas dans un croisement entre features.

**`shared/` fourre-tout :** si tout finit dans `shared/`, on a recréé une architecture en couches avec un nom différent. `shared/` doit rester petit et contenir uniquement ce qui est utilisé par au moins trois features.

**Feature trop grosse :** si un slice commence à avoir 15 fichiers, c'est probablement plusieurs features distinctes regroupées. Découper par intention métier, pas par entité technique.
