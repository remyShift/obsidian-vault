> [!info]- Tags
> #SoftwareCraft #CleanCode #Refacto #Tests


Refactor nos tests et d’autant plus important car c’est généralement le point d’entrée d’une personne sur du code qu’elle ne connaît pas.

On va vouloir focus les objectifs suivant :
- renforcer la clarté et l’intention du test,
- délimiter des parties du test suivant les triples A (Arrange / Act / Assert),
- faciliter la maintenabilité des tests,


En lisant le test on est censé comprendre facilement quel cas d’usage et quelle règle de gestion on vérifie.

Les techniques de refactoring appliquées aux tests nous permette :
- bien nommer les tests,
- ne pas faire des tests trop gros (// qui test trop de choses d’un coup),
- éviter de mélanger les niveaux d’abstractions,
- favoriser la réutilisation (notamment qu’on initialise le contexte),
