---
tags:
  - LangagesDeProgs
  - ReactNative
---

Le component `<Modal>` de ReactNative permets d'afficher une modal superposer à l'écran.

- Ce composant à besoin d'un state au travers de la props `visible` pour savoir si il doit être affiché ou non.

```jsx
<Modal visible={modalIsVisible}>
	<View>
		<Text>
			Text dans une modale
		<Text/>
		<Button title="Hide Modal" onPress={toggleModal}/>
	<View/>
</Modal>
```

La modal prends différends props comme :

- `animationType`,
