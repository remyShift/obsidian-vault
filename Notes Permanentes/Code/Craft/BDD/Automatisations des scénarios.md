> [!info]- Tags
> #SoftwareCraft #BDD 

Les scénarios concrets en langages métier issu des atelier de spécifications sont déjà une base solide sur laquelle s’appuyer pour automatiser les tests de non régression.
- Ils ont déjà tout les détails métiers concrets et pertinents.

## La Syntaxe Gherkin :

Les scénarios clé et les scénarios fait par l’équipe de testeurs peuvent être directement écrit dans la syntaxe Gherkin dans des fichiers texte appelés features files —> chaque file = un thème précis.

Par exemple les comportements concernant les remises clients sur les livres en Europe :
- La première rubrique `Feature` va reprendre la user stories de départ et nous définir l’intention :
```txt
Feature : offrir des remises aux clients fidèles
Afin d’encourager les clients à revenir acheter,
En tant que vendeur de livres,
Je souhaite offrir des remises de prix aux clients fidèles
```
- Cette rubrique sert uniquement de documentation pour les lecteurs humains. De plus on peut y ajouter les règles métiers en lien et ce qu’il faut savoir en lien avec la user story.


- Les rubriques qui suivent ne seront qu’une succession de paragraphes d’exemples écrit de manière très formaté et normé pour être interprété par des outils comme suit :
```txt
Example: Aucune remise en deça de 50 € d’achat
	Given un panier avec 2 articles pour un total de 49 €
	When le client consulte son panier,
	Then le total inclut une remise de 5 % soit "-2,50 €"
```

La syntaxe commence donc par `Example` et est suivis des *steps* —> chaque *step* commence par un mot clé à savoir : `Given, When, Then, And, But`.
- La step `Given` permets de poser les pré requis pour la suite,
- La step `When` définis les actions,
- La step `Then` va définir les actions qui en découlent des 2 précédentes steps.

Malgré le fait qu’on lise ça quasiment comme du langage naturel cette écriture reste très formelle et ce sont les devs / testeurs qui sont le plus à même de les écrire correctement à partir des scénarios clés (définis collectivement par les 3 amigos) et des scénarios de couverture (définis ensuite par les testeurs).


Une fois un feature file écrit il sera ajouté au *version control* (ex: Git) dans la même version que la feature deployed. 


### Les outils 

L’intérêt majeur de la **Syntaxe Gherkin** est que des outils ont été créé spécifiquement pour être capable de la lire et faire les tests qui en résultent (*FitNesse, JBehave, Cucumber, Specflow, Behat …*).

Ces outils vont lire / analyser chaque ligne de chaque exemple de chaque fichier de feature et pour chacune de ces lignes ils vont déclencher les portions de codes qui correspondent —> *steps definitions*. Les scenarios Gherkin deviennent donc des tests qui vont mettre à l’épreuve notre code.

### Living Documentation

En plus de servir de test les fichiers feature permettent de révéler l’intention de chaque feature avec des exemples concrets et précis.

Tout ces dossier de fichiers features vont crée une documentation rédigée en langage métier. Et ce lien avec le fait qu’ils servent aussi de tests permets de voir facilement les cas de régressions à mettre à jour et donc la documentation devient elle aussi à jour d’où le terme de **Living Documentation**. Dans un monde où toute documentation tends à périmé c’est vraiment useful.


