> [!info]- Tags
> #SoftwareCraft #CleanCode

L’art du nommage = avoir des noms (de fonctions, variables, méthodes, fichiers …) qui sont explicite quant à l’intention voulu
- Importance donc de connaître le métier et l’objectif pour un meilleur nommage et plus pertinent et en lien avec le métier 

Tips pour rendre le code plus lisible :
- Pas de noms imprononçables, comme des acronymes ou abréviations (sauf si utilisé couramment par le métier),
- Ne pas utiliser de terme fourre-tout, brouille la lecture et génère du bruit (*data, info, manager*)
- Noms communs = classe / Verbe = méthode

⚠️ Un mauvais nommage est un facteur d’un code mal organisé, mal découpé, qui fait trop de choses …
- Ne pas rester bloquer sur le nommage —> passer à la suite et revenir dessus après pour prendre du recul, c’est même contre-productif que d’essayer de trouver le nom parfait du premier coup —> le nommage se fait au fil d’itération pour tendre vers un nom parfait 
	- Ne pas hésiter à relire du code qu’on a déjà écris et renommer si nécessaire ==> chaque nom qui apport plus de connaissances que l’ancien sera forcément mieux

Piège à éviter :
- **Nommer en fonction du type**
	- On fait de la répétition alors qu’on cherche à éviter la répétition dans le Clean Code. On va préférer d’expliciter l’utilité de la variable / fonction et son rôle dans ce contexte d’utilisation.
	- Éviter les noms court abreuvants le types 
		- Préférer *index ou position* plutôt que *i et j* par exemple
- **Noms de paramètres et d’arguments identiques**
	- Avoir un nom de paramètre et d’arguments différent permets d’exprimer plus facilement l’intention localement
- **Paraphrasage maladroit**
	- Avoir un nom à rallonge peut être compliqué à maintenir et à lire
		- Prendre de la hauteur pour définir de manière globale ce que fait la fonction plutôt que de manière locale
			- On sépare le pourquoi du comment

L’art du nommage et avoir un bon nommage permets une meilleur transmission de connaissance et donc de compréhension du code 