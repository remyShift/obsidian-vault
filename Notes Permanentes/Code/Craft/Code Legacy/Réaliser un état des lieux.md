---
tags: [SoftwareCraft, CodeLegacy]
---

⚠️ On attaque pas directement à refactor notre code legacy ni même à toucher ne serait ce qu'une seule ligne de code.

Dans un premier temps **le code est il exécutable ?**

- est ce que ça compile ?
- est ce que l'application / serveur se lance correctement ?
- comment se passent les interactions avec l'application ? quels en sont les effets ?
- y a-t-il une documentation ?

Dans un second temps **est ce qu'il y a des tests ?**

- si des tests déjà présent = travail facilité,
	- s'assurer qu'on puisse les lancer,
	- vérifier que ça soit des tests pertinents,
	- vérifier ceux qui passent ou non,
	- voir leur coverage,

Puis dans un troisième et **se faire une idée globale du code :**

- identifier le périmètre d'intervention sur le code,
- recenser les structures de données, les concepts manipulés …
- repérer les *smells* présents,
- commencer à noter les actions à fournir,
- on peut baliser aussi le code avec des commentaires de todo même si pour éviter de rajouter du bruit on préférera le faire à côté,

Enfin on va **écrire les tests manquants** pour travailler sur du code suffisamment couvert et éviter ainsi tout risque de régression.
