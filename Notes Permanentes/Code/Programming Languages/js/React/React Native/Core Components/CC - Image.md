---
tags: [LangagesDeProgs, ReactNative, Framework]
---

Le composant `<Image />` permets d'afficher des images venant d'internet ou de ressources statiques (fichiers temporaire ou image stockée localement).

Pour un image locale :
```tsx
<Image source={require("assets/image-example.png")} />
```

Pour une image d'internet :
```tsx
const imageFromNetwork = "lien de mon image"

<Image 
	source={{
		uri: imageFromNetwork,
		width: 300,
		height: 200
	}}
/>
```


**NB :** Pour une image d'internet il faut préciser une hauteur et une largeur, que ça soit dans l'objet `source`ou alors avec du style.