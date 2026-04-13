> [!info]- Tags
> #SoftwareCraft #CodeLegacy #Tests 

Une fois la dépendance repérée on va essayer de réduire son impact sur le code en l’isolant. 
- On veut avoir de l’abstraction entre la dite dépendance et le code qu’on veut tester afin d’avoir comme un tampon entre les deux,
	- Le dépendance sera donc en marge du code qu’on veut tester et ça simplifiera par la même occasion nos tests sans avoir d’effets néfastes,

Pour réussir à l’isoler les [[Patterns de Refactoring]] seront très utiles, ainsi que ce qui est en lien avec le Clean Code.

**NB :** Isoler de dépendances peut passer via le fait de toucher au code legacy sans qu’il soit couvert par les tests. Si on a pas le choix et qu’on est bloqué / qu’on a pas d’autre solution viable il faut bien le faire. Néanmoins on se limitera au maximum et ne feront que des modifications sans danger —> les endroits où on peut intervenir est ce qu’on appel des **seams**.
- « A Seam is a place to alter program behavior without changing the code. »
- La traduction de seam étant couture cela veut dire qu’on cherche les coutures de notre code / les points précis où intervenir sans apporter de modification significative au code de production.