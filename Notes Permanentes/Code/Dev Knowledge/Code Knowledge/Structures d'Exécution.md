---
tags: [CodeKnowledge]
---

- Les structures d'exécution décrivent comment les instructions du programme sont exécutées par l'ordinateur.
- Elles définissent l'ordre dans lequel les instructions sont exécutées, ainsi que les mécanismes de contrôle de flux tels que les boucles, les conditions, les appels de fonction, etc.
- Elles peuvent varier en fonction du langage de programmation et du paradigme utilisé.
- On distinguent 3 types de langages qui vont influer sur la structure d'exécution les [[Langages Compilés]], [[Langages Interprétés]], les [[Langages Intermédiaire]].

- On va retrouver 3 types d'exécution :

## Mono Thread

- 1 seul et unique fil d'instructions élémentaires que peut exec un coeur de processeur,
	- Instructions sont chargées dans une pile de registre appelé "pipeline",
		- Chaque "tour d'horloge" une instruction s'exécute.

## Multi Threads

- Un processeur avec plusieurs coeurs est donc un processeur multi-threads,
- Plusieurs fil d'instructions en fonctions du nombre de coeurs,

## HyperThreading

- Lorsqu'un processeur mono-coeur va faire du multi-threading.

Les [[Langages Synchrones]] vont généralement faire du mono-thread tandis que les [[Langages Asynchrones]] du multi-thread ou hyper-threading.

**NB :**

- Cycle d'horloge = Nombre d'opérations que peut faire un ordi chaque seconde (généralement donné en hertz),
- ex : 2,2gHz = 2md de Hz donc 2md d'actions peuvent être exécutées en 1s.
