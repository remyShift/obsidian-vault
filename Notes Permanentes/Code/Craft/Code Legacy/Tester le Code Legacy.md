---
tags: [SoftwareCraft, CodeLegacy, Tests]
---

« Ce qui est important n’est pas ce que le code est supposé faire mais ce qu’il fait réellement. », *SoftwareCraft mais citation d’Arnaud Lemaire*

Dans un contexte TDD on connaît à l’avance le comportement et on sait ce qu’il résulte —> le code de production sera forcément conforme aux tests.
- Alors que dans un contexte de code legacy avec des tests partiels c’est la situation inverse : c’est aux tests qu’on ajoute au fur et à mesure de se conformer au comportement du code existant.

Les nouveaux tests vont dépendre de la lisibilité du code pour les faire émerger.
- si le code est pas si pire et qu’on est apte à le comprendre on peut commencer à identifier des règles de gestions possibles qui serviront de fondations à nos test,
	- [[Approche par Compréhension du Code]]
- si le code est trop flou on va plutôt adopter une approche de boîte noire —> on stimule le code / on le force à produire un comportement qu’on capture en un test
	- [[Approche par Observation du Code]]

De plus il faut aussi veiller d’affiner notre périmètre de code testé : si on test un module ? une classe ? une fonction ? les entrées sorties sont elles bien identifiées ? quels sont les effet de bord ? quels sont les erreurs possibles et comment les gérer ?

**NB :** Il peut être nécessaire de de réorganiser le code dans un premier temps (en le découpant, modifiant des signatures, ou la visibilité de certaines fonctionnalités) —> Mais ces modifications doivent être limitées et faites en prenant le moins de risque possible.