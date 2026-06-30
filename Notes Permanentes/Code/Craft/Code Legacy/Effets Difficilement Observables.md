---
tags: [SoftwareCraft, CodeLegacy]
---

De plus il se peut que nous n'arrivions pas à construire notre Golden Master tout simplement car le code à tester est difficilement observable / difficile d'accès. On est donc dans une impasse : soit on ne sait pas quoi vérifier soit comment accéder à l'état qu'on veut vérifier.

- Par exemple :
	- écriture dans une BDD,
	- envoie de messages async sur un bus d'évents,
	- gestion d'interface graphique,
	- modification d'un état interne non accessible (comme celui d'un objet non public),
	- écriture dans la sortie standard,

Dans ces cas là le code provoque des effets de bords —> les fonctions qu'on veut testées modifient autres choses que les paramètres d'entrée et ne retournent pas de valeurs.

Pour contourner cela on va changer de perspective —> ce qui nous importe le plus c'est la modification en elle même, et non l'endroit où elle se fait.

- Il nous faut donc " attraper " cette modification en route et récupérer la valeur écrite qui nous sera utile après dans nos assertions,
	- Une des options et d'introduire une abstraction en façade de l'effet de bord (*cf exemple p110*)
