> [!info]- Tags
> #SoftwareCraft #CleanCode #Refacto 

(cf [[L’art du nommage]])

Le soin apporté au nommage est ce qui va apporter le plus de soin et de valeur une base de code et va s’appliquer à l’ensemble des éléments qui porte un nom dans notre code (fichiers, fonctions, class, paramètres, variables …).
- À contrario le code nom nommé comme les blocs de code / les fonctions anonymes n’en font pas partis et nécessiteront une extraction.

La difficulté pour bien nommé est le choix et trouvé le nom le plus pertinent / qui relève au mieux l’intention.

Un bon renommage se fait comme suit :
- identifier l’élément à renommer,
- chercher toutes les occurrences de cet élément dans notre code,
- modifier le nom de l’élément et toutes ses occurrences (avec un meilleur nom qu’initialement),
- relancer les tests pour vérifier que rien à casser,

**NB :** Faire attention que l’élément qu’on veut renommer ne soit pas citer dans un commentaire.