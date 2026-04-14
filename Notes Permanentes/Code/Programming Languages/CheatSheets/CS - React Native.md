---
tags: [LangagesDeProgs, CheatSheet, ReactNative]
---

[Fiche de Révision React Native](https://www.amaliamaturana.com/fr/guide-de-revision-react-native-preparation-entretien-technique/)

# 📱 Fiche de révision React Native (2025)

## 1. Fondamentaux
- **React Native** = React + API natives (iOS/Android)
- Écrit en JavaScript/TypeScript, rendu via des **bridges** natifs.
### Composants de base :
```tsx
import { View, Text, TextInput, Button, ScrollView, FlatList, Image } from 'react-native';
````
### Style :
```tsx
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold' },
});
```
## 2. Hooks essentiels
- `useState`, `useEffect`, `useCallback`, `useRef`, etc. (identiques à React Web)
- `useWindowDimensions()` : dimensions dynamiques
- `useColorScheme()` : thème clair/sombre
## 3. Navigation 📍
**Librairie :** [React Navigation](https://reactnavigation.org/)
```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```
- Pour gérer les paramètres de route :
```tsx
const route = useRoute();
const navigation = useNavigation();
navigation.navigate('Profile', { userId: 42 });
```
## 4. Gestion de formulaire & validation ✅
```tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});

<Controller
  control={control}
  name="email"
  render={({ field }) => (
    <TextInput {...field} placeholder="Email" />
  )}
/>
```
## 5. Accès aux API & données
### Appels HTTP :
```ts
import axios from 'axios';
const { data } = await axios.get('/api/products');
```
### Données persistées (offline) :
- `@react-native-async-storage/async-storage`
- `react-query` ou `tanstack/query` (avec persistance)
## 6. Styling 📐
- **Flexbox** par défaut
- **Unité :** _sans px_ (juste `10`), responsive = `Dimensions` ou `useWindowDimensions`
- Librairies utiles :
    - `tailwind-rn`
    - `nativewind`
    - `styled-components/native`
## 7. Accès natif / Permissions
- Utiliser les APIs RN :
```tsx
import * as ImagePicker from 'expo-image-picker';
const result = await ImagePicker.launchCameraAsync();
```
- Pour Android ≥ 13 (API 33) / Android 14+ :
    - Vérifier les **permissions dynamiques**
    - Ajouter dans `AndroidManifest.xml`
    - Gérer le `targetSdkVersion = 34` pour août 2025
## 8. Nouvelle architecture (2025)

|Élément|Description|
|---|---|
|**JSI (JavaScript Interface)**|Appels natifs sans bridge classique|
|**Fabric**|Nouveau moteur de rendu plus rapide|
|**TurboModules**|Chargement natif à la demande|
|**Codegen**|Génération automatique de bindings TS ↔️ natif|

### Activation :
- Depuis RN 0.74+, Fabric est activé par défaut (sur Expo SDK 51+ aussi)
- Créer un module natif avec `react-native-codegen`
## 9. Tests
- **Unit tests** : `jest`
- **Component tests** : `@testing-library/react-native`
- **E2E tests** : `Detox`
```tsx
test('renders correctly', () => {
  const { getByText } = render(<Welcome name="Remy" />);
  expect(getByText('Welcome, Remy')).toBeTruthy();
});
```
## 10. Build & Déploiement 🛠️
### Expo :
- Dev rapide, OTA updates, build cloud
- Expo EAS → builds iOS/Android (sans Xcode)
- Fichier `eas.json` pour config
### Bare workflow :
- Contrôle total via Xcode + Gradle
- Compatible avec modules natifs customs
### Android :
- `targetSdkVersion: 34` requis août 2025 (Android 14+)
- Signer avec `.keystore` + upload sur Google Play
### iOS :
- Utilise `.xcworkspace` (Pods)
- Provisioning profile + Apple Developer
## 11. Performance & bonnes pratiques ⚡
- Éviter `inline functions`, `re-renders`, `Image` non optimisées
- Utiliser :
    - `React.memo`, `useMemo`, `useCallback`
    - `FlashList` (alternative FlatList performante)
    - `reanimated` pour animations fluides
    - `useMMKV` ou `Jotai`/`Zustand` natifs (évite AsyncStorage lent)

## 12. Patterns modernes
- **Custom hooks** pour logique réutilisable
- **Context** pour état global léger (auth, thème)
- **Zustand / Jotai** pour global state moderne
- **Feature-based architecture** : `features/`, `components/`, `screens/`, `hooks/`, etc.
## 13. Questions d'entretien React Native 🧠
### Junior :
- Différence entre React & React Native ?
- À quoi sert Flexbox ?
- Comment styliser un composant ?
- useEffect : quand l’utiliser ?
### Intermédiaire :
- FlatList vs ScrollView ?
- Comment fonctionne React Navigation ?
- useCallback vs useMemo ?
- Gestion d’état dans une app mobile ?
### Senior :
- Avantages de Fabric & TurboModules ?
- Comment optimiser les performances UI ?
- Quelles stratégies pour offline + sync ?
- Comment gérer les builds iOS/Android + versionning ?
## ✅ Résumé à retenir
- **RN = React + APIs natives** → JS -> bridge -> natif (Fabric/JSI en 2025)
- Hooks identiques à React + hooks natifs supplémentaires
- Navigation = React Navigation
- Forms = React Hook Form + Zod
- Performance = éviter re-renders, préférer MMKV/Zustand/FlashList
- 2025 : compatibilité Android 14+ et archi nouvelle activée par défaut


**NB :** Pour aller plus loin // On peut rajouter une surcouche à ReactNative qui est [[CS - React Native + Expo |expo]] qui va permettre de se simplifier la vie sur différentes choses mais en même temps nous cloisonner dans l'écosystème d'expo qui peut être contraignant et coûteux.