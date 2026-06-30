---
tags: [SoftwareCraft, CodeLegacy, Tests]
---

Les dépendances peuvent avoir plusieurs formes et certaines peuvent être plus discrète que d'autre d'où l'intérêt de savoir les identifier efficacement.

## Dépendances vers une ressource externe

C'est la dépendance la plus fréquente. Elle peut avoir différentes formes :

- BDD,
- Gestionnaire d'authentification,
- …

L'accès à ces composants ne peut pas avoir lieu dans n'importe quel contexte (besoin d'une connexion réseau, autorisations nécessaire …).

Il faut aussi veiller à ne pas atteindre directement notre code de prod de ces dépendances depuis nos tests, au risque d'avoir des modifications dommageables.

## Dépendances multiples

Il peut arriver que des composants se retrouvent mêlées à beaucoup de dépendances, ce qui traduit un manque claire de design.

- Les tests seront impossible à écrire car demandant une initialisation laborieuse.

## Dépendances vers des calculs non déterministes

Certaines dépendances peuvent avoir des effets qui ne sont pas clairement identifiables. Comme des appels à des fonctions dont le retour peut varier avec les mêmes paramètres d'entrées.

- On a donc des tests non déterministes et non repérables.

Exemple courant : Récupération de la date ou de l'heure actuelle / génération aléatoire.

L'accès à des données mis en cache peut aussi poser problème : le résultat du premier appel sera différent des suivants. Et aussi l'utilisation de données spécifiques à l'environnement d'exécution (si on se base sur des propriété du système ou des variables d'environnement).

## Dépendances vers un état global partagé

Le design pattern Singleton est plutôt compliqué à tester :

- l'état d'un singleton survit au test qui l'utilise,
	- donc chaque tests à un impact sur ceux qui suivent et le comportement peut diffère selon l'ordre d'exécution des tests.
	- on perds donc le côté de indépendant de FIRST.

C'est une problématique qui ne se limite pas qu'au singleton mais également lorsqu'on manipule un état global partagé entre différents composants.

[… A compléter]
