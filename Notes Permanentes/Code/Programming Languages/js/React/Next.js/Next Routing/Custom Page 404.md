---
tags: [LangagesDeProgs, React, NextJS]
---

Par défaut Next fournis une page 404, si on accede à un path qui n'existe pas, qui ressemble à ceci :

![[Default Next Page404.png]]

Mais on peut en avoir une custom en créant a la racine de notre app folder un fichier nommé `not-found.tsx` cette page not found sera désormais celle par défaut lorsque le path n'est pas bon.

On peut aussi se faire des pages not found spécifique à des pages déjà existante. Par exemple pour notre page de review si on veut avoir que 5 review au maximum et renvoyé une page not found lorsqu'on dépasse dans notre path le chiffre 5, on va faire comme suit :

Dans le `page.tsx` de notre review on va importer et utiliser `notFound` qui est une méthode built in de Next qui va return la page not found du même dossier (*ce qui veut dire qu'on va créer une `not-found.tsx` dans le même dossier que notre `page.tsx`*).

```tsx
import { notFound } from "next/navigation";

export default function ProductReviews({ params }: { params: { productId: string, reviewsId: string } }) {

	if (parseInt(params.reviewsId) > 5) {
		notFound();
	}

	return (
		<h1>Review number {params.reviewsId} for product {params.productId}</h1>
	);
}
```

Dans ce cas si on dépasse le 5 reviews on va afficher la page not-found qui est au même niveau :

![[Specific Custom Not Found.png]]