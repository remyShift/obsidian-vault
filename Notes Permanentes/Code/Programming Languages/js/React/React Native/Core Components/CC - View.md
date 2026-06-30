---
tags:
  - LangagesDeProgs
  - ReactNative
---

Le components `<View>` est un des composants principaux de ReactNative car il sert de container au même titre que `<div>` en HTML.

- Il va permettre d'englober d'autres éléments pour les organiser à l'écran et structurer ainsi notre interface.

**NB :** Étant en mobile la disposition par défaut est en colonne.

- Il faudra caster la flex direction en row pour forcer le style en ligne.

Pour qu'une `<View>` prenne tout l'espace disponible de son élément parent il faut lui mettre `flex: 1`.

```tsx
<View className="justify-between p-4">
 //Some other components
</View>
```
