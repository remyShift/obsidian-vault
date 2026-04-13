> [!info]- Tags
> #Tests 

Le problème des tests unitaires est que souvent on risque d’être confronté à des dépendances qui vont venir casser nos principes FIRST.

L’objectif dans nos tests va être de *mock* ces dépendances pour assurer l’intégrité des principes FIRST.

⚠️ **NB :** Le terme mock peut soit être désigné de manière global tout les types de doublures de tests soit un cas particulier de doublure de test.

## Mise en œuvre des doublures :

Les doublures de tests peuvent être découpées en 5 types :

- Dummy Object,
- Test Stub,
- Test Spy,
- Mock Object,
- Fake Object

Pour chaque on verra le besoin spécifique dans un test auquel le type répond ainsi que comment l’implémenter à la main.


### Doublure de type dummy :

La doublure dummy viens donner arbitrairement une valeur quelconque pour un test qui pourrait être remplacer facilement par n’importe quel autre.

*Exemple :* dans le cas où un test qu’une division ne peut avoir le dénominateur à 0 la valeur du numérateur sera donné arbitrairement et facilement remplaçable par une autre.

Dans l’exemple on fonctionne avec un entier mais la doublure dummy s’applique à des objets plus complexes.

### Doublure de type stub :

Le stub viens simuler un état d’une dépendance se substituant à l’implémentation réelle.

*Exemple :* Dans le cas d’une authentification on veut test qu’elle réussisse ou échoue et agir en conséquence.

On aurait donc un stub pour la réussite de l’authentification et un pour l’échec et la suite du test qui test ce qu’il se passe en conséquence.

### Doublure de type spy :

Le spy permets de substituer l’implémentation réelle pour vérifier qu’une fonction a bien été appelé et combien de fois.

*Exemple :* Dans le cas d’une application de commerce où on veut vérifier qu’une réduction a bien été notifiée un bon nombre de fois correspondant a notre nombre d’utilisateurs.

Un peu aussi avoir des spy plus complexes comme pour observer les valeurs d’attributs d’une classe après l’appel d’une méthode ou la valeur des arguments au moment de l’appel de la méthode.

### Doublure de type mock :

Un mock simule un objet ou une fonction, permettant de contrôler son comportement et de tester les réactions du code sans utiliser de vraies données.

*Exemple* : toujours avec notre système de notifications, le mock va être une classe créer permettant de stocker les utilisateurs notifiés afin de vérifier ensuite que ça soit les bons utilisateurs qui ont été notifiés.

### Doublure de type fake :

Permets de simuler au travers d’une fausse implémentation une action qui testé réellement poserait des soucis.

*Exemple :* Testé que le contenue d’un mail soit conforme à ce qui est attendu —> on va donc implémenter un faux envoie de mail avec un faux contenu semblable à l’original pour ne pas gêner les utilisateurs.