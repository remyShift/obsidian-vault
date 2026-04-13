> [!info]- Tags
> #LangagesDeProgs #ReactNative #Framework 

Le `<Switch />` component fonctionne comme un interrupteur on/off (// checkbox), c'est un component controlé et aura donc besoins d'un state pour gérer son état.

```tsx
const [isEnabled, setIsEnabled] = useState(false);

return {
	<Switch value={isEnabled} onValueChange={setIsEnabled}/>
}
```

On peut exécuter une action grâce au prop `onChange` qui permets de récupérer l'event contrairement à `onValueChange`, et y a différentes props pour gérer le style.