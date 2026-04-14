---
tags: [LangagesDeProgs, React]
---

```js
export const fruits = createSlice({
	name: "fruits",
	initialState,
	reducers: {

	},
	extraReducers: {
		["fruitsCart/addOne"](state, action) {
			console.log("Hello from extra reducer");
		}
	},
})```

L'extra reducer permet de réagir au changement du state lié à un autre reducer et donc d'agir aussi en fonction de ce dernier. L'extra reducer va se déclencher aussi lorsque l'action requise va déclencher le reducer du store `fruitsCart` nommé `addOne`.