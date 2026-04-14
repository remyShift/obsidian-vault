---
tags: [LangagesDeProgs, React, NextJS]
---

Les Metadata sont des informations qui sont affichées lorsque nos pages sont partagées ou indexées.
- Elles permettent une optimisation du SEO.

Les Metadata, comme le Routing en Next, suivent quelques règles :
- `layout.tsx` et `page.tsx` peuvent tout les deux exporter des metadata,
	- si c'est dans le `layout.tsx` les metadata seront partagées avec toutes les pages sur lesquelles le layout s'applique,
	- si c'est dans la `page.tsx` les metadata ne s'appliquent qu'à cette page,
	- si il y a des metadata dans les 2 elles seront combinés néanmoins si il y a les même metadata dans les 2 c'est les valeurs de `page.tsx` qui seront utilisées,
- les metadata sont lu depuis la racine jusqu'à la fin de la page,
	- == une metadata plus deep dans nos fichier sera celle qui prime


De plus on peut avoir des metadata dynamiques et qui s'adaptent à notre path :
- pour avoir un titre selon le nom de page dynamiques,

Pour ce faire :

```tsx
import { Metadata } from "next";

type Props = {
	params: {
		productId: string;
	}
}

export const generateMetadata = ({ params }: Props): Metadata => {
	return {
		title: `Product ${params.productId}`,
		description: `Product ${params.productId} details`,
	}
}

export default function ProductDetails({ params }: Props) {
	return (
		<h1>Details about product {params.productId}</h1>
	);
}
```

À noter que si on a besoin de fetch une donnée pour avoir notre titre `generateMetadata` peut être async :

```tsx
import { Metadata } from "next";

type Props = {
	params: {
		productId: string;
	}
}

export const generateMetadata = ({ params }: Props): Metadata => {
	const title = await new Promise((resolve) => {
		setTimeout(() => {
			resolve(`iPhone ${params.productId}`);
		}, 100);
	});
	return {
		title: `Product ${title}`,
		description: `Product ${params.productId} details`,
	}
}

export default function ProductDetails({ params }: Props) {
	return (
		<h1>Details about product {params.productId}</h1>
	);
}
```

## Title :

Le `title` est le titre qui sera affiché par notre navigateur pour remplacer l'url lorsqu'on sera sur une page.
- Il peut être une string ou bien un objet.

L'objet title peut être utile lorsqu'on le déclare a notre root layout car il prends 3 paramètres :
- **default** --> qui sera le titre display par défaut si la page ne fournit pas de titre :
```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		default: "Next.js tutorial",
		template: "",
		absolute: ""
	}
}
```

- **template** --> si une page fournis un titre il sera inclu dans le template définis remplaçant le `%s` :
```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		default: "Next.js tutorial",
		template: "%s | Made by Rémy",
		absolute: ""
	}
}
```

Si par exemple dans notre page `about` on a un titre définis tel qui suis :
```tsx
export const metadata = {
	title: 'About page',
}
```
Le titre qui sera display sera : `About page | Made by Rémy`.

- **absolute** --> est là pour ignorer un template :

Si par exemple dans notre page `about` on a un titre définis tel qui suis :
```tsx
export const metadata = {
	title: {
		absolute: `About page`,
	}
}
```

Le titre qui sera display sera juste `About page` ignorant ainsi le template définis dans notre root layout.