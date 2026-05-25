---
tags: [SoftwareCraft, DesignPatterns]
---

**Objectif :** Définir comment **assembler et composer** les objets et classes. Cf. [[Design Patterns]] pour la vue d'ensemble.

- [[Adapter]] — rendre compatible une interface externe avec l'interface attendue
- [[Facade]] — point d'entrée simplifié sur un sous-système complexe
- [[Decorator]] — ajouter des comportements dynamiquement, sans modifier la classe
- [[Proxy]] — contrôler l'accès à un objet (cache, sécurité, lazy loading)
- [[Composite]] — traiter objets individuels et compositions de manière uniforme

| Pattern | Signal d'usage |
|---|---|
| [[Adapter]] | Intégration d'une librairie ou API externe |
| [[Facade]] | Trop de classes à connaître pour une action simple |
| [[Decorator]] | Comportements transversaux, explosion de sous-classes |
| [[Proxy]] | Cache, contrôle d'accès, lazy loading |
| [[Composite]] | Structures hiérarchiques (menu, filesystem, DOM) |
