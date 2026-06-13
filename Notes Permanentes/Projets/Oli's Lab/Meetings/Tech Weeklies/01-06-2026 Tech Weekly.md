---
date: 2026-06-01
type: meeting
projet: Oli's Lab
tags:
  - tech-weekly
  - olis-lab
participants:
  - Michele
  - Kyle
  - Diego
  - Lucas
  - Patrick
  - Ante
  - Remy
lien: https://app.notion.com/p/olislab/Tech-Weekly-3724bf4c7fa1807f9243f88c56b470d7?source=copy_link
---

# Tech Weekly - 1 juin 2026

---

## Suivi de progression des projets (Notion)

- Nouvelle formule Notion qui affiche le pourcentage de complétion des projets : ne compte que les tâches terminées
- Les items en planning, "not now" ou bloqués ne comptent pas dans la progression
- Les projets passent automatiquement en "done" quand ils atteignent 100% au moment du déploiement
- Le passage en done se fait via le bouton de déploiement depuis la page QA "ready to deploy" (Olis Lab home), pas manuellement
- Dernier déploiement : vendredi dernier

---

## Search (88%)

- Feature flag déjà à 100% des utilisateurs depuis ~1 semaine, quelques petits ajustements découverts en route (product card trop grande, etc.)
- Il ne reste que le cleanup : suppression du feature flag pour clôturer le projet

### Action items
- [ ] @Remy : retirer le feature flag du Search et clôturer

---

## PDP - Product Detail Page (96%)

- Projet quasi terminé : reste une review et l'adressage des commentaires (Kyle), puis publication du feature flag
- Objectif : release cette semaine une fois la perf validée
- **Bloqueur perf identifié** : latence au clic sur une product card → manque de feedback avant la navigation (délai SSR). Présent CRA→Next.js **et** dans Next.js, sur mobile **et** desktop
  - Piste 1 : les améliorations de vitesse récentes de Kyle rendent peut-être le délai déjà non perceptible (à tester en local)
  - Piste 2 sinon : ajouter un feedback au clic (état loader / indication sur la card) le temps de la navigation
- **Chargement des images** : flash au landing, certaines images arrivent après le contenu
  - Quirk spécifique au format AVIF à valider (Kyle a trouvé de la doc dessus)
  - Pas de CLS car la place de l'image n'est pas réservée, mais ça pénalise le LCP
  - Piste : ne PAS lazy-load la première image (top image) pour améliorer le LCP ; produits censés être légers donc perf OK
- Note : clarification sur le LCP (Largest Contentful Paint) = un seul élément peint à l'écran. À confirmer côté équipe, doute exprimé pendant la réunion
- **JSON-LD** : structured data à implémenter sur les pages PDP (élément SEO). Michele a fait des recherches vendredi, brief à venir pour Kyle

### Action items
- [ ] @Kyle : pousser la branche PR des améliorations perf locales pour test par Michele
- [x] @Kyle : créer une tâche dédiée pour encapsuler le travail perf fait en local
- [ ] @Kyle : investiguer l'optimisation LCP + tester le non-lazy loading de la première image
- [ ] @Kyle : implémenter le JSON-LD pour le SEO (PDP)
- [ ] @Michele : briefer Kyle sur le JSON-LD (recherche faite vendredi)

---

## PLP - Product Listing Page & Filtres

- Le template est en attente de validation SEO de l'agence Spark avant de construire les vraies pages catégories
- Une fois le feedback reçu : finaliser le template, puis le scope du projet bascule sur la construction des pages PLP individuelles
- **Filtres** : besoin d'une hiérarchie à deux niveaux (catégories → sous-catégories). Actuellement tout est affiché sur un seul niveau. Ante a déjà fait cette partie, à vérifier et clôturer
- **Mobile** : placement des filtres (facile à ouvrir, hors du flow de scroll), toggle 1 ou 2 colonnes de produits, UX globale améliorée. Desktop pourrait passer à 2/4 colonnes
- **Règle clé filtres** : toujours construire les filtres à partir de ce qui est **live** ET pertinent pour le scope de la page courante
  - Ex : si tous les produits Suncare passent offline, on ne montre Suncare nulle part (même s'il existe encore dans la collection subcategory)
  - Ex : sur une PLP "moisturizers", on ne montre pas de filtre Suncare car hors scope
  - D'où la logique de partir des produits plutôt que des collections de catégories
- Fetch payload : la hiérarchie catégories/sous-catégories se récupère via le paramètre `depth` (product depth 1 → subcategory ; depth 2 → category de la subcategory)
- Décision : la fonctionnalité filtres et le composant de layout (grid selector + ouverture des filtres) seront deux tâches séparées

### Action items
- [ ] @Ante : designer le composant filtre + le sélecteur de layout de grille pour mobile
- [ ] @Team : faire le QA du template PLP cette semaine après réception du feedback SEO de Spark
- [ ] @Michele : créer un projet de suivi pour la construction des pages PLP (à démarrer la semaine prochaine)

---

## SEO & Sitemap multi-langue

- **Sitemap multi-langue critique** pour publier les nouvelles pages sur les chemins de langue (`/en`, `/fr`)
- Toutes les pages redirigeront vers un chemin de langue (olislab.com → olislab.com/en ou /fr) ; le changement de langue dans le footer = navigation vers une autre page
- Sur `/en`, toute requête (fichier local, query payload, query DB) doit être dans cette langue uniquement (ou on récupère tout mais on n'affiche que la bonne langue)
- Le sitemap est régénéré à chaque déploiement prod via un endpoint + controller. Diego doit revoir cette logique car elle doit maintenant gérer les deux chemins de langue
- **Status codes** : les produits/articles offline doivent renvoyer un code approprié (301/303) pour que Google arrête de les indexer. La page reste visitable tant que la donnée existe dans le CMS (pas de 404), mais on signale aux robots qu'elle ne doit plus être indexée
- **No-index** : pages à exclure de l'indexation via meta tag (search, checkout, error boundary)
- **Feed produit (catalogue XML)** : demande de l'agence d'ajouter une catégorie custom "country of origin". Problème : la donnée n'est pas encore dans le CMS (probablement dans l'ancienne DB, jamais migrée). Devrait être fait cette semaine
- **Bug existant** : certains articles affichent encore l'ID au lieu du slug dans le sitemap

### Action items
- [ ] @Diego : revoir la logique de régénération du sitemap pour gérer les deux chemins de langue
- [ ] @Diego : corriger les articles qui utilisent l'ID au lieu du slug dans le sitemap
- [ ] @Team : implémenter les status codes (301/303) pour produits/articles offline
- [ ] @Team : ajouter les no-index sur search, checkout, error boundary
- [ ] @Michele : créer la tâche d'ajout de la catégorie "country of origin" au feed (donnée à migrer)

---

## Checkout V2 - Flow utilisateur enregistré

- Objectif principal : améliorer le flow registered user pour pouvoir démarrer le paiement directement
- Pour un utilisateur enregistré, pré-remplir adresse et email → arriver directement à l'étape paiement, avec possibilité de revenir aux étapes précédentes
- Actuellement le checkout charge à la première étape ; il devrait démarrer à l'étape paiement
- **Stripe wallet** : investiguer le stockage des détails de carte pour les utilisateurs enregistrés (feature Stripe plutôt que solution custom)
- Ante doit clarifier le flow register en Figma (à quoi ça ressemble, depuis quelle étape démarrer)
- Décision rangement : les tâches de design checkout passent en "Design" (pas "done" tant que pas développé)

### Action items
- [ ] @Diego : vérifier le timing du travail compute card snapshot
- [ ] @Diego : investiguer le stockage des détails de carte Stripe pour les utilisateurs enregistrés
- [ ] @Ante : créer le design du flow checkout register en Figma

---

## CMS & Payload

- **Trading plan** : Michele change et publie le trading plan aujourd'hui ; feature flag programmé pour changer demain
  - Petit bug résolu : le lien CTA affichait "object object" suite au retrait de la localisation sur le champ (Remy) → les deux champs ont mergé. Réglé par override
  - Demain matin : Remy disponible pour le support du déploiement du feature flag (point de contact pour Suze, même fuseau horaire)
- **Liste de marques** : simplification possible → une seule liste de priorité utilisée différemment (shop = premier élément, home page = liste complète)
- **SKU** : actuellement un input texte simple, à passer derrière un hook d'auto-génération (logique similaire à ce qui a été fait sur Ocean)
- **Sous-catégorie produit** : besoin d'un champ dédié pour le titre utilisateur lors de la re-sélection d'une sous-catégorie
- **Workflow edits / bulk edit** (discussion à approfondir) :
  - Suze ne part pas d'un edit pour chercher des produits : elle va dans la liste produits complète, applique des filtres (ex. score > 80, sous-catégorie moisturizers), sélectionne des produits, puis voudrait assigner un edit en masse depuis la liste
  - Payload permet d'éditer des colonnes relationnelles directement depuis la list view
  - Proposition Remy : ajouter un champ relationnel many-to-many `edits` sur products (un produit appartient à plusieurs edits) → éditable depuis la list view existante, pas de solution from scratch
  - Réserve Michele : ce n'est pas le workflow pensé par Payload, attention à ne pas reconstruire un CMS ("on build Oli's Lab, pas un CMS"). À débriefer dans un meeting dédié
  - C'est pour ça que les updates sur la collection edits étaient en pause

### Action items
- [ ] @Michele : changer et publier le trading plan aujourd'hui
- [ ] @Michele : programmer le changement de feature flag pour demain
- [ ] @Remy : être disponible demain matin pour le support déploiement du feature flag (point de contact Suze)
- [ ] @Remy : implémenter le hook d'auto-génération du champ SKU
- [ ] @Remy + @Diego : champ dédié pour le titre user de la sous-catégorie produit
- [ ] @Michele + @Remy + @Diego : meeting dédié pour trancher le workflow edits (relation many-to-many vs changement de flow)

---

## Infrastructure & Déploiement

- **Schedule de déploiement** : on vise mardi et jeudi, vendredi en backup, hotfixes quand nécessaire. Pas de gros déploiement le vendredi
- **BigBlue API rate limiting** : le dev local tape le même endpoint authentifié (clé partagée, environnement unique côté BigBlue) → les appels local + prod se cumulent et on atteint la limite (Lucas tapait beaucoup aujourd'hui)
  - Piste 1 : mocker l'endpoint de disponibilité BigBlue en dev
  - Piste 2 (préférée à terme) : changer la façon générale dont on interroge BigBlue, cacher la dernière query. Priorité qui montera avec le trafic (connaître le stock en direct = bénéfice)

### Action items
- [ ] @Diego : évaluer le mock de l'endpoint de disponibilité BigBlue pour réduire les appels API (estimer le temps : journée ou plus ?)

---

## Dépendances & Sécurité (Patrick)

- Focus des 2 dernières semaines : résolution des vulnérabilités de dépendances + bugs mineurs
- On atteint un point de rendements décroissants : les upgrades restants corrigent de moins en moins d'issues
- Selon une analyse Claude, certaines issues ne concernent que les packages de la **phase de build**, pas le site en runtime → Patrick va documenter ça pour décider en équipe si on les traite ou non
- 2 critiques encore ouvertes : une PR ouverte pour des dépendances transitives (simple bump)
- PR pour l'envoi d'email (forgot password) mergée vendredi, à tester calmement (pas de breaking constaté pour l'instant)

### Action items
- [ ] @Patrick : documenter les issues build-phase-only et continuer les mises à jour de dépendances

---

## Testing & Qualité

- Le framework de test CMS est en place : l'équipe devrait ajouter des tests pour les fonctionnalités payload
- **Débat sur le bug localized (CTA trading plan)** : aurait-il pu être attrapé par un test ?
  - Position Remy : une assertion sur le type attendu (link / string spécifique) aurait fait échouer le test avant le typecast
  - Nuance : la valeur "object object" est une string, donc une assertion sur la simple présence d'une string ne suffit pas ; il faut asserter sur la **forme** attendue (un lien)
  - Position Michele : tester chaque champ payload n'a pas de sens ; c'est plus un problème de process lors d'un changement de type. Pas résolu par migration (pas de migration MongoDB nécessaire au changement de type) ni par les types. À débriefer
- Tests automatisés pour les side effects du cart hook : toujours en attente

### Action items
- [ ] @Team : ajouter des tests pour les fonctionnalités payload (capturer ce type d'edge case)
- [ ] @Team : tests automatisés pour les side effects du cart hook (en attente)

---

## Résumé des priorités de la semaine

1. Release du PDP (validation perf + JSON-LD + clôture review)
2. QA du template PLP après feedback SEO de Spark
3. Sitemap multi-langue (chemins /en /fr) + status codes offline + no-index
4. Trading plan : publication + déploiement feature flag demain
5. CMS Payload : hook SKU, champ sous-catégorie, trancher le workflow edits

---
