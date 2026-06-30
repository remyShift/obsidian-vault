---
tags:
  - LangagesDeProgs
  - ReactNative
---

Le component `<ScrollView>` permets d'afficher un contenue défilable dans une application ReactNative.

- Il va encapsuler différents composant pour pouvoir scroll.

**NB :** Ça nécessite une hauteur définis mais elle ne doit pas être définis dans le component `<ScrollView>` mais plutôt dans la view parente.

- De plus elle peut avoir du style au même titre qu'une `<View>`,
- On peut aussi imbriqué des `<ScrollView>`,
- On peut cacher aussi la barre de défilement avec `showVerticalScrollIndicator`.

Néanmoins avec une `<ScrollView>` tout les éléments sont affichés au chargement, pour avoir une sorte de scroll infinis ou les éléments sont chargé quand ils doivent être visible il faudra passer via une [[CC - FlatList]].
