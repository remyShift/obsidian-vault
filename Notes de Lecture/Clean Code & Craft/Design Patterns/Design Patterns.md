> [!info]- Tags
> #SoftwareCraft #DesignPatterns #LectureNote

# Design Patterns — Vue d'ensemble

**Source :** GoF — *Design Patterns: Elements of Reusable Object-Oriented Software*, Refactoring Guru

---

## Qu'est-ce qu'un design pattern ?

Un design pattern est une **solution éprouvée à un problème récurrent** de conception logicielle. Ce n'est pas du code à copier-coller — c'est un **schéma de pensée** applicable selon le contexte.

> « Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem. » — GoF

---

## Les 3 familles

| Famille | Objectif | Notes |
|---|---|---|
| **[[Design Patterns Creational\|Creational]]** | Comment créer les objets | Factory, Builder, Singleton... |
| **[[Design Patterns Structural\|Structural]]** | Comment assembler les objets | Adapter, Facade, Decorator... |
| **[[Design Patterns Behavioral\|Behavioral]]** | Comment les objets communiquent | Strategy, Observer, Command... |

---

## Pourquoi les connaître ?

1. **Vocabulaire commun** — dire "c'est un Strategy" est plus clair que décrire 20 lignes d'implémentation
2. **Refactoring guidé** — un code smell mène souvent à un pattern précis comme solution
3. **Lire du code existant** — la plupart des frameworks les utilisent massivement (Express : middleware = Chain of Responsibility, React : Context = Observer)
4. **Éviter la sur-ingénierie** — connaître un pattern, c'est aussi savoir quand ne **pas** l'utiliser

---

## Mise en garde

> Les design patterns ne sont pas une fin en soi. Appliquer un pattern sans que le problème qu'il résout soit présent = sur-ingénierie.

Le bon processus :
1. Code simple d'abord (YAGNI, KISS)
2. Code smell détecté
3. Refactoring → le pattern **émerge** naturellement

Ne jamais partir du pattern pour aller vers le code.
