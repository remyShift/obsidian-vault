---
tags: [Tests]
---

- Les tests visent à vérifier que chaque composant du logiciel fonctionne comme prévu, à détecter les erreurs et les bugs potentiels, et à s'assurer que les nouvelles fonctionnalités n'impactent pas négativement les fonctionnalités existantes,
- Ils sont la vitrine de notre code et la propreté de notre code n’est pas exclu aux test —> lorsqu’on fait une review de code, arrive sur une nouvel base de code … on commence par regarder les tests car si ils sont propres et bien fait il nous servent de documentations fonctionnels sur comment le code qu’on va lire fonctionne.
	- De plus au plus ils seront propre au plus ils seront facile à maintenir

- On distingue différents [[Types de tests]] selon les besoins de ce qu'on veut tester,

- Un des mantras des tests dans la programmation est **Test early, test often** (tester tôt, tester souvent),
	- Plutôt que de coder et tester à la fin il vaut mieux tester le plus tôt et le plus souvent possible, ça permets de s'éviter une charge de travail trop conséquentes, c'est pour cela qu'on va privilégier un développement itératif,
		- Approche de développement où on fait étapes par petites étapes en découpant notre projet / code au plus bas niveau possible,
	- Permets d'avoir beaucoup de tests unitaires[[Tests | tests unitaires]] et facilite ainsi les tests suivants plus complexe,
	- Permets aussi une plus grande couverture du code,

- Voici quelques [[Principes et outils pour tester]],
- Pour savoir comment bien rédiger un test cf [[Anatomie d'un test]],
- Pour réussir à abstraire des dépendances il faut mettre en place des [[Doublures de tests]],

**NB :** *Pour comprendre les différentes API de test cf [Test API Reference | Vitest](https://vitest.dev/api/)*

