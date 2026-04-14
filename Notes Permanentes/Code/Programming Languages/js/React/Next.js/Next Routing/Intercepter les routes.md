---
tags: [LangagesDeProgs, React, NextJS]
---


Intercepter les routes nous permets de display de l'UI lié à la route de destination par dessus le contenu de la route actuel. Cela nous permets de :
- créer des modals au travers du routing,
- garder du contexte,

**NB :** Sur le refresh on aura plus la route interceptée mais bien la full page comme est prévu la route.

Pour ce faire on a besoin de créer une route (/dossier) disons `/f1/` dans ce dernier on ajoute une route disons `f1/f2/`. Désormais si on passe de `f1` à `f2` on voit juste leur contenu respectif.
- Ajoutons dans `f1` un nouveau dossier qui sera l'interception de la route `f2`, pour ce faire le dossier a besoin d'être nommé comme suis `(.)f2`.

```tsx
export default function InterceptedF2() {
	return (
		<h1> F2 intercepted</h1>
	);
}
```

![[Exemple Next Routes Interceptées.png]]

Désormais si on passe de `f1` à `f2` on verra le contenue de `(.)f2` et seulement sur le refresh on verra celui de `f2`.

**NB :** Pour intercepter une route / dossier d'un dossier au dessus il suffira juste de mettre dans le dossier de la page qui contient le lien redirigeant vers se composant `(..)NomDuDossier` qui indiquera qu'on veut intercepter une route qui se trouve au dessus.
- Ainsi on peut remonter l'interception vers un fichier au dessus en rajoutant `(..)(..)`.
- De plus si on veut intercepter le fait de revenir à la une routes de notre dossier app (une route de premier niveau) on doit écrire le nom du dossier comme ça `(...)`.

Pour faire des modals les routes interceptées sont combinées avec les [[Routes Parallèles]] (cf : [Next.js - Parallel Intercepting Routes ](https://youtu.be/mVOvx9eVHg0?si=Q9ZOVFcZ_RYsVIbX)).