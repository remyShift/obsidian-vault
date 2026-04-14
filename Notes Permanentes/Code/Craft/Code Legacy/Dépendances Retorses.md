---
tags: [SoftwareCraft, CodeLegacy, Tests]
---

Dans la plupart des cas le code dépends d’autres choses (// des dépendances), qu’elles soient facilement identifiables ou non.
- Code de prod impossible à tester en l’état à cause des dépendances.

Ces dépendances constituent donc un des majeurs problèmes auquel on est confronté sur du legacy code car elles vont engendrées des tests trop compliqués à écrire.

Ces dépendances vont être un obstacle au maintiens des caractéristiques FIRST des tests.
- Comme le côté repérable : un test doit fournir le même résultat peut importe le contexte.

Dans un premier temps on va vouloir [[Identifier les dépendances]] pour les [[Isoler les dépendances |isoler]] et pour enfin faire des [[Substitutions des dépendances dans les tests]].
- Tout cela nous permettra de faire de l’[[Injection de dépendances]].