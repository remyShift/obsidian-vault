---
tags: [LangagesDeProgs, React, NextJS]
---

`useRouter` est un hook très utile en NextJS, car il nous permets de gérer de la navigation de manière programmatique.

```tsx
"use client";
import { useRouter } from "next/navigation";

export default function OrderProduct() {
	const router = useRouter();

	const handleClick = () => {
		alert("Order placed");
		router.push("/");
	}

	return (
		<>
			<h1>Order Product</h1>
			<button onClick={handleClick}>Place Order</button>
		</>
	);
}
```

Dans le code si dessus dès qu'on clique sur notre bouton on sera amené à la home page. 	
- `useRouter` étant un hook le component qui l'utilise se doit d'être un client side component,


**NB :** `router.push` va push un nouveau path dans l'historique et l'user pourra retourner dessus en retournant à la page précédente,
- on peut utiliser `router.replace` qui va plutôt remplacer le path actuel et l'user ne pourra pas retourner à la page précédente,
- `router.back` permets de revenir à la page précédente (comme le bouton revenir en arrière du navigateur),
- `router.forward` permets d'aller a la page suivante de l'historique si elle existe (comme le bouton avancer du navigateur),
