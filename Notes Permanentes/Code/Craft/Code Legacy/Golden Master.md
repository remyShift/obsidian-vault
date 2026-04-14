---
tags: [SoftwareCraft, CodeLegacy, Tests]
---

On va adopter une approche contre intuitive mais redoutablement efficace !
- On va se dire que le code marche, fait ce qu’on veut et tourne en prod. 
	- On va plutôt chercher à observer ce que le code fait.
		- On va stimuler le code pour en voir les effets qui en résultent qu’on va enregistrer.
			- —> **Golden Master** = enregistrement de l’ensemble des comportements d’un code existant

**NB :** Stimuler = tester le code en observant les résultats. De plus golden master reste un processus itératif.

Le golden master ainsi créé va être composé de tout les jeux de valeurs possibles en entrées. Il va ainsi nous servir de garde fou quant à toutes régressions.

Néanmoins il peut être ardu de trouver la bonne manière de tester le code / avec les bons jeux de valeurs.
- On se basera sur les conditions vérifiée dans notre fonction / méthode,
- Se tourner vers le métier et leur demander des cas d’exemples réalistes,

On peut aussi s’appuyer sur nos frameworks de test pour stimuler efficacement et connaître les valeurs d’entrées connues / par défaut.

Mais comment on sait qu’on a suffisamment stimuler notre code ? qu’on a couvert suffisamment de cas pour en avoir les cas d’usages ?
- On va s’appuyer notamment sur des outils nous montrant la couverture de tests, généralement ces outils nous montre les lignes non testés et donc orienteront l’ajout de nos tests,
	- On va vouloir tendre à s’approcher des 100% de test coverage,
	- Chaque nouveau tests qu’on ajoute qui augmente notre test coverage sera pertinent,
- Attention le test coverage a une grosse faiblesse : il ne mesure uniquement les lignes testées indépendamment de l’échec ou la réussite 
	- Aussi le test coverage n’est pas dépendant d’assertion —> on peut faire des tests sans assertions juste pour augmenter la test coverage et donc ça perds en utilité 
	- De plus si on est face a du code très linéaire avec peu de if / de branches on peut atteindre facilement 100% de test coverage sans pour autant que ça soit pertinent de la qualité de nos tests,
	- Pour palier à ça on va porter une attention toute particulière aux assertions et qu’elles soient pertinentes et vérifier qu’elles échouent au moins une fois (en apportant volontairement une régression dans le code),

Aussi le Golden Master a pour vocation de disparaître et laisser place à des tests plus pertinents et en lien avec le comportement métier qui auront une bien meilleur valeur documentaire.

**NB :** Les tests ainsi créé et le code ainsi refactorer sera semblable au code présent avant du moins dans le comportement. Ce qui est intéressant maintenant et qu’on peut travailler sur ce code (refactorer encore plus ardemment) et ajouter des features en toute sérénité.


### Alternative au Golden Master :

Se construire un Golden Master pertinent peut être fastidieux dans certains cas. C’est pourquoi on peut partir du principe que le code refactorer est censé avoir le même comportement que le code legacy.
- Pour se faire on garderas une copie du code legacy avant de le refactorer,
- On lancera nos tests sur le code legacy et sur le code ainsi refactorer pour s’assurer aucun régression et que notre code refactorer a bien le même comportement que le code legacy,
- Néanmoins cette méthode peut être fastidieuse lié à la duplication de code qu’on aura —> plus on a de code legacy plus on devra en dupliquer.