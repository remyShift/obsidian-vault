> [!info]- Tags
> #SoftwareCraft #CleanCode 

Structurer son code est un concept clé du Clean Code qui passe avant tout par l'art du storytelling.
- Lorsqu'on raconte une histoire on suit une trame, avec un début un milieu et une fin et on déroule notre histoire en suivant cette trame sans partir dans pleins de directions différentes. Il faut appliquer cette logique lorsqu'on code, on ne veut pas perdre notre lecteur lorsqu'il lit notre code on doit lui raconter une histoire en lien avec le problème métier que le code résout.
	- On ne veut pas d'un code spaghetti qui part dans tous les sens, ni de chaînes d'appels à travers plusieurs objets (cf. [[Loi de Déméter]]).

Afin d'arriver à raconter notre histoire on va utiliser divers procédés comme suit : 
## Découper les fonctions :

Une fonction doit rester petite, si on a besoin d'écrire beaucoup de lignes alors c'est qu'on peut la découper en plusieurs autres fonctions, c'est le smell [[Code Smells|Long Method]].
- Le découpage en sous-fonctions permet aussi d'obtenir une certaine logique lorsqu'on lit le code : les fonctions les plus en haut sont proches de la problématique métier et plus on descend plus on va dans le détail de fonctions techniques.
- Si une fonction traite plusieurs problèmes c'est un signe qu'on peut la découper en plusieurs fonctions.

**Rappel :** La signature d'une fonction = son type de retour + son nom + ses paramètres.

La signature doit bien définir le *quoi* tandis que son corps *le comment*.

Dans la même logique on va limiter le nombre de paramètres, si on a la nécessité d'en avoir beaucoup alors c'est qu'on peut regrouper les paramètres en type plus complexe.

#### Évaluer la taille d'une fonction :

- La fonction ne doit faire qu'une seule chose,
- Une fonction doit avoir un seul niveau d'abstraction *dans la mesure du possible*
	- ne pas mélanger appel lié à une règle métier et calcul techniques
- limiter le nombre de paramètres
	- si besoin de beaucoup —> type dédié 
- avoir 1 seul paramètre de sortie
	- si valeur retournée complexe —> type dédié
- paramètres d'entrée immuables en dehors de la fonction
- limiter le nombre de variables
	- initialiser les variables le plus près de l'endroit où elles seront utilisées

## Organiser son code

- Du plus grand vers le plus petit
	- Du plus global vers le plus précis 
	- Du plus en lien avec le métier vers le plus technique

**Aucune fonction ne devrait être définie plus haut qu'une fonction qui l'appelle.**

Un code propre se verra automatiquement lorsqu'on le regarde :
- il est bien formaté et respecte les standards définis par l'équipe,
- le niveau d'indentation est limité : pas plus d'un ou deux par fonction, s'il y en a plus —> on découpe,
- largeur des lignes définie et limitée
