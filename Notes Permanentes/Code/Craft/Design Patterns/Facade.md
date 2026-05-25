---
tags: [SoftwareCraft, DesignPatterns, Structural]
---

Fournir une **interface simplifiée** à un sous-système complexe. L'appelant n'a besoin de connaître qu'un seul point d'entrée, pas les dizaines de classes internes.

```js
// Sans Facade — l'appelant doit orchestrer lui-même 4 classes
const metadata = new MetadataExtractor().extract(videoFile);
const encoded = new VideoEncoder().encode(videoFile, { codec: 'h264' });
const thumbnail = new ThumbnailGenerator().generate(videoFile.firstFrame);
const stored = new StorageUploader().upload({ encoded, thumbnail, metadata });

// ✅ Avec Facade — un seul point d'entrée
class VideoProcessingFacade {
  process(videoFile) {
    const metadata = new MetadataExtractor().extract(videoFile);
    const encoded = new VideoEncoder().encode(videoFile, { codec: 'h264' });
    const thumbnail = new ThumbnailGenerator().generate(videoFile.firstFrame);
    return new StorageUploader().upload({ encoded, thumbnail, metadata });
  }
}

// L'appelant
const result = new VideoProcessingFacade().process(videoFile);
```

La Facade ne cache pas le sous-système — il reste accessible si besoin. Elle offre un raccourci pour le cas d'usage courant.

### Sur Oli's Lab

Un `CheckoutFacade` qui orchestre `CartService`, `PaymentService`, `OrderService`, `InventoryService`, `EmailService`. L'appelant (le controller HTTP) n'a pas à connaître cette chorégraphie.

### Différence avec Adapter

[[Adapter]] = **rendre compatible** deux interfaces incompatibles. Facade = **simplifier** un sous-système existant. Adapter change une interface, Facade en crée une nouvelle au-dessus.

### Signal d'usage

- Trop de classes à coordonner pour réaliser une action simple
- Un controller ou un use case qui instancie et orchestre 5+ services directement
- Quand on veut créer une API haut niveau sur une librairie complexe (ex: une Facade sur FFmpeg)

### Attention

La Facade peut devenir un **God Object** si elle grossit sans contrôle. Elle doit rester une fine couche d'orchestration, pas un fourre-tout.

---

- [[Design Patterns Structural]] — vue d'ensemble des patterns structural
- [[Adapter]] — rendre compatible, pas simplifier
