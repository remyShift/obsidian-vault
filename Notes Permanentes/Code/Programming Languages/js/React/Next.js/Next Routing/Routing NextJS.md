> [!info]- Tags
> #LangagesDeProgs #React #NextJS 

Voici quelques règles à respecter pour Next interprète bien notre routing files :
- Toutes les routes doivent être dans le dossier `src/app`,
- Chaque fichier correspondant à une route doit être nommé `page.js` ou `page.tsx`,
- Chaque dossier en plus dans le dossier `app` sera considéré comme un path de notre url (exemple : `app/login/page.tsx` --> http://monApp.com/login),
- **NB :** Next a plusieurs types de fichiers mis a notre disposition pour différents cas d'utilisation :
	- **pages -->** UI unique correspondant à une route,
	- [[Layouts |layout.tsx]],
	- [[Templates|template.tsx]],
	- [[Custom Page 404 |not-found.tsx]],
	- [[Loading Page |loading.tsx]],
	- [[Error Handler|error.tsx]],

![[ExempleNextJSHomePage.png]]

Voici la hiérarchie des différents files :

![[Pages Hiérarchie NextJS.png]]


**NB :** Si on essaye d'accéder un path / URL qui n'existe pas Next renvoie automatiquement une page 404. Nous n'avons pas à gérer ce cas explicitement. Néanmoins si on veut une [[Custom Page 404]] c'est possible.
- Chaque routes ainsi crées est publique --> accessible par tous. (*uniquement si le folder contient une `page.tsx` car meme si une route est accessible il n'y a que le contenue de `page.tsx` qui est envoyé au Client*)
	- On peut aussi faire des [[Private Folders]],
- De plus on faire des [[Groupes de Routes]] pour avoir une meilleure gestion de nos file/folder sans impacter notre path,

De plus en suivant ce principe on peut faire des routes imbriquées --> des folders dans des folders.

On peut aussi faire des [[Routes Dynamiques]], pour un dashboard on va utiliser les [[Routes Parallèles]] et on peut aussi [[Intercepter les routes]].

NextJS fournit l'API [[Metadata]] qui va nous permettre de fournir des informations pour chacune de nos pages afin d'optimiser notre SEO.

Pour naviguer entre ces routes on va voir la [[Navigation Next |Navigation]].