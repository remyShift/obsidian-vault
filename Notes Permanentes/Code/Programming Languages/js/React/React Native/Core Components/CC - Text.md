---
tags:
  - LangagesDeProgs
  - ReactNative
---

En ReactNative on ne peut pas mettre du texte en dur dans un component. On est obliger de passer par le le component `<Text />`.

- C'est l'élément par défaut pour afficher du text en ReactNative.
- Contrairement au composant `<View>` qui est par défaut flexbox le composant `<Text />` lui est styliser en inline.
	- On peut évidemment le styliser avec des propriétés propre aux éléments textuels.

```tsx
<Text className="text-center"> Toto prends un bain </Text>
```
