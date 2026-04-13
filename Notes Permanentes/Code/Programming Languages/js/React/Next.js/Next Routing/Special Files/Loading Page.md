> [!info]- Tags
> #LangagesDeProgs #React #NextJS 

Ce fichier nous permets de créer des pages qui seront rendu à l'user quand on attends une réponse (// des loaders).
- Cela permets à l'user d'être sur que la requête a bien été faites.

Dès qu'un utilisateur navigue sur une page (auquel un loading.tsx est lié), alors il sera a chaque fois affiché le temps que la page s'affiche.

(si des doutes check la vidéo : [Next.js 14 Tutorial - 23 - Loading UI - YouTube](https://www.youtube.com/watch?v=PrxdiJrrrWs&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=23)).

```tsx
export default function Loading() {
	return (
		<div>Loading</div>
	);
}
```
