> [!info]- Tags
> #LangagesDeProgs #ReactNative #Framework 

React Native est un framework basé sur [[React Basics|React]] pour du développement mobile le plus proche possible du développement mobile natif.
- Son écosystème, notamment avec Expo lui permette d'être assez simple d'utilisation.
  
## Mise en place :

Créons notre projets React Native avec expo :

```
npx create-expo-app@latest
```


Ensuite il nous faut EAS CLI (Expo Application Services Command Line Interface) est un outil de ligne de commande mis à disposition par Expo qui nous permets de build notre app, lancer un serveur local etc etc ...
- Tu trouveras [[Expo CLI|ici]] les commandes courantes et utiles.

```
npm install -g eas-cli
```


Une fois fais on va lier notre compte Expo à cette ligne de commande :

```
eas login
```


Il faut ensuite configurer EAS pour notre app :

```
eas build:configure
```

**NB :** seulement si on veut voir le développement sur notre iphone. Si on veut passer via un appareil Android ou un émulateur sur notre machine il faut se référer à ce [lien](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=physical&mode=development-build).
- Il nous faut ensuite créer un *Provisioning Profile Ad Hoc*. C'est ce qui permets d'utiliser notre app en local sur notre iphone par exemple, sans passer par l'app store.

```
eas device:create
````


Ensuite selon l'environnement de développement qu'on a choisi (dans mon cas sur mon Iphone) on peut lancer le build de notre app :

```
eas build --platform ios --profile development
```

**NB :** Il faudra avoir l'iphone en mode développeur.


Une fois le build finis un QR Code apparaîtra dans le terminal il faudra le scanner pour télécharger notre app sur notre Iphone sans passer via l'app store. Puis il faudra lancer le serveur :

```
npx expo start
```

Une fois fais on scan le QR Code du serveur et nous voilà sur l'app ! 🎉

On peut exécuter cette commande pour supprimer la boilerplate qui s'installe automatiquement lorsque on crée le projet.

```
npm run reset-project
```

---


- Le routing sur ReactNative est gérer grâce à [[Expo Router]] qui ressemble beaucoup à celui de NextJS.
- ReactNative étant basé sur React fonctionne aussi avec des components, mais il est en fournis certains qui sont des [[Core Components]].