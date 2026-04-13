> [!info]- Tags
> #LangagesDeProgs #React #NextJS 

Permets de grouper not routes et fichier sans affecter nos path établis.

Par exemple on veut regrouper les routes lié à l'authentification on a donc comme routes :
- login,
- register,
- forgot password,
Qu'on aimerait regrouper dans un dossier `auth`.

Ainsi on a `src/app/auth/register...`. Néanmoins en faisant comme ça on a rajouté un segment à notre path, ce qui dans le cas de l'authentification peut être pertinent mais dans d'autres cas moins.
- Pour ce faire on peut marquer un folder comme étant un groupe de routes, ce qui permets de l'exclure de notre path et de conserver une organisation de file/folder claire
	- Pour avoir un groupe de route il suffit d'entourer notre folder de `()`, ex : `(auth)/register...`