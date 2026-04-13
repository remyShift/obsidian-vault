> [!info]- Tags
> #LangagesDeProgs #React 

L'installer puis l'importer :
```javascript
import logger from "redux-logger";
```

puis l'utiliser dans notre `concat` :
```javascript
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
```

`logger` permets de logger comme son nom l'indique, 3 choses :
- le state précédent notre action,
- l'action en question,
- le state après l'exécution de notre action