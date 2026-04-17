---
tags: [SoftwareCraft, DesignPatterns]
---

Un design pattern est une **solution éprouvée à un problème récurrent** de conception logicielle. Ce n'est pas du code à copier-coller — c'est un **schéma de pensée** applicable selon le contexte.

---

## Les 3 familles

| Famille | Objectif |
|---|---|
| [[Design Patterns Creational\|Creational]] | Comment créer les objets |
| [[Design Patterns Structural\|Structural]] | Comment assembler les objets |
| [[Design Patterns Behavioral\|Behavioral]] | Comment les objets communiquent |

---

## Pourquoi les connaître ?

**Vocabulaire commun** — dire "c'est un Strategy" est plus clair que décrire 20 lignes d'implémentation.

**Refactoring guidé** — un [[Code Smells|code smell]] mène souvent à un pattern précis comme solution.

**Lire du code existant** — la plupart des frameworks les utilisent massivement : Express middleware = Chain of Responsibility, React Context = Observer.

**Éviter la sur-ingénierie** — connaître un pattern, c'est aussi savoir quand ne **pas** l'utiliser.

---

## La mise en garde centrale

> Les design patterns ne sont pas une fin en soi. Appliquer un pattern sans que le problème qu'il résout soit présent = sur-ingénierie.

Le bon processus : code simple d'abord (YAGNI, KISS) → smell détecté → refactoring → le pattern **émerge** naturellement. Cf. [[Le Refactoring]].

Ne jamais partir du pattern pour aller vers le code.

---

## Liens

- [[Code Smells]] — chaque smell a souvent un pattern comme fix naturel
- [[Les Principes SOLID]] — les patterns sont des implémentations concrètes de SOLID
- [[Domain-Driven Design]] — DDD utilise plusieurs patterns tactiques (Repository, Value Object...)
