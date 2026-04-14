---
tags: [LangagesDeProgs, React, NextJS]
---

Pour créer des routes dynamiques il suffit de mettre le nom de notre fichier entre `[ ]`. Par exemple :
![[Exemple Routes Dynamiques NextJS.png]]

Ce qui fait que désormais notre path peut être : `http://localhost:3000/products/2`. 

On peut ensuite accéder à cette propriété de notre path dans notre composant :

```tsx
export default function ProductDetails({ params }: { params: { productId: string } }) {
	return (
		<h1>Details about product {params.productId}</h1>
	);
}
```

**NB :** Chaque `page.tsx` reçoit en prop les paramètre de la route.

Avec le path vu précédemment on verra donc sur notre page un `h1` avec écrit : "Details about product 2".

![[DynamicRoutNextJS.png]]

On peut ainsi faire des routes dynamiques imbriquées.

Par exemple dans notre dossier products un dossier `reviews` avec à l'interieur de ce dossier un dossier `[reviewsId]`.

![[RoutesDynamicsImbriquéesNextJS.png]]

Dans notre `page.tsx` de notre folder `[reviewsId]` on peut accéder en props au reviewsId mais aussi au productId :

```tsx
export default function ProductReviews({ params }: { params: { productId: string, reviewsId: string } }) {	
	return (	
		<h1>Review number {params.reviewsId} for product {params.productId}</h1>	
	);	
}
```

Si on veut faire des routes dynamiques sans passer par un path intermédiaire on va utiliser [[Catch-all Segments]].