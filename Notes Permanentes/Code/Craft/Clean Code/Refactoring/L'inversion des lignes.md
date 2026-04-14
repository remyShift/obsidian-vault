---
tags: [SoftwareCraft, CleanCode, Refacto]
---

Intervertir certaines lignes permets de :
- ne pas faire de couper / coller,
- réunir des lignes de codes qui sont liées,
	- ça va nous permettre d’avoir un meilleur découpage (pour une extraction par exemple) car nos bouts de codes sont grouper par unités logique,
		- ça facilitera aussi le renommage car certaines variables sont plus proches d’où elles sont utilisées,

Inverser des méthodes est une version plus évolué qui va nous permettre d’organiser l’ordre des méthodes dans une classe tel une table des matières.