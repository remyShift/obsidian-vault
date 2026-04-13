> [!info]- Tags
> #CodeKnowledge 

- Langages synchrones : C, Java ...
- Les langages synchrones vont être utilisés dans des domaines précis,
	- Langages bas niveau,
	- Ils vont exécuter leur instruction sur 1 seul thread étape par étape.

**NB :**
- JS est synchrone mais possède sa propre techno pour faire de l'asynchrone : **l'event loop**,
	- Permets de check si c'est le moment de passer une fonction dans la callback queue (queue d'attente) à la call stack (queue d'exécution) une fois qu'elle est libre,
		- 2 queue qui vont stocker les events :
			- callback queue,
			- micro stack queue (promise + async / await).