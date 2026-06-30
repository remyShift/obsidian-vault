---
tags: [LangagesDeProgs, CheatSheet, ReactNative]
---

## 🚀 React Native avec Expo (2025) - Complément

### 1. Qu'est-ce qu'Expo ?

- Plateforme & ensemble d'outils pour développer en React Native plus rapidement
- Gestion simplifiée du build, des API natives & OTA updates
- Expo SDK version 51+ compatible React Native 0.74+ (avec nouvelle archi activée par défaut)

### 2. Avantages Expo

- Pas de configuration native complexe (pas besoin Xcode/Android Studio au départ)
- Build cloud avec EAS (Expo Application Services) → iOS & Android
- Mise à jour OTA (Over The Air) facile pour déployer des correctifs sans passer par les stores
- APIs natives intégrées (caméra, localisation, notifications, etc.) prêtes à l'emploi
- Support TypeScript natif & Expo Router (file-based routing)

### 3. Limitations & cas où passer au Bare workflow

- Pas de support natif custom (modules non supportés dans Managed workflow)
- Certaines fonctionnalités très spécifiques ou natives complexes peuvent nécessiter un eject (`expo prebuild`)
- Poids de l'app plus gros qu'une app RN bare minimale
- Nécessite Internet pour le build EAS (cloud)

### 4. Architecture & builds

- Managed workflow → Expo gère tout nativement, on code en JS/TS
- Bare workflow → eject pour intégrer du code natif custom (Android/iOS)
- `expo prebuild` génère les fichiers natifs (Xcode/Gradle)
- Config via `app.json` / `app.config.js` pour permissions, splash screen, icônes, etc.

### 5. Principales commandes Expo

```bash
expo start                # démarre le serveur de développement (Metro bundler)
expo build:android        # build Android cloud (deprecated, remplacé par EAS)
eas build --platform ios  # build iOS dans le cloud via EAS
eas submit                # soumission aux stores (App Store, Google Play)
expo publish              # déploie une mise à jour OTA
```

### 6. Gestion des permissions & modules natifs

- Expo fournit un wrapper unifié pour permissions
- Permissions déclarées dans app.json (ex: "android.permissions": ["CAMERA", "ACCESS_FINE_LOCATION"])
- Modules natifs Expo (Camera, Location, Notifications…) utilisent JSI/TurboModules nativement
	Pour modules non supportés → eject en Bare workflow

### 7. Performance & optimisation avec Expo

- Utiliser expo-updates pour OTA,
- Préférer les APIs asynchrones Expo (Camera, FileSystem, SecureStore)
- Minimiser les images / assets pour réduire la taille du bundle
- Support React Native Reanimated & Gesture Handler natifs

### 8. Expo Router

- File-based routing inspiré de Next.js
- Simplifie la navigation avec dossiers & fichiers .tsx
- Supporte les layouts, modals, nested routes

### 9. Tests et débogage

- Expo Go app → tester rapidement sur appareil réel
- Intégration avec react-native-testing-library et jest
- Debug JS via Chrome DevTools / Flipper

### 10. Stratégies de déploiement

- En Managed workflow → builds cloud avec EAS (plus rapide, sans config native)
- OTA updates → correction rapide sans re-publier sur App Store/Play Store
- En Bare → contrôle total mais complexité accrue

### 11. À retenir

| Point clé            | Expo Managed        | Expo Bare                |
| -------------------- | ------------------- | ------------------------ |
| Configuration native | Aucune (tout géré)  | Manuelle (Xcode, Gradle) |
| Modules natifs       | Limités au SDK Expo | Illimité                 |
| Build                | Cloud (EAS)         | Local + cloud            |
| Mise à jour OTA      | Oui                 | Oui                      |
| Complexité projet    | Faible              | Moyenne à élevée         |

#### 🧠 Questions fréquentes Expo

- Comment déployer une mise à jour OTA ?
- Quand faut-il ejecter Expo ?
- Quelles limitations dans le Managed workflow ?
- Comment utiliser les permissions dans Expo ?
- Expo supporte-t-il React Native nouvelle architecture ?
