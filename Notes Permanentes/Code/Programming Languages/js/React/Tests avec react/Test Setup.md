---
tags: [LangagesDeProgs, React, Tests]
---

## Créer le dossier du projet :
```
pnpm create vite --template react-ts  
```
Puis rentrer dans ce dossier nouvellement créer.
## Installer les modules et vitest :

```
pnpm i
```

```
pnpm add -D vitest
```

## Installer les libs :

*(installe en 1 commande les tests des hooks, des composants et sous forme graphique)*

```
pnpm add -D jsdom @testing-library/jest-dom @testing-library/react @vitest/ui
```


## Mettre les types en globals :

*(permets de ne pas avoir a faire les imports pour certains types, dans tsconfing.app.json)*

```json
"types": ["vitest/globals"]
```


## Ajouter les commandes de tests :

*(dans le package.json --> scripts)*

```json
"test": "vitest --globals",
"testui": "vitest --ui --globals",
```

## Permettre l'utilisation de l'environnement jsdom :

*(dans le vite.config.ts)*

```ts
import { defineConfig, UserConfig }  from "vite";
import react from "@vitejs/plugin-react"

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",	
	},
} as UserConfig);
```

Désormais on peut [[Tester un hook]], [[Tester un composant]], [[Tester un no-flash effect en React]] ainsi que [[Mock une API]].