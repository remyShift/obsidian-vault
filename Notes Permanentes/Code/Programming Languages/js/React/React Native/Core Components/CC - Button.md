> [!info]- Tags
> #LangagesDeProgs #ReactNative #Framework 

Le component `<Button />`permets d'ajouter facilement des boutons fonctionnels dans une application ReactNative. Il prends 1 seule propriété obligatoire qui est le title (le texte display dans le bouton).

```tsx
<Button title="Button"/>
```

**NB :** Selon les plateformes l'apparence par défaut peut changer et ça reste un bouton par défaut.
- Si on veut plus de personnalisation il faudra plutôt opter pour le [[CC - Pressable]].

Il peut prendre d'autre attribut, falcutatif comme :
- `disabled`,
- `accessibilityLabel`,
- `onPress` (== onClick),