---
date: 2026-03-02
type: meeting
projet: "Oli's Lab"
tags:
  - olis-lab
participants:
  - Diego
  - Kyle
  - Michele
lien: https://olislab.slack.com/docs/T06E4T3H87M/F0AHKMQ59EK
---

## Huddle : CMS Payload - Stratégie images & optimisation

---

### Contexte

Diego brief Kyle sur le fonctionnement actuel de la gestion des images dans Payload CMS et l'équipe discute de la stratégie à adopter pour l'intégration avec Next.js. Rémy est mentionné comme référence (il a déjà exploré ces sujets).

---

### État actuel

- Upload d'images configuré sur S3
- À chaque upload, Payload génère **2 versions** : l'originale + une version convertie en **WebP (AVIF)**
- La version convertie garde la **même taille** que l'originale (aucun redimensionnement)
- Le **focal point** (Payload feature) n'est **pas encore activé**

---

### Focal point : comment l'activer

Pour activer le focal point dans Payload, il faut obligatoirement définir des tailles d'image dans la config. Deux options :

#### Option A : Tailles standardisées (image sizes)

Définir des tailles nommées dans le schéma Payload (ex. `desktop`, `thumbnail`).

- À chaque upload : N+1 versions générées (originale + une par taille définie)
- Le focal point devient disponible
- Lors de la consommation : on cible une version spécifique (`image.desktop.url` vs `image.thumbnail.url`)
- **Risque** : si le ratio d'aspect de l'image uploadée ne correspond pas à la taille cible, Sharp va cropper/blank fill selon les options

#### Option B : Resize options (options de recadrage)

Définir des paramètres de redimensionnement sans taille fixe.

- Permet à l'éditeur (Suze, etc.) de cropper manuellement dans l'UI Payload selon des guidelines
- **Michele insiste sur ce point** : sans guidelines de crop, les éditeurs font des crops aléatoires qui cassent le rendu dans les composants. Avoir des resize options avec un aspect ratio standard évite ça.

#### Décision en cours

Diego penche pour **large/medium/small** comme tailles standardisées de départ. Les deux approches peuvent être combinées. Kyle doit investiguer l'intégration avec Next.js avant de trancher.

---

### Intégration Next.js + Sharp

#### Répartition des responsabilités

- **Payload + Sharp** : fait le gros du travail d'optimisation (conversion format, redimensionnement, crop)
- **Next.js `<Image>`** : ajoute une couche d'optimisation supplémentaire à la livraison (compression adaptée au device, lazy loading)
- Kyle : ne pas compter sur Next.js pour faire l'optimisation principale. Payload/Sharp doit déjà fournir des images bien dimensionnées.

#### Progressive loading / blur placeholder

Kyle a vu dans la doc Sharp qu'on peut générer une version ultra-réduite (ex. 10px) floutée de l'image, utilisable comme placeholder pendant le chargement.

- Next.js supporte les `srcset` avec plusieurs définitions de taille → appels progressifs selon la taille d'écran
- Michele confirme : Next.js peut faire des appels différenciés par taille d'image depuis Payload

---

### Prochaines étapes

- Diego va montrer à Kyle comment lancer le CMS localement et tester différentes configs d'images
- Kyle doit explorer en profondeur l'intégration Payload/Sharp → Next.js avant de valider l'approche de sizing
- Rémy (qui a déjà exploré ça) peut faire une démo à Kyle de ce qu'il avait testé

---

### Actions

- [ ] **Diego** - Demo locale à Kyle : comment uploader une image dans Payload et voir les versions générées
- [ ] **Kyle** - Investiguer l'intégration Payload/Sharp avec Next.js Image optimization (blur placeholder, srcset, progressive loading)
- [ ] **Équipe** - Décider des tailles standardisées (large/medium/small ?) avant d'implémenter
- [ ] **Rémy** - Faire une démo à Kyle de ce qu'il avait exploré sur le focal point et les image sizes
