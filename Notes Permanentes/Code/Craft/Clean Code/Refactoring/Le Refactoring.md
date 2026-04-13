> [!info]- Tags
> #SoftwareCraft #CleanCode #Refacto

**Rappel :** Tendre vers du Clean Code se fait via des itérations et n’est jamais / rarement atteint du premier coup.
- Tout comme le Clean Code et ses techniques, le refactoring n’y échappe c’est aussi un travail d’itérations.
	- Du code écrit n’est pas définitif —> il est malléable.
---

**Refactoring =** retravailler / re écrire du code avec comme but d’en améliorer la lisibilité (// compréhension) et maintienbilité sans en altérer le comportement.
- Refacto ≠ ajouter de nouvelles fonctionnalités / ≠ corriger des bugs existants

La non régression par le refactoring est souvent aidé et vérifier grâce au TDD qui assure une couverture suffisante pour voir la moindre régression.

De plus refacto est un bon moyen pour nous de laisser un code de meilleur qualité à nos collègues et donc moins compliqué à lire pour eux et aussi pour nous.

« Always leave the code you’re editing a little better than you found it », *Uncle Bob*
- Ainsi on ne laissera jamais du code dans un état pire que celui qu’on l’a trouvé.
De plus, en suivant ce principe le refactoring permets d’éviter (/ réduire) la dette technique.
- et - de dette = capacité de l’équipe à délivrer + souvent 

Un des principes primordiaux du Clean Code est d’exprimer l’intention, le refactoring étant au service du Clean Code va dans ce sens aussi à aider à mieux exprimer l’intention.
- Si lorsqu’on arrive sur du code on essaye de deviner ce que le développeur précédent a essayer de faire c’est qu’il y a un déficit d’expression de l’intention et donc une nécessité de refactoring.

Si le refactoring a pour but d’améliorer le code sans changer sa fonctionnalité c’est qu’il est nécessaire. 
Si on des *smells* le refactoring est nécessaire (méthodes trop longues, code trop complexe, trop de paramètres …)

Aussi refacto du code qui modifie des données externes sera plus complexes et risque surtout de modifier le comportement attendu, c’est pourquoi on privilégie de refacto sur du code au fonction pure (des paramètres définis en entrée et un résultat définis en sortie).
### Les principes méthodologiques du refactoring :

- Savoir quand le refacto est nécessaire et ça passe par la connaissances des principes du [[Clean Code]] (SOLID, loi de Demeter, YAGNI, KISS),
	- Reconnaître aussi lorsque qu’un principe n’est pas respecté 
- Connaître les [[Patterns de Refactoring]] les plus courants et aussi reconnaître quand un refacto n’est pas nécessaire ou sera contre productif,
- Maîtriser nos outils et surtout nos IDE, leurs astuces et possibilités pouvant nous faire gagner en fluidité,
- Transformer le code par petites étapes,
	- Moins de charges mental + plus facile de réparer ce qu’on vient de faire si on fonctionne par petites étapes,

---

**NB :** refacto doit être fait sur du code sécurisé == du code testé et suffisamment couvert pour faire du refacto sans rien cassé

De plus on aussi vouloir [[Refactor les Tests]].