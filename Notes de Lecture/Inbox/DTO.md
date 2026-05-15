---
created: 2025-05-15 00:00
type: fleeting
status: to-process
tags: [inbox, architecture, dto, patterns, craft, lyon-craft-2025]
---

# DTO - Data Transfer Object

## Définition

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
// L'entité User en base de données
class User {
  id: number;
  email: string;
  passwordHash: string;       // ne doit JAMAIS sortir
  internalScore: number;      // donnée interne
  stripeCustomerId: string;   // donnée sensible
  createdAt: Date;
  orders: Order[];            // relation ORM, peut être circulaire
}

// On renvoie l'entité directement...
app.get('/users/:id', (req, res) => {
  res.json(user); // problème : on expose tout
});
```

### Avec DTO

```typescript
// Ce que l'API expose au client
class UserResponseDTO {
  id: number;
  email: string;
  memberSince: string; // formaté pour l'affichage
}

// Transformation explicite
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
  // Pas d'id, pas de createdAt : le serveur génère ça
}
```

### DTO en sortie (Response DTO)
Ce que le serveur renvoie au client. Permet de contrôler ce qui est exposé.

```typescript
class OrderResponseDTO {
  id: string;
  status: string;
  total: number;
  // Pas de données internes, pas de relations complètes
}
```

---

## DTO vs autres concepts

| Concept | Rôle | Logique métier |
|---|---|---|
| **Entity** | Représente un objet du domaine avec identité | Oui |
| **Value Object** | Représente une valeur immuable du domaine | Oui (invariants) |
| **DTO** | Transporte des données entre couches ou systèmes | Non |

Un DTO est "bête" par design. Il ne sait pas valider des règles métier, il ne sait pas comment il est stocké.

---

## Où on les trouve

- Entre le contrôleur et le service (Request DTO)
- Entre le service et la réponse HTTP (Response DTO)
- Dans CQRS : les Commands et Queries sont essentiellement des DTOs
- Dans les event payloads : les événements transportent des DTOs

---

## Ce que ça change en pratique

- **Sécurité** : contrôle explicite de ce qui entre et sort du système
- **Découplage** : le client ne dépend pas de la structure interne du domaine
- **Versioning** : on peut faire évoluer le domaine indépendamment de l'API publique
- **Documentation** : les DTOs servent de contrat d'API lisible

---

## Lien avec d'autres concepts

- **Value Object** : un DTO peut contenir des Value Objects, mais un VO n'est pas un DTO
- **CQRS** : les Commands et Queries du côté Write sont des DTOs ; les projections du côté Read aussi
- **Mapped Types TypeScript** : on peut dériver des DTO types depuis les types de domaine sans réécriture manuelle

---

## À faire

- [ ] Trier : garder / promouvoir en Note Permanente / supprimer
- [ ] Relier à "Value Object", "CQRS/ES", "Mapped Types TypeScript"
- [ ] Vérifier si l'API Payload sur la mission fait bien la distinction entre les types de domaine et ce qui est renvoyé au client
