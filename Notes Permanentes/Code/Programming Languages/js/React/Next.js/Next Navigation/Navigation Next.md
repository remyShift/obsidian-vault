> [!info]- Tags
> #LangagesDeProgs #React #NextJS 

Pour permettre de naviguer entre des client component Next nous fournis des **Link component**.

```tsx
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="bg-blue-500">
			<h1>Home Page</h1>
			<Link href="/blog">Blog</Link> <br />
			<Link href="/products">Products</Link>
		</div>
	);
}
```

Le `<Link>` component doit être dans un premier temps importé et fonctionne ensuite comme la balise `<a>` en HTML.
- Il prend un `href` qui est le path sur lequel il doit amener.
	- **NB :** c'est le path actuel + celui fournit dans le href.
		- De plus la "home page" a le path "/".


De plus pour naviguer vers des routes dynamiques on peut faire comme suit :

```tsx
import Link from "next/link";

export default function ProductsList() {
	const productId = 100;

	return (
		<>
			<h1>Product List</h1>
			<h2><Link href="/products/1">Product 1</Link></h2>
			<h2><Link href="/products/2">Product 2</Link></h2>
			<h2><Link href="/products/3" replace>Product 3</Link></h2>
			<h2><Link href={`/products/${productId}`}>Product {productId}</Link></h2>
			<Link href="/">Home</Link>
		</>
	);
}
```

**NB  :** Le lien du 3ème produit prends en paramètre `replace` --> lorsqu'on va vouloir revenir en arrière de la page du produit 3 ça va nous ramener à la home page.

Aussi l'attribut `target="_blank"` permets de faire en sorte que la page s'ouvre dans un nouvel onglet plutôt que de remplacer la page actuelle.

On peut aussi [[Link Style |appliquer du style]] à nos Links. De plus on peut naviguer entre des pages de manières programmatiques (// répondant à des conditions ou actions) avec [[useRouter]].