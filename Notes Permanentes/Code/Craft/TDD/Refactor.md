---
tags: [SoftwareCraft, Tests, TDD]
---

#### Refactor :

Ici on va chercher à améliorer notre code —> le rendre plus lisible, plus maintenable et pour aider l’ajout de futur fonctionnalités
- Renommer des variables / classes / fonctions … 
- Extraire des fonctions,

Attention néanmoins à ne pas faire de l’ajout de nouvel fonction qui ne sont pas encore gérer par nos tests et ne pas changement le comportement de certaines fonctionnalités. Nos tests doivent rester vert après chaque étape de refactor.

Par exemple une practice courante lorsqu’on refactor est d’extraire dans des constantes les valeurs répétitives : *les magics numbers*.
Exemple lors du kata fizzbuzz : on peut extraire les strings `"fizz"` et `"buzz"` en constantes et aussi les divisor / multiples de `3` et `5`. Cela est aussi valable pour les conditions qu’on pourrait extraire en une méthode `isMultipleOf` plutôt que vérifier les modulos à chaque conditions: (*cf fizzbuzz dans mes katas*).

**NB :** Refactor concerne autant le code de prod que celui de test 