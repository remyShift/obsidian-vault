> [!info]- Tags
> #LangagesDeProgs #React #NextJS 

Catch-all segments est une autre manière de faire du routing qui va permettre de faire des routes du types `http://monApp.com/docs/features1/example1`. On va "catch" tout les paths qui suivent "docs".

Pour ce faire on va avoir besoin de mettre notre dossier `docs` dans un dossier `[...slug]`.

**NB :** Le dossier `[...slug]`n'apparaît pas dans notre path, car c'est ce dossier qui indique à Next que que le dossier `docs`est celui qui catchera tout les les path qui en découlent si il n'existe pas.
- Ca veut dire que si je veux accéder en l'état a mon path du début ce qui s'affichera sera la page doc et non une page 404.

Désormais si on veut avoir accès aux path qui découlent de `docs` on ne va pas créer de dossier supplémentaire l'avantage de catch-all segments est justement là. Directement depuis le page.tsx de notre dossier `docs` on va pouvoir y accéder grâce au fait que docs soit dans un dossier `[...slug]` :

```tsx
export default function Docs({ params }: { params: { slug: string[] } }) {
	if (params.slug.length === 2) {
		return (
			<h1>Viewing docs for feature {params.slug[0]} and concept {params.slug[1]}</h1>
		)
	} else if (params.slug.length === 1) {
		return (
			<h1>Viewing docs for feature {params.slug[0]}</h1>
		)
}
	  
	return (
		<div>
			Docs Home page
		</div>
	);
}
```

`slug` représente le tableau de string correspondant à chaque path qui suit docs.

Si on a plus de 3 "slug" ça sera la page par défaut de docs qui sera afficher.

Néanmoins si on veut juste accéder à la page docs désormais on a une erreur 404. Pour palier cette erreur il faut rajouter de [] a notre dossier `[...slug]` comme suit `[[...slug]]`.
- Cette écriture permets de faire du catch-all segments avec plus d'option notamment renvoyé la page par défaut pour le premier niveau de path.
**NB :** Si on écrit notre dossier slug comme ça il faudra mettre un rendu conditionnel lorsqu'on vérifie `params.slug.length` car il se peut que la taille n'existe pas et donc typescript nous renverra une erreur.