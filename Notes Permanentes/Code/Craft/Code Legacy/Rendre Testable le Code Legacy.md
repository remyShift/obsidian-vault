> [!info]- Tags
> #SoftwareCraft #CodeLegacy #Tests 

Lorsqu’on veut tester du code legacy il est courant que lors de l’exécution du test des erreurs soient déclenchées. Et lorsqu’on essaye d’y résoudre on fait face à plusieurs problèmes :
- le code dépends d’un accès à une ressource externe,
- le code dépend d’une certaine configuration de l’environnement,
- le code dépends de conditions changeantes et difficile à prévoir,
- le comportement du code est difficilement observable / capturable pour établir notre golden master,

Comme nous le montre les exemples ci dessus la plupart du temps le code dépends d’autres choses, c’est ce qu’on appelle les [[Dépendances Retorses]]. 

L’autre cas étant les [[Effets Difficilement Observables]].

