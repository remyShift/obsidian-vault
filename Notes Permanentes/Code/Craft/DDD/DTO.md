---
tags:
  - SoftwareCraft
  - DDD
---

Un DTO (Data Transfer Object) est un objet dont le seul rôle est de **transporter des données d'un contexte à un autre**, sans logique métier.

Il définit un contrat explicite entre deux couches ou deux systèmes, indépendamment de leurs représentations internes respectives.

---

## Le problème qu'il résout

Sans DTO, on est tenté d'exposer directement les objets de domaine (entités, modèles de base de données). Ça pose plusieurs problèmes :

1. **Exposition involontaire** : on envoie au client des champs confidentiels (mots de passe hashés, données internes, relations sensibles)
2. **Couplage** : le client dépend de la structure interne du domaine. Si le modèle change, l'API change aussi
3. **Sérialisation** : les entités ORM ont souvent des relations circulaires et d'autres artefacts qui ne sérialisent pas bien en JSON

---

## Exemple concret

Le modèle `Product` en base contient à la fois les données e-commerce, les données scientifiques, les métadonnées CMS et des champs internes. Selon le contexte, on n'expose pas la même chose.

```typescript
// Ce que retourne MongoDB (modèle interne)
interface ProductDocument {
  _id: string
  name: string
  slug: string
  price: { amount: number; currency: string }
  stock: number
  scientificIngredients: ScientificIngredientRef[]
  internalRatingNotes: string  // ne doit jamais sortir
  payloadCmsId: string         // référence interne, inutile pour le client
}

// DTO pour le catalogue : seulement ce dont le listing a besoin
interface ProductCatalogueDTO {
  id: string
  name: string
  slug: string
  price: { amount: number; currency: string }
  inStock: boolean
}

function toProductCatalogueDTO(doc: ProductDocument): ProductCatalogueDTO {
  return {
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    price: doc.price,
    inStock: doc.stock > 0,
  }
}
```

Le DTO contrôle ce qui sort. `internalRatingNotes` et `payloadCmsId` n'existent pas pour le client.

---

## Les deux directions

### DTO en entrée (Request DTO)

Ce que le client envoie au serveur. Permet de valider et de contrôler ce qui entre dans le système. Dans le pattern établi chez Oli's Lab, c'est le DTO qui est validé par le middleware Joi avant d'atteindre le controller.

```typescript
interface AddToCartDTO {
  productId: string
  quantity: number
}

const addToCartSchema = Joi.object<AddToCartDTO>({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
})
```

### DTO en sortie (Response DTO)

Ce que le serveur renvoie au client. Permet de contrôler ce qui est exposé et de découpler la structure interne du domaine du contrat API.

```typescript
interface OrderSummaryDTO {
  id: string
  status: string
  total: { amount: number; currency: string }
  itemCount: number
  createdAt: string  // formaté pour l'affichage, pas un objet Date
}
```

---

Un DTO est "bête" par design. Il ne valide pas de règles métier, il ne sait pas comment il est stocké. Un [[Value Object]] peut vivre à l'intérieur d'un DTO, mais l'inverse n'est pas vrai.

---

## Où on les trouve

- Entre le contrôleur et le service (Request DTO)
- Entre le service et la réponse HTTP (Response DTO)
- Dans [[CQRS]] : les Commands et Queries du Write side sont essentiellement des DTOs, les projections du Read side aussi
- Dans les event payloads : les événements transportent des DTOs
- Dans les scripts de synchronisation : quand Payload CMS publie un produit, la transformation vers le format domaine passe par un DTO de mapping

---

## Ce que ça change en pratique

- **Sécurité** : contrôle explicite de ce qui entre et sort du système
- **Découplage** : le client ne dépend pas de la structure interne du domaine
- **Versioning** : on peut faire évoluer le domaine indépendamment de l'API publique
- **Documentation** : les DTOs servent de contrat d'API lisible
