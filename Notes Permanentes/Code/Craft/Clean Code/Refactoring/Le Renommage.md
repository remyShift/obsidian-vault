> [!info]- Tags
> #SoftwareCraft #CleanCode #Refacto 

Voir [[L’art du nommage]] pour les principes de fond.

Le soin apporté au nommage est ce qui va apporter le plus de valeur à une base de code et va s'appliquer à l'ensemble des éléments qui portent un nom dans notre code (fichiers, fonctions, classes, paramètres, variables …).
- À contrario le code non nommé comme les blocs de code / les fonctions anonymes n'en font pas partie et nécessiteront une extraction.

La difficulté pour bien nommer est le choix et de trouver le nom le plus pertinent / qui relève au mieux l'intention.

Un bon renommage se fait comme suit :
- identifier l'élément à renommer,
- chercher toutes les occurrences de cet élément dans notre code,
- modifier le nom de l'élément et toutes ses occurrences (avec un meilleur nom qu'initialement),
- relancer les tests pour vérifier que rien n'a cassé,

**NB :** Faire attention que l'élément qu'on veut renommer ne soit pas cité dans un commentaire.
