---
tags:
---
## Le concept

**Dépendance** et **couplage** sont deux notions distinctes que l'on confond souvent. Un système peut avoir besoin du résultat d'un autre système sans être couplé à son implémentation.

- **Dépendance** : A a besoin de quelque chose que B produit
- **Couplage** : A connaît les détails internes de B pour fonctionner

On peut éliminer le couplage tout en conservant la dépendance fonctionnelle.

---

## Illustration

### Système couplé (dépendance + couplage)

```typescript
// Le service Order appelle directement le service Inventory
class OrderService {
  constructor(private inventory: InventoryService) {}

  placeOrder(productId: string, qty: number) {
    // Couplage fort : connait la méthode, le type de retour, le contrat interne
    const available = this.inventory.checkStockByProductId(productId);
    if (available >= qty) { ... }
  }
}
```

Si `InventoryService` change son interface, `OrderService` casse.

### Système dépendant sans couplage fort (via interface)

```typescript
interface StockChecker {
  isAvailable(productId: string, qty: number): boolean;
}

class OrderService {
  constructor(private stockChecker: StockChecker) {}
  // OrderService dépend du résultat, pas de l'implémentation
}
```

### Système dépendant sans couplage (via événements)

```typescript
// Order émet un événement, ne sait pas qui le traite
eventBus.emit('order.placed', { productId, qty });

// Inventory réagit de son côté
eventBus.on('order.placed', ({ productId, qty }) => {
  inventory.decrementStock(productId, qty);
});
```

Order a besoin que l'inventaire soit mis à jour. Mais il ne sait pas comment, ni même qui s'en charge.

---

## Les trois niveaux

| Niveau | Exemple | Dépendance | Couplage |
|---|---|---|---|
| Couplage fort | Appel direct de méthode | Oui | Fort |
| Couplage faible | Injection via interface | Oui | Faible |
| Découplé | Communication par événements | Oui (fonctionnel) | Quasi-nul |

---

## Pourquoi c'est important

Le couplage fort est la principale cause de :
- Difficulté à tester (impossible de mocker facilement)
- Résistance au changement (modifier un composant casse les autres)
- Bugs en cascade (une erreur se propage à travers les dépendances directes)

Réduire le couplage permet de changer l'implémentation d'un composant sans toucher à ses consommateurs, à condition de respecter le contrat (interface ou format d'événement).

---

## Ce que ça change en architecture

L'objectif n'est pas de supprimer toutes les dépendances (impossible, un système utile a des dépendances), mais de **gérer la forme du couplage**. On choisit consciemment comment un composant connaît un autre : par son interface, par un contrat d'événement, ou directement par son implémentation.

En pratique : favoriser les interfaces, les abstractions, et les événements sur les appels directs entre services ou modules.

---

## Lien avec d'autres concepts

- **CQRS/ES** : un exemple concret de découplage via événements entre le Write side et le Read side
- **DTO** : un contrat d'échange qui permet de découpler la représentation interne d'un objet de sa représentation externe
