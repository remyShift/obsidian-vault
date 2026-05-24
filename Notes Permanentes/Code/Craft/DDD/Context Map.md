---
tags: [SoftwareCraft, DDD]
---
Une Context Map est la représentation des **relations entre [[Bounded Context|Bounded Contexts]]**. Elle documente qui dépend de qui, comment ils communiquent, et quel rapport de force s'exerce entre eux.

C'est le livrable central du DDD stratégique. Sans elle, les Bounded Contexts restent des concepts isolés. La valeur c'est de voir les flèches entre eux.

---

## Les patterns de relation

### Shared Kernel
Deux contextes partagent un bout de modèle commun (classes, événements, schémas). Les deux équipes sont responsables de ce noyau partagé et doivent se coordonner à chaque changement.

A éviter autant que possible. Quand c'est inévitable, le Shared Kernel doit être petit, explicite et versionné.

```
[Contexte E-commerce] -- Shared Kernel --> [Contexte Scientifique]
         (CustomerId, ProductId)
```

### Customer / Supplier
Un contexte est **fournisseur** (Upstream), l'autre est **client** (Downstream). Le fournisseur définit le contrat, le client s'y adapte. Mais le client a un droit de regard : il peut exprimer ses besoins et le fournisseur s'engage à les respecter.

C'est la relation entre un service interne stable et ses consommateurs.

### Conformist
Comme Customer/Supplier, mais le downstream n'a aucun pouvoir de négociation. Il s'adapte au modèle upstream sans discuter. Typique des intégrations avec des API tierces (Stripe, Klaviyo, BigBlue) : tu prends leur modèle tel quel.

### Anti-Corruption Layer (ACL)
Le downstream ne veut pas que les concepts du upstream contaminent son propre modèle. Il crée une couche de traduction qui absorbe les différences.

```typescript
// Le contexte e-commerce ne connaît pas les concepts scientifiques
// Il passe par un ACL qui traduit
class RecommendationACL {
  async getRecommendedProducts(customerId: CustomerId): Promise<ProductId[]> {
    // Appel au contexte scientifique
    const skinProfile = await scienceApi.getSkinProfile(customerId.value)
    const scores = await scienceApi.scoreAllProducts(skinProfile)
    // Traduction : le contexte e-commerce reçoit seulement des ProductIds
    return scores
      .filter(s => s.score >= RECOMMENDATION_THRESHOLD)
      .map(s => new ProductId(s.productId))
  }
}
```

### Open Host Service / Published Language
Un contexte expose une interface stable et documentée que plusieurs autres consomment. Il publie un "langage" : des DTOs versionnés, des événements stables, une API contractualisée.

Typique d'un service central consommé par beaucoup d'autres : un service produit, un service d'authentification.

### Separate Ways
Deux contextes qui n'ont aucune relation. Chacun fait sa propre chose. A reconnaître explicitement : ça évite d'essayer de les intégrer là où ce n'est pas nécessaire.

---

## Context Map chez Oli's Lab

```
                    ┌─────────────────┐
                    │   Payload CMS   │  (Open Host Service)
                    │  [Upstream]     │
                    └────────┬────────┘
                             │ Published Language (webhook events)
                    ┌────────▼────────┐
                    │  E-commerce     │◄──── ACL ────[Scientifique]
                    │  [Core Domain]  │
                    └────────┬────────┘
                             │ Conformist
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
           [Stripe]      [BigBlue]      [Klaviyo]
        (paiement)     (logistique)    (emailing)
```

- **Payload CMS** est upstream : il publie les produits, le contexte e-commerce les consomme via webhook.
- **Contexte Scientifique** communique avec E-commerce via un ACL : le contexte e-commerce demande des `ProductId[]`, il ne sait rien de `SkinProfile` ou `CompatibilityScore`.
- **Stripe, BigBlue, Klaviyo** sont des intégrations tierces : relation Conformist, on s'adapte à leur API.

---

## Pourquoi la documenter

Sans Context Map explicite, les dépendances entre contextes se créent de façon anarchique. Un développeur couple directement le checkout au moteur de scoring. Un autre appelle l'API Stripe depuis le domaine. Les frontières disparaissent sans que personne ne l'ait décidé.

La Context Map rend les couplages visibles et intentionnels. Une dépendance non documentée sur la Context Map est un signal d'alerte.

---

### Erreurs classiques

**Ne pas la maintenir :** une Context Map qui ne reflète plus la réalité est pire qu'une absence de Context Map, elle induit en erreur.

**Confondre Conformist et ACL :** dans les deux cas le downstream s'adapte à l'upstream, mais l'ACL protège activement le modèle du downstream, le Conformist l'absorbe tel quel. Sur une intégration Stripe, le Conformist est acceptable parce que Stripe est stable. Sur une intégration avec un système interne instable, l'ACL protège.

**Créer un Shared Kernel par commodité :** partager des types "pour éviter la duplication" entre deux contextes crée un couplage fort et durable. La duplication locale est souvent moins coûteuse.
