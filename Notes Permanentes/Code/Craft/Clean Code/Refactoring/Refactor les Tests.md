> [!info]- Tags
> #SoftwareCraft #CleanCode #Refacto #Tests


Refactorer nos tests est d'autant plus important car c'est généralement le point d'entrée d'une personne sur du code qu'elle ne connaît pas.

On va vouloir focus les objectifs suivants :
- renforcer la clarté et l'intention du test,
- délimiter les parties du test suivant les triples A (cf. [[Anatomie d'un test]]),
- faciliter la maintenabilité des tests, en respectant les principes [[Principes et outils pour tester|FIRST]],

En lisant le test on est censé comprendre facilement quel cas d'usage et quelle règle de gestion on vérifie.

Les techniques de refactoring appliquées aux tests nous permettent :
- bien nommer les tests,
- ne pas faire des tests trop gros (// qui testent trop de choses d'un coup),
- éviter de mélanger les niveaux d'abstractions,
- favoriser la réutilisation (notamment pour l'initialisation du contexte),
