---
tags:
  - LangagesDeProgs
  - ReactNative
---

Le components `<Pressable>` permets de gérer les interactions tactiles dans une app ReactNative.

- Il permets de créer des boutons ou des zones interactives adapter à nos besoins que ça soit visuel et comportementale.
	- ==> Plus flexible que le [[CC - Button]],

Il fonctionne similairement à une `<View>` : container, même option de style …

Par exemple pour un bouton validez :

```tsx
< Pressable>
	<Ionicons
		name="checkmark-done-circle-outline"
		size={24}
		color="white"
	/>
	<Text>Validez<Text/>
<Pressable />
```

Il peut gérer différentes actions comme :

- `onPress`,
- `onLongPress`,
