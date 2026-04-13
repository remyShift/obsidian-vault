> [!info]- Tags
> #LangagesDeProgs #ReactNative #Framework 

## Qu'est-ce qu'Expo Router ?

Expo Router est une bibliothèque de routage pour les applications React Native utilisant Expo. Inspirée de Next.js, elle simplifie le routage grâce à une organisation basée sur les fichiers, tout en offrant des fonctionnalités adaptées aux applications mobiles comme les transitions natives et le deep linking.

---

### Fonctionnalités principales

1. **Routage basé sur les fichiers** :
    
    - Les routes sont définies par la structure des fichiers dans le dossier `app/`.
    - Chaque fichier correspond à une vue ou une page.
    - Par exemple :
        - `app/index.js` → Route `/`.
        - `app/about.js` → Route `/about`.
2. **Routage dynamique** :
    
    - Création de routes dynamiques avec la syntaxe `[param]`.
    - Exemple :
        - `app/user/[id].js` → Route dynamique `/user/:id`.
3. **Stack Navigation automatique** :
    
    - Les routes sont empilées dans un **Stack Navigator** par défaut.
    - Cela permet d’utiliser des animations natives entre les écrans, comme les transitions de type "diapositive".
    - Les stacks prennent automatiquement en charge l’historique de navigation (boutons "Retour" natifs inclus).
    - **Avantage** : Pas besoin de configuration complexe pour profiter des animations ou de la gestion d’état entre les écrans.
4. **Deep Linking** :
    
    - Prend en charge les URLs pour naviguer directement vers des pages spécifiques.
    - Exemples :
        - `myapp://user/123` → Charge le profil de l'utilisateur avec l'ID `123`.
        - Configuration simplifiée via Expo pour activer cette fonctionnalité.
5. **Autres modes de navigation** :
    
    - Expo Router permet aussi l'utilisation de **Tab Navigation** et de **Drawer Navigation** via une organisation spécifique dans les fichiers.
    - Exemples :
        - `app/home.js` pour un onglet.
        - `app/_layout.js` pour un conteneur de navigation.

---

### Organisation des fichiers

1. **Structure basique** :
    
    - `app/index.js` : Page principale, équivalente à `/` en Next.js.
    - `app/about.js` : Route `/about`.
    - `app/user/[id].js` : Route dynamique `/user/:id`.
2. **Ajout d'un Stack personnalisé** :
    
    - Vous pouvez organiser vos routes à l’aide d’un fichier `_layout.js` pour définir un conteneur de navigation.
    - Exemple :
        - `app/_layout.js` :
            
            ```javascript
            import { Stack } from 'expo-router';
            
            export default function Layout() {
              return <Stack />;
            }
            ```
            

---

### Modes de navigation avec Expo Router

1. **Stack Navigation** (par défaut) :
    
    - Chaque écran est empilé dans une pile. Lorsque vous naviguez vers un nouvel écran, celui-ci est empilé au-dessus de l'écran précédent.
    - Vous pouvez personnaliser les options du Stack pour chaque route.
    - Exemple d’un fichier avec options spécifiques :
        - `app/_layout.js` :
            
            ```javascript
            import { Stack } from 'expo-router';
            
            export default function Layout() {
              return (
                <Stack
                  screenOptions={{
                    headerShown: false, // Masquer l'en-tête par défaut
                    animation: 'fade', // Animation personnalisée
                  }}
                />
              );
            }
            ```
            
2. **Tab Navigation** :
    
    - Utilisée pour les barres de navigation en bas de l’écran.
    - Chaque fichier représente un onglet.
    - Exemple :
        - `app/_layout.js` :
            
            ```javascript
            import { Tabs } from 'expo-router';
            
            export default function Layout() {
              return <Tabs />;
            }
            ```
            
        - `app/home.js` et `app/settings.js` : Correspondent aux onglets "Home" et "Settings".
3. **Drawer Navigation** :
    
    - Permet d’ajouter un menu latéral (drawer).
    - Exemple :
        - `app/_layout.js` :
            
            ```javascript
            import { Drawer } from 'expo-router';
            
            export default function Layout() {
              return <Drawer />;
            }
            ```
            
4. **Navigation via les Hooks** :
    
    - `useRouter` : Permet un contrôle programmatique sur la navigation.
        - Exemple :
            
            ```javascript
            import { useRouter } from 'expo-router';
            
            export default function About() {
              const router = useRouter();
            
              return (
                <button onPress={() => router.push('/home')}>
                  Retour à l'accueil
                </button>
              );
            }
            ```
            
    - `Link` : Une alternative déclarative, utile pour les boutons ou liens de navigation simples.
        - Exemple :
            
            ```javascript
            import { Link } from 'expo-router';
            
            export default function Home() {
              return <Link href="/about">Page About</Link>;
            }
            ```
            

---

### Gestion des erreurs et des transitions

1. **Page d’erreur personnalisée** :
    
    - Ajoutez un fichier `app/_error.js` pour capturer toutes les routes non définies.
    - Exemple :
        
        ```javascript
        export default function ErrorPage() {
          return <h1>Erreur 404 - Page introuvable</h1>;
        }
        ```
        
2. **Transitions fluides** :
    
    - Personnalisez les animations des transitions via les options du Stack Navigator.
    - Exemple :
        
        ```javascript
        import { Stack } from 'expo-router';
        
        export default function Layout() {
          return (
            <Stack
              screenOptions={{
                animation: 'slide_from_right',
              }}
            />
          );
        }
        ```
        

---

### Meilleures pratiques

1. **Organisation claire des fichiers** :
    
    - Regroupez les fichiers dans des sous-dossiers logiques :
        - `app/user/[id].js`
        - `app/user/edit.js`
        - `app/settings/`.
2. **Réutilisation des layouts** :
    
    - Utilisez `_layout.js` pour éviter de répéter la configuration du routage ou des headers.
3. **Navigation fluide** :
    
    - Préférez les `Link` pour des interactions simples et `useRouter` pour une logique plus complexe.
4. **Testez le deep linking** :
    
    - Configurez les liens avec Expo pour améliorer l'expérience utilisateur.
5. **Personnalisez vos transitions** :
    
    - Les animations natives rendent l’application plus fluide et agréable.
