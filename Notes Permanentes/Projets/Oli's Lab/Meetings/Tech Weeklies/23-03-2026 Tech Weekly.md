---
date: 2026-03-23
type: meeting
projet: "Oli's Lab"
tags:
  - tech-weekly
  - olis-lab
participants:
  - Michele
  - Kyle
  - Patrick
  - Lucas
  - Ante
  - Remy
lien: https://www.notion.so/olislab/Tech-Weekly-32c4bf4c7fa1806eab9dd46768c54ed1
---

## Tech Weekly - 23 mars 2026

---

### Dashboard & gestion des tâches

Michele a présenté la nouvelle vue dashboard dans Notion :

- Vue par assignee avec progression des projets (couleurs : vert = done, blocks, in review, in progress, not started)
- Vue "workload" : nombre de tâches par statut par développeur
- Vue "PRs to review" : groupées par priorité de tâche
- Vue "My Tasks" : tâches assignées à soi, filtrables par projet, par date

**Changements de template :**

- Le champ "size" est retiré du template de création de tâche (reste visible dans la vue mais pas dans le formulaire par défaut)
- **Bonne pratique à adopter :** ajouter une due date quand on commence à travailler sur une tâche (pas forcément à la création), pour faciliter la priorisation des reviews

---

### Event Tracking & Analytics

#### Statut critique

- Le tracking des événements du core user journey (view item, add to bag, checkout, purchase) doit fonctionner correctement sur **PostHog, Google Analytics et Meta** en même temps
- Raison : les campagnes publicitaires (Meta, GA) nécessitent que les données arrivent dans leurs outils propres pour monitorer les dépenses et ajuster les budgets. PostHog seul ne suffit pas.

#### Problème Apple Pay

- Le purchase event via Apple Pay ne passe pas correctement le `GA session ID` et le `client ID` vers le serveur
- Ces deux IDs sont stockés dans les cookies côté client, mais ne sont pas transmis correctement lors du flow Apple Pay
- Hypothèse : utiliser les cookies pour passer ces IDs du client au serveur est peut-être le problème sous-jacent (d'autant qu'on migre vers une solution cookie différente côté backend)
- Kyle et Rémy ont testé deux approches : analytics direct et service-based tag passing. Les deux sont bloquées, investigation nécessaire.
- Pour tester Apple Pay : pas possible en local facilement, nécessite de déployer sur stage à chaque changement. Solution : squash des commits à la fin.
- **Nouveau checkout v2 bloqué** en attendant que ce fix soit en place

#### Plan de Michele cette semaine

- Investiguer tous les gaps d'events (bag, checkout, purchase) sur GA et Meta
- Vérifier que les events de stage et production ne se mélangent pas dans Meta (déjà corrigé pour GA)
- Call avec Kyle pour le fix Apple Pay
- Approche hybride envisagée : le nouveau checkout (API v2) utilise la nouvelle logique d'event, la CRA legacy garde l'ancienne méthode pendant la transition, les deux streams coexistent sans se mélanger
- **Date cible :** event tracking entièrement fonctionnel avant fin avril (quand le core user journey bascule sur Next.js)

---

### CMS Migration (Payload)

#### Statut des PRs

- PRs en attente de merge (dans l'ordre de dépendance) :
  1. Brands collection (Payload)
  2. Bridge script brands (sync Payload → MongoDB)
  3. Products collection (Payload)
  4. Bridge script products
- Rémy a refactorisé le seed script et traite les problèmes de schéma (notamment retrait du champ `images` en attendant que la media collection soit définie)
- **Bloquant :** la media collection et la définition des tailles d'images n'est pas encore finalisée. Michele pensait que c'était résolu, mais Diego l'a passée en Draft. Réunion prévue demain entre Rémy, Michele (et Diego ?).

#### Architecture du bridge script

- Actuellement : script custom par collection (brands, products)
- Michele veut aller vers un **script générique avec mapping custom par collection** :
  - Le script de base est abstrait (logique de sync commune)
  - Chaque collection fournit son propre mapping (ex. `product_title` → `title`)
  - Si pas de mapping nécessaire, on passe les clés/valeurs telles quelles
  - Si mapping nécessaire (catégories, sous-catégories, traductions), on passe un objet de mapping custom
- Avantage : ajouter une nouvelle collection = juste définir le mapping, pas réécrire toute l'infrastructure
- Cas problématique : catégories et sous-catégories (structure très différente entre CMS et legacy app, sous-catégories hardcodées dans la CRA, pas de collection dédiée → mapping custom obligatoire)

#### Dépendance Next.js

- Kyle rappelle : la migration de la product display page vers Next.js dépend de la **products collection mergée** et de la **media management résolue**
- Ces deux choses doivent avancer en priorité cette semaine

#### Tests CMS

- Rémy a créé une tâche pour les tests d'intégration CMS : tests sur l'admin UI, les hooks (URL building, validation d'unicité des sous-catégories), et exploration des options d'automated testing
- Payload fournit déjà des tests par défaut dans le projet (admin UI inclus)

---

### Product Recommendation (Patrick)

#### PRs en review

- Séparation du workaround `skin_type` enum : extraite dans sa propre PR
- Formulaire de recommendation déplacé sur une page dédiée (suggestion de Diego)

#### Reste à faire

- **Skin concerns automatiques** : actuellement hardcodées dans le formulaire. À rendre dynamiques pour qu'un nouveau concern soit automatiquement disponible dans le form.
- Petite correction de wording front-end : Patrick va valider avec Ante si c'est nécessaire

---

### Scoring Ingredient List / INCI Score (Patrick)

- Nouvelle feature : l'utilisateur colle une liste d'ingrédients (INCI) et reçoit un score
- Découpé en petites PRs séquentielles :
  1. Matching backend (en review)
  2. Matching frontend (à faire)
  3. Scoring logic (à faire)
- Stratégie : créer les branches en cascade (branche depuis branche) pour ne pas attendre les approvals avant d'avancer, mais merger dans l'ordre
- Diego absent cette semaine : pas de review possible avant son retour. Target : **mercredi prochain**
- Patrick ajoute Kyle et Michele comme reviewers sur la PR d'optimisation frontend SEO

---

### Performance & Optimisation (Lucas)

#### Audit Shop All

- Lucas a terminé un audit complet des requêtes sur la page Shop All
- Document détaillé des bottlenecks de performance créé

#### Assets publics

- Nettoyage des assets du dossier `/public` terminé
- Liste des images actuellement utilisées documentée dans Notion (fichier zip fourni à Michele)
- **Ce qui peut aller sur S3 :** images de brands, activities, pages
- **Ce qui reste dans l'app :** SVGs pour icônes, numéros, et la custom code source Oli's Lab
- Images non utilisées supprimées du `/public` sans erreur de build

#### Linter Next.js

- Kyle a assigné à Lucas la mise en place du linter sur le projet Next.js (uniquement pour les UI components)
- Lucas prévu de finir aujourd'hui, configuration déjà existante sur le package UI

---

### Navbar & Bugs

#### Liens cassés

- Toujours présents dans la navbar, à corriger

#### Blur Safari (shop oil button)

- Fix testé sur iOS 17 / iPhone SE : OK pour la navbar
- Mais le même problème existe sur le bouton shop oil : Lucas va ouvrir une PR spécifique pour ça et lier la tâche au bon projet

---

### SEO (Patrick)

- Tâche créée pour la mise à jour en batch des meta titles et descriptions des articles (nombreux articles, nécessite une approche par script)
- Les autres PRs SEO sont prêtes pour review

---

### Actions

- [ ] **Michele** - Investiguer les gaps d'event tracking (GA, Meta) et s'assurer que tous les events fonctionnent
- [ ] **Michele** - Call avec Kyle sur le fix Apple Pay event tracking
- [ ] **Michele** - Vérifier que les events stage et production ne se mélangent pas dans Meta
- [ ] **Michele** - Réunion avec Rémy (et Diego) sur la media collection et la définition des tailles d'images
- [ ] **Rémy** - Trier les PRs CMS par ordre de dépendance et ajouter les priorités dans Notion
- [ ] **Rémy** - Travailler sur l'architecture du bridge script générique (mapping abstrait + custom par collection)
- [ ] **Kyle** - Planifier la rétrospective vers la fin de la semaine (FigJam template)
- [ ] **Patrick** - Ajouter Kyle et Michele comme reviewers sur la PR optimization frontend SEO
- [ ] **Patrick** - Continuer INCI score (matching frontend, puis scoring)
- [ ] **Patrick** - Rendre les skin concerns dynamiques dans le formulaire de recommendation
- [ ] **Lucas** - Terminer la configuration du linter Next.js pour les UI components
- [ ] **Lucas** - Fixer le blur Safari sur le shop oil button et lier la PR à la tâche

---

### Notes complémentaires

- Diego est absent toute cette semaine : pas de reviews de sa part avant son retour
- La dépendance critique pour la suite de la migration Next.js : products collection + media management doivent être mergés en priorité
- Michele rappelle : chaque dev doit ajouter une due date quand il commence une tâche, pour faciliter la priorisation des reviews par les autres
