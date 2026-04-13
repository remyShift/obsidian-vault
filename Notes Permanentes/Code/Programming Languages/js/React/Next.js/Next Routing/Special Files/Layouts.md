> [!info]- Tags
> #LangagesDeProgs #React #NextJS

**Layouts** == UI partagée entre différentes pages (*ex : header / footer*).

Pour définir un layout il suffit d'exporter un component React depuis un fichier `layout.tsx`.

**NB :** NextJS fournis déjà un fichier layout.tsx avec RootLayout comme composant, ce fichier est automatiquement généré par Next et ce même si on le supprime.

Chaque `layout.tsx` component doit accepter un children prop qui est in fine la page sur laquelle on sera selon notre path et donc celle qui est rendu.

```tsx
export default function RootLayout({ children,}: {
	children: React.ReactNode
}) {

	return (
	
		<html lang="en">
			<body>
				<header style={{ backgroundColor: 'lightblue', padding: '1rem' }}>
					<p>Header</p>
				</header>
	
				{children}
	
				<footer style={{ backgroundColor: 'ghostwhite', padding: '1rem' }}>
					<p>Footer</p>
				</footer>
			</body>
		</html>
	)
}
```

Dans ce cas de layout par exemple on va avoir notre header et notre footer qui sera présent sur chaque page peut importe la page.

De plus on peut lié un layout à une page / un path il nous suffit de créer un `layout.tsx` dans le dossier correspondant et le layout ainsi créer ne s'affichera que lorsque qu'on sera sur le bon path. *cela peut être utile lorsqu'on est avec des routes dynamiques auxquelles ont veut appliquer le même layout.*

![[Layout Example.png]]

Par exemple dans ce cas on va avoir notre `RootLayout`avec notre header et notre footer qui sera appliqué à notre `/products/productId` mais aussi son propre layout et ce peut importe le `productId`.

De plus on peut appliquer un Layout à nos [[Groupes de Routes]] et ainsi faire des groupes de routes pour leur appliquer un layout particulier.

Une des limites des layouts est que si par exemple on mets du texte dans un input et qu'on change de page (comme l'exemple de [[Link Style]]) le texte contenue dans l'input ne changera pas.
- Les layout mount dans notre DOM seulement la partie qui représente le contenu,
- Pour palier à ça NextJS à [[Templates]],

**NB :** Les layouts peuvent servir aussi pour importer de manières global sur toutes nos pages du style.