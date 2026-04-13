> [!info]- Tags
> #LangagesDeProgs #React #NextJS 

Les files `error.tsx` seront ceux qui seront display à notre user au cas une erreur est throw par une de nos pages.

**NB :** les files `error.tsx` sont des Client Side Component et donc on besoin de `"use client"`.
- De plus les `error.tsx` n'overwrite pas sur les layouts ce qui veut dire qu'on aura toujours les layouts associés avec le message d'erreur.
	- Cela permets d'isoler l'erreur pour que le reste de l'app reste fonctionnel.

```tsx 
"use client";

export default function ErrorBoundary({ error }: { error: Error }) {
	return (
		<div>Error in reviews id. {error.message}</div>
	);
}
```


Néanmoins si on arrive sur cette page on est bloqué sans moyen de revenir en arrière (sauf avec le bouton retour en arrière). Il suffit d'ajouter un bouton avec la fonction `reset` :

```tsx
"use client";

export default function ErrorBoundary({ error, reset }: { error: Error, reset: () => void }) {
	return (
		<div>
			<p>Error in reviews id. {error.message}</p>
			<button onClick={reset}>Try again</button>
		</div>
	);
}
```

**NB :** Vu qu'on retourne sur la page précédente avec le bouton il faut que notre page précédente soit un client side component avec `"use client"`.

De plus lorsqu'on throw notre error c'est le `error.tsx` le plus proche qui sera amené à remplacer notre page. C'est pourquoi le placement et la présence de plusieurs `error.tsx` est important et permets de gérer les erreurs avec une meilleure granularité.

De plus on peut aussi handle les erreurs depuis un file `layout.tsx`.