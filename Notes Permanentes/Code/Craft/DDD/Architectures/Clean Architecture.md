---
tags: [SoftwareCraft, DDD, Architecture]
---
La Clean Architecture (Robert C. Martin, 2012) est une formalisation de l'[[Hexagonal Architecture]] avec des couches concentriques explicites et une règle de dépendance stricte : **les cercles intérieurs ne connaissent jamais les cercles extérieurs**.

La différence principale avec l'hexagonale c'est la nomenclature et la formalisation des couches. Le principe fondamental est identique : l'infrastructure est un détail, le domaine est au centre.

---

## Les couches concentriques

```
┌─────────────────────────────────────────────────────┐
│                Frameworks & Drivers                  │  Express, MongoDB, Stripe, Klaviyo
│  ┌───────────────────────────────────────────────┐  │
│  │            Interface Adapters                  │  │  Controllers, Presenters, Gateways
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │             Use Cases                    │  │  │  Application Services, Interactors
│  │  │  ┌───────────────────────────────────┐  │  │  │
│  │  │  │           Entities                │  │  │  │  Domain : Aggregates, Value Objects
│  │  │  │      (Domain Layer)               │  │  │  │
│  │  │  └───────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Entities** : la logique métier centrale. Les `Order`, `Cart`, `SkinProfile`, les règles qui ne dépendent d'aucun framework. En DDD ce sont les [[Aggregate|Aggregates]], [[Entity|Entities]], [[Value Object|Value Objects]].

**Use Cases** : les cas d'usage de l'application. Ce que le système peut faire. Correspond aux [[Application Service|Application Services]]. Connaît les Entities, ne connaît pas les adapters.

**Interface Adapters** : traduit entre le format du Use Case et le format du monde extérieur. Controllers, Presenters, Repository implementations. Connaît les Use Cases, ne connaît pas Express ou MongoDB directement.

**Frameworks & Drivers** : tout ce qui est externe. Express, MongoDB, Stripe. Ce sont les détails.

---

## La règle de dépendance

C'est la règle centrale et non-négociable : **les dépendances de code ne peuvent pointer que vers l'intérieur**.

- Les Entities ne dépendent de rien.
- Les Use Cases dépendent uniquement des Entities.
- Les Interface Adapters dépendent uniquement des Use Cases et des Entities.
- Les Frameworks & Drivers dépendent de tout le reste.

Ce qui implique que, comme dans l'[[Hexagonal Architecture]], le Use Case définit une interface (port), et l'Interface Adapter l'implémente.

---

## Application concrète chez Oli's Lab

### Correspondance des couches

| Clean Architecture | Oli's Lab |
|---|---|
| Entities | `Order`, `Cart`, `SkinProfile`, `CompatibilityScore`, `Money` |
| Use Cases | `PlaceOrderUseCase`, `ApplyPromoCodeUseCase`, `GetRecommendationsUseCase` |
| Interface Adapters | `OrderController`, `MongoOrderRepository`, `StripeGateway`, `PayloadCmsAdapter` |
| Frameworks & Drivers | Express, Mongoose, Stripe SDK, BullMQ |

### Le flux d'une recommandation produit

```javascript
// ENTITIES (cercle intérieur)
// domain/skinScience/SkinProfile.js
class SkinProfile {
  constructor(customerId, concerns, sensitivities) {
    this.customerId = customerId
    this.concerns = concerns       // ['acne', 'sensitivity', 'dryness']
    this.sensitivities = sensitivities
  }

  hasSensitivityTo(ingredient) {
    return this.sensitivities.includes(ingredient)
  }
}

// domain/skinScience/CompatibilityScorer.js (Domain Service)
class CompatibilityScorer {
  score(product, skinProfile) {
    const ingredientScores = product.ingredients.map(ingredient => {
      if (skinProfile.hasSensitivityTo(ingredient.active)) return -2
      if (skinProfile.concerns.some(c => ingredient.treats(c))) return +2
      return 0
    })
    return CompatibilityScore.create(
      Math.max(0, Math.min(100, 50 + ingredientScores.reduce((a, b) => a + b, 0) * 5))
    )
  }
}

// USE CASES (deuxième cercle)
// application/recommendations/GetRecommendationsUseCase.js
class GetRecommendationsUseCase {
  // Dépend d'interfaces (ports), pas d'implémentations
  constructor({ skinProfileRepository, productRepository, compatibilityScorer }) {
    this.skinProfileRepository = skinProfileRepository
    this.productRepository = productRepository
    this.compatibilityScorer = compatibilityScorer
  }

  async execute({ customerId }) {
    const skinProfile = await this.skinProfileRepository.findByCustomerId(customerId)
    if (!skinProfile) throw new NotFoundError('Skin profile not found')

    const products = await this.productRepository.findAll()

    const scored = products.map(product => ({
      productId: product.id,
      score: this.compatibilityScorer.score(product, skinProfile),
    }))

    return scored
      .filter(p => p.score.value >= 60)
      .sort((a, b) => b.score.value - a.score.value)
      .slice(0, 10)
      .map(p => ({ productId: p.productId, score: p.score.value }))
  }
}

// INTERFACE ADAPTERS (troisième cercle)
// adapters/http/recommendationController.js
class RecommendationController {
  constructor(getRecommendationsUseCase) {
    this.useCase = getRecommendationsUseCase
  }

  async getRecommendations(req, res) {
    try {
      const results = await this.useCase.execute({ customerId: req.user.id })
      res.json({ recommendations: results })
    } catch (error) {
      if (error instanceof NotFoundError) return res.status(404).json({ error: error.message })
      throw error
    }
  }
}

// adapters/persistence/MongoSkinProfileRepository.js
class MongoSkinProfileRepository {
  async findByCustomerId(customerId) {
    const doc = await this.collection.findOne({ customerId })
    if (!doc) return null
    // Traduction document MongoDB -> objet domaine
    return new SkinProfile(doc.customerId, doc.concerns, doc.sensitivities)
  }
}

// FRAMEWORKS & DRIVERS (cercle extérieur)
// infrastructure/app.js
const app = express()
app.get('/recommendations', authMiddleware, (req, res) =>
  recommendationController.getRecommendations(req, res)
)
```

---

## Clean Architecture vs Hexagonale

Les deux sont équivalentes dans leur principe. Les différences sont surtout de terminologie et d'emphase.

| | Hexagonale | Clean Architecture |
|---|---|---|
| Nomenclature | Ports & Adapters | Use Cases, Interface Adapters |
| Côtés | Driving / Driven | implicite |
| Formalisation | Moins prescriptive | Couches concentriques explicites |
| Origine | Cockburn (2005) | Uncle Bob (2012) |

En pratique dans une codebase Node.js, les deux se traduisent par la même organisation de fichiers et les mêmes règles de dépendance. Choisir l'un ou l'autre est souvent une question de vocabulaire partagé dans l'équipe.

---

### Erreurs classiques

**Use Case qui importe Express ou Mongoose :** violation directe de la règle de dépendance. Le Use Case ne connaît pas le framework.

**Controller qui contient de la logique métier :** le Controller appartient aux Interface Adapters. Sa seule responsabilité c'est de traduire HTTP en appel de Use Case et le résultat en réponse HTTP.

**Entities qui connaissent les Use Cases :** les Entities sont le cercle le plus intérieur. Elles ne peuvent dépendre de rien d'autre que d'elles-mêmes.
