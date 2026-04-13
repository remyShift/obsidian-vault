> [!info]- Tags
> #SoftwareCraft #CleanCode 

Structurer son code est un concept clé du Clean Code qui passe avant tout par l’art du storytelling.
- Lorsqu’on raconte une histoire on suit une trame, avec un début un milieu et une fin et on déroule notre histoire en suivant cette trame sans partir dans pleins de directions différentes. Il faut appliquer cette logique lorsqu’on code, on ne veut pas perdre notre lecteur lorsqu’il lit notre code on doit lui raconter une histoire en lien avec le problème métier que le code résout.
	- On ne veut pas d’un code spaghettis qui part dans tout les sens.

Afin d’arriver à raconter notre histoire on va utiliser divers procédés comme suit : 
## Découper les fonctions :

Une fonction doit rester petite, si on a besoin d’écrire beaucoup de lignes alors c’est qu’on peut la découper en plusieurs autres fonctions.
- Le découpage en sous fonctions permets aussi d’obtenir une certaines logique lorsqu’on lit le code : les fonctions les plus en haut sont proche de la problématique métier et plus on descends plus on va dans le détail de fonctions techniques.
- Si une fonction traites plusieurs problèmes c’est un signe qu’on peut la découper en plusieurs fonctions.

**Rappel :** La signature d’une fonction = son type de retour + son nom + ses paramètres.

La signature doit bien définir le *quoi* tandis que son corps *le comment*.

Dans la même logique on va limiter le nombre de paramètres, si on a la nécessité d’en avoir beaucoup alors c’est qu’on peut regrouper les paramètres en type plus complexe.

#### Évaluer la taille d’une fonction :

- La fonction ne doit faire qu’une seule chose,
- Une fonction doit avoir un seul niveau d’abstraction *dans la mesure du possible*
	- ne pas mélanger appel lié à une règle métier et calcul techniques
- limiter le nombres de paramètres
	- si y en besoin de beaucoup —> type dédié 
- avoir 1 seul paramètre de sortie
	- si valeur retourné complexe —> type dédié
- paramètres d’entrée immuable en dehors de la fonction
- limiter le nombre de variable
	- initialiser les variables le plus près de l’endroit où elles seront utilisées

## Organiser son code

- Du plus grand vers le plus petit
	- Du plus global vers le plus précis 
	- Du plus en lien vers le métier vers le plus techniques

**Aucune fonction ne devrait être définie plus haut qu’une fonction qui l’appel**

Un code propre se verra automatiquement lorsqu’on le regarde :
- il est bien formaté et respecte les standards définis par l’équipe,
- le niveau d’indentation est limité : pas plus d’un ou deux par fonction, s’il y en a plus —> on découpe,
- largeur des lignes définis et limitée