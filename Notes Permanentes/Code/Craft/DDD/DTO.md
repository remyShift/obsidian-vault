---
tags: [SoftwareCraft, Architecture]
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

### Sans DTO (exposition directe)

```typescript
class User {
  id: number
  email: string
  passwordHash: string       // ne doit JAMAIS sortir
  internalScore: number      // donnée interne
  stripeCustomerId: string   // donnée sensible
  createdAt: Date
  orders: Order[]            // relation ORM, peut être circulaire
}

app.get('/users/:id', (req, res) => {
  res.json(user) // problème : on expose tout
})
```

### Avec DTO

```typescript
interface UserResponseDTO {
  id: number
  email: string
  memberSince: string
}

function toUserResponseDTO(user: User): UserResponseDTO {
  return {
    id: user.id,
    email: user.email,
    memberSince: user.createdAt.toISOString(),
  }
}

app.get('/users/:id', (req, res) => {
  res.json(toUserResponseDTO(user)) // contrôle total sur ce qui sort
})
```

---

## Les deux directions

### DTO en entrée (Request DTO / Command)

Ce que le client envoie au serveur. Permet de valider et de contrôler ce qui entre dans le système.

```typescript
interface CreateOrderDTO {
  productId: string
  quantity: number
}
```

### DTO en sortie (Response DTO)

Ce que le serveur renvoie au client. Permet de contrôler ce qui est exposé.

```typescript
interface OrderResponseDTO {
  id: string
  status: string
  total: number
}
```

---

Un DTO est "bête" par design. Il ne sait pas valider des règles métier, il ne sait pas comment il est stocké. Un [[Value Object]] peut vivre à l'intérieur d'un DTO, mais l'inverse n'est pas vrai.

---

## Où on les trouve

- Entre le contrôleur et le service (Request DTO)
- Entre le service et la réponse HTTP (Response DTO)
- Dans [[CQRS]] : les Commands et Queries du Write side sont essentiellement des DTOs — les projections du Read side aussi
- Dans les event payloads : les événements transportent des DTOs

---

## Chez Oli's Lab

Oli's Lab a un cas concret et sensible : le domaine scientifique expose des données (`CompatibilityScore`, ingrédients analysés) que le frontend e-commerce n'a pas besoin de voir en détail. Et inversement, le checkout expose des données de paiement qui ne doivent pas traverser toutes les couches.

### Product : deux DTOs pour deux contextes

Le modèle `Product` en base contient à la fois les données e-commerce et les données scientifiques. Selon le contexte, on n'expose pas la même chose.

```typescript
// Ce que retourne MongoDB (modèle interne)
interface ProductDocument {
  _id: string
  name: string
  slug: string
  price: { amount: number; currency: string }
  stock: number
  scientificIngredients: ScientificIngredientRef[]
  compatibilityScores: Record<string, number>  // par profil skin type
  internalRatingNotes: string  // notes internes, ne sort jamais
  payloadCmsId: string         // référence CMS interne
}

// DTO pour le catalogue e-commerce (page listing, page produit)
interface ProductCatalogueDTO {
  id: string
  name: string
  slug: string
  price: { amount: number; currency: string }
  inStock: boolean
}

// DTO pour la page produit avec dimension scientifique
interface ProductDetailDTO {
  id: string
  name: string
  slug: string
  price: { amount: number; currency: string }
  inStock: boolean
  compatibilityScore: number | null  // null si pas de profil skin renseigné
  keyIngredients: { name: string; benefit: string }[]
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

### Checkout : DTO en entrée avec validation Joi

Le pattern établi chez Oli's Lab (validation en middleware Joi, controller qui orchestre) correspond exactement à l'usage d'un Request DTO.

```typescript
// Request DTO : ce que le client envoie
interface AddToCartDTO {
  productId: string
  quantity: number
}

// Validation Joi du DTO (middleware, pas dans le controller)
const addToCartSchema = Joi.object<AddToCartDTO>({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
})

// Le controller reçoit un DTO déjà validé
async function addToCartController(req: Request, res: Response) {
  const dto: AddToCartDTO = req.body
  const result = await cartService.addProduct(dto.productId, dto.quantity)
  res.json(toCartResponseDTO(result))
}
```

### Sync Payload CMS : DTO de transformation

Lors de la migration vers Payload CMS, les données viennent du CMS dans un format, et le domaine e-commerce attend un autre format. Le DTO fait la traduction sans polluer ni le CMS ni le domaine.

```typescript
// Ce que Payload CMS retourne
interface PayloadProductResponse {
  id: string
  title: string
  handle: string
  variants: { price: number; inventory: number }[]
  media: { url: string; alt: string }[]
}

// DTO de transformation vers le format domaine
function fromPayloadToProductDTO(payload: PayloadProductResponse): ProductCatalogueDTO {
  const firstVariant = payload.variants[0]
  return {
    id: payload.id,
    name: payload.title,
    slug: payload.handle,
    price: { amount: firstVariant.price, currency: 'EUR' },
    inStock: firstVariant.inventory > 0,
  }
}
```

---

## Ce que ça change en pratique

- **Sécurité** : contrôle explicite de ce qui entre et sort du système
- **Découplage** : le client ne dépend pas de la structure interne du domaine
- **Versioning** : on peut faire évoluer le domaine indépendamment de l'API publique
- **Documentation** : les DTOs servent de contrat d'API lisible
