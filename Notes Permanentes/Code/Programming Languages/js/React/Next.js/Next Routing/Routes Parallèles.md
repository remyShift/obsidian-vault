> [!info]- Tags
> #LangagesDeProgs #NextJS 

Les routes parallèles sont un moyen de regrouper plusieurs `page.tsx` et de les afficher en même temps dans un seul et même layout.

Pour définir une route parallèle nous utilisons un nommage comme suit `@foldername` -> appelé "slots".

Chaque dossier ainsi crée contiendra une `page.tsx` qui pourra être passé en arguments de notre `layout.tsx` et seront donc tous render en même temps.

![[Exemple Parallele routes nextjs.png]]


```tsx
export default function DashboardLayout({
	children,
	notifications,
	users,
	revenue,
}: {
	children: React.ReactNode;
	notifications: React.ReactNode;
	users: React.ReactNode;
	revenue: React.ReactNode;
}) {

return (	
	<>		
		<div>{children}</div>		
		<div className="flex">		
			<div className="flex flex-col">		
				<div>{users}</div>		
				<div>{revenue}</div>		
			</div>		
			<div className="flex flex-1">{notifications}</div>		
		</div>
	</>	
	);
}
```

**NB :** Chaque slots sera considéré comme une parallel route et ne sera donc pas accessible dans notre path.

L'avantage des routes parallèles est le fait que chaque slots et indépendant des autres, ce qui veut dire :
- chaque slots peut avoir sa gestion d'erreur,
- chaque slots peut avoir son loading,
	- choses qui peuvent être utile lorsque différentes parties de notre page se chargent à vitesse différentes ou qu'elles peuvent avoir des erreurs particulière,
- chaque slot a son propre state,
- chaque slot a sa propre navigation, 