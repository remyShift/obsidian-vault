---
tags: [SoftwareCraft, DesignPatterns]
---
**Objectif :** Définir comment les objets **communiquent et se répartissent les responsabilités**.

- [[Strategy]] : algorithmes interchangeables à l'exécution
- [[Observer]] : réaction en cascade quand un objet change d'état
- [[Command]] : action encapsulée comme objet, undo/redo, queue
- [[State]] : comportement qui change selon l'état interne, machine à états
- [[Template Method]] : squelette d'algorithme avec certaines étapes variables
- [[Chain of Responsibility]] : pipeline de gestionnaires, chaque maillon peut court-circuiter
- [[Iterator]] : parcourir une collection sans exposer sa structure (natif en JS)

| Pattern | Signal d'usage |
|---|---|
| [[Strategy]] | if/else sur un type de comportement qui va grandir |
| [[Observer]] | Couplage fort entre une source et ses conséquences |
| [[Command]] | Besoin d'undo, queue, transactionnel |
| [[State]] | if/else sur un statut dans plusieurs méthodes |
| [[Template Method]] | Même séquence d'étapes, détails différents |
| [[Chain of Responsibility]] | Middlewares, validation multi-étapes |
| [[Iterator]] | Structure custom à parcourir uniformément |
