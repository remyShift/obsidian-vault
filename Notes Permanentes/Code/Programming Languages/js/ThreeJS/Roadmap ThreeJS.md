# Roadmap Three.js — De zéro à l'expertise créative

> Inspiré de la structure Three.js Journey, calibré pour toi : tu as les bases en tête mais rouillées. L'objectif n'est pas de mémoriser l'API. C'est de reconstruire l'intuition 3D et de développer un oeil créatif en parallèle.
>
> Règle : **make it work → make it right → make it beautiful**

---

## Comment lire cette roadmap

Chaque phase a :
- Des **concepts** à maîtriser (avec les notes liées)
- Un **projet checkpoint** à compléter avant de passer à la suite
- Un **parallèle craft** : ce que ce chapitre t'apprend sur le travail créatif en général

Les projets ne sont pas optionnels. Ce sont les seuls vrais tests de compréhension.

---

## Phase 1 — Reconstruire les fondations

> Ce que tu as déjà noté mais qui est flou. On repart du début mais vite.

### Concepts

- [ ] La triade scène / caméra / renderer — pourquoi les 3 sont nécessaires
- [ ] Mesh = Geometry + Material, pas juste "un objet"
- [ ] `requestAnimationFrame` et pourquoi c'est une boucle infinie récursive
- [ ] `THREE.Clock` vs `Date.now()` vs `Timer` — la notion de delta time
- [ ] `Object3D` : position, rotation, scale, group
- [ ] `AxesHelper` et `CameraHelper` pour ne pas être aveugle dans l'espace
- [ ] `OrbitControls` avec damping
- [ ] Fullscreen + resize propre avec pixel ratio

### Notes liées
`ThreeJS Intro` | `Animation Intro` | `Manip d'Objet` | `Les Caméras` | `FullScreen & Resizing` | `Debug UI`

### Checkpoint Projet 1 — La Scène de Base
**Construire de zéro, sans copier les notes :**
- Une scène avec fond sombre
- Un cube qui tourne en continue (framerate-independent avec Clock)
- Une sphere à coté avec OrbitControls fonctionnels + damping
- Un panneau lil-gui avec : vitesse de rotation, couleur du cube, toggle wireframe
- Fullscreen au double-click, resize propre
- AxesHelper visible uniquement en mode debug

> Ne passe pas à la Phase 2 si tu dois ouvrir les notes pour faire ce projet.

### Parallèle craft
Mettre en place une scène c'est exactement comme poser les fondations d'un projet client : si le setup est bancal (resize cassé, pixel ratio ignoré, pas de debug), tout le reste sera douloureux. Les bons artisans préparent leur espace de travail avant de commencer.

---

## Phase 2 — Matière et lumière

> La différence entre un cube rouge et quelque chose qui ressemble à quelque chose.

### Concepts

- [ ] Les types de textures : color, alpha, normal, height, roughness, metalness, AO
- [ ] `TextureLoader` et `LoadingManager`
- [ ] UV mapping — pourquoi une texture peut être étirée ou mal placée
- [ ] PBR (Physically Based Rendering) — le standard actuel, pourquoi il existe
- [ ] `MeshBasicMaterial` vs `MeshStandardMaterial` vs `MeshPhysicalMaterial`
- [ ] `MeshMatcapMaterial` pour des rendus stylisés sans lumière
- [ ] `AmbientLight`, `DirectionalLight`, `PointLight`, `SpotLight`
- [ ] Performances des lumières : lesquelles coûtent cher et pourquoi
- [ ] `LightHelper` pour ne pas positionner à l'aveugle
- [ ] Shadow maps : `castShadow`, `receiveShadow`, `shadow.mapSize`, near/far de la shadow camera
- [ ] Baking shadows : quand et pourquoi ne pas calculer les ombres en temps réel

### Notes liées
`Textures` | `Materials` | `Lights` | `Shadows`

### Checkpoint Projet 2 — La Salle Éclairée
**Construire :**
- Un plan horizontal (le sol) + 3 objets différents (sphere, cube, tore)
- Chaque objet a un `MeshStandardMaterial` avec au moins color + roughness + metalness
- Une `DirectionalLight` qui projette des ombres nettes sur le sol
- Une `PointLight` colorée qui tourne autour de la scène (animée dans le tick)
- lil-gui pour tweaker les intensités et la roughness en temps réel
- Shadow map optimisée (mapSize 1024, near/far bien ajustés)

### Parallèle craft
La lumière est ce qui rend les choses réelles. En design, en photo, en 3D, c'est toujours vrai. Avant d'ajouter plus de géométrie, les bons artistes comprennent d'abord la lumière. Un cube bien éclairé est plus intéressant qu'une scène complexe mal éclairée.

---

## Phase 3 — L'espace et ses règles

> Comprendre comment l'espace 3D fonctionne vraiment, pas juste en surface.

### Concepts

- [ ] `BufferGeometry` — vertices, faces, attributs
- [ ] `Float32Array` et `BufferAttribute` — pourquoi des tableaux typés
- [ ] Géométrie custom : construire un triangle, puis des formes quelconques
- [ ] `PerspectiveCamera` en profondeur : FOV, near, far, aspect ratio — l'impact de chaque paramètre
- [ ] `OrthographicCamera` — quand l'utiliser et pourquoi
- [ ] Quaternion vs Euler — juste comprendre que ça existe et que le quaternion évite le gimbal lock
- [ ] `raycaster` : principe, `intersectObjects`, distance, point de collision
- [ ] Raycaster + mouse : coordonnées normalisées (-1 à 1), `setFromCamera`
- [ ] Hover et click sur des objets 3D

### Notes liées
`Geometries` | `Les Caméras` | `Raycaster`

### Checkpoint Projet 3 — L'Explorateur Interactif
**Construire :**
- Une grille de 20 cubes disposés en matrice 4x5
- Chaque cube a une couleur aléatoire au chargement
- Au hover : le cube survolé s'éclaircit
- Au click : le cube cliqué change de couleur de manière permanente
- La caméra orbite autour de la grille (OrbitControls)

### Parallèle craft
L'interactivité ne s'ajoute pas à la fin, elle se conçoit dès le départ. Exactement comme en UX : savoir où l'utilisateur va pointer avant de commencer à construire. Le raycaster est l'oeil de l'expérience.

---

## Phase 4 — Importer le monde réel

> Travailler avec des assets vrais, pas juste des primitives.

### Concepts

- [ ] Formats 3D : GLTF, GLB, Draco — différences, quand utiliser quoi
- [ ] `GLTFLoader` : la structure de `gltf.scene`, `gltf.animations`, `gltf.cameras`
- [ ] `DRACOLoader` : le coût de la compression vs le gain en poids
- [ ] `AnimationMixer`, `AnimationClip`, `AnimationAction`
- [ ] Environment maps : `RGBELoader`, HDR, équirectangulaire
- [ ] `scene.environment` vs `scene.background`
- [ ] `scene.environmentIntensity`, blurriness, rotation
- [ ] Tone mapping : `ACESFilmicToneMapping`, exposition
- [ ] Antialiasing : MSAA vs SSAA, `antialias: true`
- [ ] Rendu réaliste : la checklist (toneMapping + envMap + antialiasing + ombres)

### Notes liées
`Import Modèle` | `Environment map` | `Rendu Réaliste`

### Checkpoint Projet 4 — Le Showcase de Produit
**Construire :**
- Importer un modèle GLTF de ton choix (chercher sur Sketchfab)
- Une environment map HDR comme fond et source de lumière principale
- Tone mapping ACES + antialiasing activé
- OrbitControls pour tourner autour du modèle
- Si le modèle a des animations : un bouton pour les jouer / stopper
- lil-gui : exposition, blurriness du fond, rotation de l'env map

> Ce projet doit avoir l'air professionnel. Si ce n'est pas le cas, comprendre pourquoi avant de continuer.

### Parallèle craft
Importer un asset c'est comme intégrer le travail de quelqu'un d'autre dans ton projet. Il faut comprendre ce qu'il contient, le respecter, et l'adapter à ton contexte. C'est une compétence de collaboration, pas juste technique.

---

## Phase 5 — À grande échelle

> Des milliers d'éléments. Le début de ce qui impressionne.

### Concepts

- [ ] `Points` vs `Mesh` — la différence fondamentale
- [ ] `PointsMaterial` : `size`, `sizeAttenuation`, `color`, `map`, `alphaMap`
- [ ] `BufferGeometry` custom pour les particules
- [ ] Animer les particules : modifier `positions.array` dans le tick + `needsUpdate`
- [ ] `3D Text` avec `FontLoader` + `TextGeometry`
- [ ] Centrage du texte : `computeBoundingBox` vs `.center()`
- [ ] Bevel et ses paramètres : thickness, size, offset, segments

### Notes liées
`Particules` | `3D Text`

### Checkpoint Projet 5 — La Galaxie
**Construire :**
- Un générateur de galaxie spirale en particules (8000-50000 points)
- Paramètres dans lil-gui : nombre de particules, rayon, branches, spin, randomness, couleur intérieure / extérieure
- La galaxie se régénère quand on change un paramètre (dispose propre de la geometry et du material avant de recréer)
- La caméra tourne lentement autour de la galaxie automatiquement

> Ce projet teste si tu maîtrises les BufferGeometry customs et le dispose(). Si tu oublies le dispose tu auras des memory leaks.

### Parallèle craft
Penser en systèmes plutôt qu'en objets individuels. La galaxie n'est pas 50000 objets, c'est un seul système avec des règles. En code comme en design : chercher les patterns plutôt que les cas particuliers.

---

## Phase 6 — La physique

> Quand les objets ont du poids.

### Concepts

- [ ] Le principe des deux mondes : world physique (Cannon) + rendu (Three.js)
- [ ] `CANNON.World`, gravité, `world.step()`
- [ ] `Body`, `Shape`, `mass` — la différence entre statique (mass 0) et dynamique
- [ ] `SAPBroadphase` et `allowSleep` pour les performances
- [ ] `applyForce`, `applyImpulse`, `applyLocalForce`
- [ ] Synchroniser positions Cannon → Three.js dans le tick
- [ ] Sounds on collide avec `addEventListener('collide', ...)`
- [ ] Nettoyage propre : `world.removeBody`, `scene.remove`, retirer les event listeners

### Notes liées
`Physics`

### Checkpoint Projet 6 — La Piscine à balles
**Construire :**
- Un sol + 4 murs (bodies statiques)
- Un bouton "lancer" qui crée une sphere à une position aléatoire en hauteur
- La sphere tombe et rebondit avec de la physique réaliste (restitution)
- Un son de collision au contact avec le sol (fréquence proportionnelle à l'intensité du choc)
- Un bouton "reset" qui supprime toutes les spheres proprement (body + mesh + event listeners)

### Parallèle craft
Le monde physique invisible qui pilote le rendu visible. C'est une métaphore utile en architecture logicielle : la logique métier (world) est séparée du rendu (Three.js). Ce qui ne se voit pas est souvent ce qui décide de tout.

---

## Phase 7 — Shaders : parler directement au GPU

> Le saut qualitatif le plus important. Tout ce qui est vraiment original en creative dev passe par là.

### Concepts à acquérir (ce chapitre n'existe pas encore dans tes notes, à construire)

- [ ] Qu'est-ce qu'un shader : vertex shader vs fragment shader
- [ ] GLSL : les types de base (float, vec2, vec3, vec4), les fonctions utiles (mix, clamp, smoothstep, sin, cos)
- [ ] `ShaderMaterial` vs `RawShaderMaterial`
- [ ] `uniforms` : passer des données JS → GLSL (temps, couleur, souris)
- [ ] `varyings` : passer des données vertex shader → fragment shader
- [ ] `attributes` : données par vertex (position, uv, normal)
- [ ] Écrire un shader de dégradé basique
- [ ] Écrire un shader de vague (sin + uniforms de temps)
- [ ] Noise GLSL : classic noise, simplex noise — créer de l'organique

### Checkpoint Projet 7 — L'Eau Vivante
**Construire :**
- Un plan subdivisé (128x128 segments minimum)
- Un `ShaderMaterial` custom
- Vertex shader : vagues animées avec sin + noise + uniform temps
- Fragment shader : couleur qui dépend de la hauteur du vertex (varyings)
- Uniforms tweakables dans lil-gui : vitesse, amplitude, couleur haute/basse

> Ce projet va être difficile. C'est normal. Le shader n'est pas une feature Three.js, c'est un autre langage.

### Parallèle craft
Les shaders sont l'équivalent de travailler directement avec le matériau brut plutôt qu'avec un outil qui l'abstrait. Comme écrire du CSS custom plutôt qu'utiliser Tailwind, mais en x10. La contrainte révèle le contrôle.

---

## Phase 8 — Post-processing et polish

> La différence entre un bon rendu et un rendu qui marque.

### Concepts à acquérir

- [ ] `EffectComposer` et `RenderPass`
- [ ] `UnrealBloomPass` : bloom sélectif
- [ ] `GlitchPass`, `DotScreenPass` pour des effets stylisés
- [ ] Écrire un custom `ShaderPass`
- [ ] Performance avec le post-processing : draw calls, résolution

### Checkpoint Projet 8 — Le Portail
**Construire :**
- Une scene avec un objet central lumineux (baked light texture simulée)
- Un bloom sur les parties lumineuses seulement
- Un léger effet de vignette custom (ShaderPass)
- 60fps constants (profiler avec `Stats.js`)

---

## Phase 9 — Aller plus loin (en cours)

> Ce qu'on n'a pas encore dans les notes et qu'on construira ensemble.

- [ ] React Three Fiber (R3F) : quand et pourquoi migrer depuis vanilla
- [ ] `drei` : les helpers qui sauvent du temps
- [ ] Instancing : `InstancedMesh` pour des milliers d'objets sans baisser les performances
- [ ] `LOD` (Level of Detail)
- [ ] `dispose()` correctement : le guide complet de ce qu'il faut libérer
- [ ] Raymarching : rendre des volumes sans geometry
- [ ] Procedural geometry : générer des formes par code
- [ ] GPGPU : utiliser le GPU pour calculer des positions (particules avancées)

---

## Tableau de progression

| Phase | Sujet | Status | Projet |
|-------|-------|--------|--------|
| 1 | Fondations | A revoir | Scène de Base |
| 2 | Matière et lumière | A revoir | Salle Éclairée |
| 3 | Espace et interactivité | A revoir | Explorateur Interactif |
| 4 | Assets et rendu réaliste | A revoir | Showcase Produit |
| 5 | Particules et texte 3D | A revoir | Galaxie |
| 6 | Physique | A revoir | Piscine à balles |
| 7 | Shaders | Non commencé | Eau Vivante |
| 8 | Post-processing | Non commencé | Le Portail |
| 9 | Expert | Non commencé | TBD |

---

## Règles de session

1. On ne passe pas à la phase suivante sans avoir terminé le projet checkpoint
2. Si un projet prend plus d'une session, c'est que les bases de la phase précédente ne sont pas solides
3. Le lil-gui est obligatoire sur chaque projet. Tweaker en temps réel c'est apprendre par le feedback direct
4. Commenter le code uniquement pour les parties non évidentes. Pas de comment-spam
5. Chaque projet doit tourner sans erreur console avant d'être considéré terminé

---

*Note créée avec Bruno — Three.js Journey, Phase de re-démarrage*
*Basé sur les notes existantes : 19 fichiers couvrant les Phases 1-6*
