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
  id: number;
  email: string;
  passwordHash: string;       // ne doit JAMAIS sortir
  internalScore: number;      // donnée interne
  stripeCustomerId: string;   // donnée sensible
  createdAt: Date;
  orders: Order[];            // relation ORM, peut être circulaire
}

app.get('/users/:id', (req, res) => {
  res.json(user); // problème : on expose tout
});
```

### Avec DTO

```typescript
class UserResponseDTO {
  id: number;
  email: string;
  memberSince: string; // formaté pour l'affichage
}

function toUserResponseDTO(user: User): UserResponseDTO {
  return {
    id: user.id,
    email: user.email,
    memberSince: user.createdAt.toISOString(),
  };
}

app.get('/users/:id', (req, res) => {
  res.json(toUserResponseDTO(user)); // contrôle total sur ce qui sort
});
```

---

## Les deux directions

### DTO en entrée (Request DTO / Command)

Ce que le client envoie au serveur. Permet de valider et de contrôler ce qui entre dans le système.

```typescript
class CreateOrderDTO {
  productId: string;
  quantity: number;
}
```

### DTO en sortie (Response DTO)

Ce que le serveur renvoie au client. Permet de contrôler ce qui est exposé.

```typescript
class OrderResponseDTO {
  id: string;
  status: string;
  total: number;
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

## Ce que ça change en pratique

- **Sécurité** : contrôle explicite de ce qui entre et sort du système
- **Découplage** : le client ne dépend pas de la structure interne du domaine
- **Versioning** : on peut faire évoluer le domaine indépendamment de l'API publique
- **Documentation** : les DTOs servent de contrat d'API lisible
