---
date: 2026-01-26
type: meeting
projet: Oli's Lab
tags: [tech-weekly, olis-lab]
---

# Tech Weekly - 26 janvier 2026

**Participants :** Michele, Diego, Lucas, Rémy, Patrick
**Lien Notion :** https://www.notion.so/olislab/Tech-Weekly-2f44bf4c7fa180ef89dad53508715174

---

## Migration catégories / sous-catégories

### Problème
- Les produits et bundles contiennent encore les anciens labels de catégories/sous-catégories
- Risque principal : quand l'automation met à jour un produit (images notamment), elle peut écraser les catégories avec des traductions incorrectes
- Les traductions actuelles des produits ont déjà été corrigées manuellement la semaine dernière
- La nouvelle liste de labels fournie par Cindy et Louis n'est pas encore implémentée : Rémy attend la nouvelle structure de collections pour le faire là, plus sûr et plus scoped

### Solution court terme
- Rémy fait une PR aujourd'hui : ajout d'un check sur les endpoints produit et bundle pour ne pas re-traduire une catégorie si une traduction existe déjà
- Si une nouvelle catégorie apparaît (nouveau produit avec une catégorie inconnue), elle passera en anglais uniquement, ce qui est acceptable temporairement
- Si les mises à jour produits restent rares entre-temps, les corrections manuelles en DB sont suffisantes comme filet de sécurité

### Plan de migration complet (3 étapes)

**Étape 1** : Remplir les nouvelles collections `categories` et `subcategories` dans MongoDB
- Rémy a déjà un script avec un objet `hierarchy` qui mappe les catégories/sous-catégories sans doublons et gère les traductions proprement

**Étape 2** : Exporter une table de validation (CSV) depuis MongoDB
- Colonnes : SKU, titre produit, catégorie EN, catégorie FR, sous-catégorie EN, sous-catégorie FR
- À valider par Cindy, Louis et Suze avant de passer à l'étape 3

**Étape 3** : Mettre à jour tous les endroits qui lisent les catégories/sous-catégories pour pointer vers les nouvelles collections
- Pages produit
- Recherche (oublié initialement, à ajouter)
- Filtres du menu
- Bundles

**Note déploiement :** MongoDB gère les changements de schéma par session. Les utilisateurs actifs au moment du deploy ne verront aucune disruption. Idéalement : DB entièrement peuplée avant de déployer le nouveau code de lecture.

### Bundles
- Bug trouvé : l'automation des bundles utilisait des types différents pour catégories/sous-catégories par rapport aux produits (incohérence côté Notion)
- Solution retenue : calculer les catégories/sous-catégories d'un bundle depuis les produits qu'il contient (unique sur les sous-catégories de tous les produits du bundle), recomputer à chaque création/mise à jour
- Bundles traités en **phase 2** après les produits
- En attendant : sous-catégories et traductions des bundles correctes dans Notion (corrigées manuellement la semaine dernière)

### CMS et automation
- La migration CMS pourrait démarrer plus tôt que prévu : Michele ne veut pas sur-investir dans l'automation Notion actuelle
- Idée discutée mais non prioritaire : ajouter un flag "update images only" dans Make pour éviter de déclencher la traduction lors d'une simple mise à jour d'image
- Décision selon ce qui sera décidé cette semaine sur le CMS

---

## Navbar / Menu (Rémy + Lucas)
- Lucas a commencé la partie UI des composants
- Rémy prend la suite pour l'intégration, la logique et la recherche
- Ce projet servira de **cas réel** pour tester la lecture depuis les nouvelles collections catégories/sous-catégories
- Priorité cette semaine : Rémy reste focus sur les catégories/sous-catégories, navbar en parallèle dès que possible

---

## Checkout & Feature Flags (Diego)

- Diego travaille sur les corrections du checkout et les feature flags
- **Point à vérifier :** les questions du quiz ne sont peut-être pas sous feature flag. Si c'est le cas, le survey PostHog post-quiz ne s'affichera pas (le survey est lié au feature flag + aux événements trackés par Rémy)
- La collection page a bien son feature flag en place, confirmé
- Patrick devra wrapper toutes les questions du quiz sous le même feature flag si ce n'est pas déjà fait
- Diego notifiera l'équipe quand le feature flag mis à jour sera prêt à tester

---

## Site scientifique (Patrick)

### Problème actuel
- Cindy fait des modifications dans le staging scientifique (ajout/suppression de fonctions sur des produits) qui impactent les scores
- Cela oblige Patrick à relancer des scripts manuellement sur sa machine, encore et encore

### Solution proposée
- Créer dans le site scientifique des endpoints dédiés à la place des scripts locaux
- Interface possible via **Retool ou AppSmith** connectés à MongoDB : Cindy peut déclencher un re-scoring depuis l'UI sans passer par Patrick
- Fonctionnalités à ajouter :
  - Lancer un scoring en batch
  - Sélectionner un ingrédient et re-scorer tous les produits qui le contiennent
  - Meilleur CRUD pour éditer les ingrédients et leurs fonctions

### Règle nouvelle : aucun script en production
- **Plus aucun script ne doit tourner en production sans approbation de Michele ou communication préalable à l'équipe**
- Process si script nécessaire : le committer dans un dossier `/scripts` dans le repo concerné (web app ou scientifique) pour garder une trace de ce qui a été exécuté, par qui, et quelle version
- Idée de sauvegarder l'état pré-script pour rollback : rejetée (DB trop grosse, pas une bonne pratique)

---

## Incohérences Notion vs base de données

### Problème découvert
- Après le script qui a introduit le `published_status` sur les collections, des écarts importants ont été constatés entre Notion et la DB
- Exemple : ingrédients actifs : ~170 sur Notion, ~130 en DB. Différence de ~40 items.
- Cause probable : des items ont été ajoutés dans Notion mais jamais envoyés en DB
- Risque actuel : si un item est édité dans Notion, il passera en `offline` par défaut (le champ est offline par défaut dans Notion)

### Décision
- Ne pas construire une intégration Make complexe maintenant si la migration CMS est à quelques semaines
- Pour les actifs spécifiquement : pas d'urgence, c'est moins critique que les produits
- Rémy et Michele vont exporter Notion + DB et comparer pour identifier les écarts sur les actifs, avec l'aide de Cindy

### Besoin long terme
- Même après la migration CMS, il faudra un mécanisme de **bulk update** : quand Suze fait une analyse dans Excel/CSV et veut pousser les changements en masse, on doit pouvoir le faire proprement
- À intégrer dans le plan CMS

---

## Feature "Recommended For Me" (Patrick + Diego + Rémy)

### Loading screen (Patrick)
- Patrick a ajouté un loading state sur le bouton de submit du formulaire
- Problème de wording : "Saving results" est ambigu pour les utilisateurs non connectés (qui voient aussi "Save my analysis")
- **Wording décidé :** "Submitting the form" puis "Computing your products" / "Finding products" lors du chargement de la page de recommandations

### Bugs identifiés
- Certains produits n'apparaissent pas dans les recommandations pour des raisons inconnues
- Michele va créer des tickets séparés pour chaque problème

### Seuil d'âge
- Actuellement un seul seuil : 25 ans (au-dessus ou en-dessous)
- Diego va écrire des scripts Python pour tester les calculs sur ce seuil

---

## Actions

- [ ] **Rémy** - PR avec checks anti-re-traduction sur les endpoints produit et bundle
- [ ] **Rémy** - Peupler les nouvelles collections `categories` et `subcategories` en MongoDB
- [ ] **Rémy** - Créer le CSV d'export (SKU, titre, catégorie EN/FR, sous-catégorie EN/FR) pour validation
- [ ] **Rémy** - Mettre à jour tous les endroits qui lisent catégories/sous-catégories (search, menu, filtres, etc.)
- [ ] **Rémy** - Continuer le travail navbar/menu (encore une semaine focus catégories d'abord)
- [ ] **Rémy + Michele** - Exporter et comparer Notion vs DB pour les ingrédients actifs, identifier les écarts
- [ ] **Diego** - Finaliser les corrections checkout et feature flags, notifier l'équipe pour tests
- [ ] **Diego** - Scripts Python pour les calculs de recommandations (seuil d'âge 25 ans)
- [ ] **Patrick** - Vérifier si les questions du quiz sont sous feature flag, wrapper si nécessaire
- [ ] **Patrick** - Développer les endpoints pour le site scientifique (scoring sans scripts locaux)
- [ ] **Patrick** - Finaliser le loading screen avec le wording "Submitting form" / "Computing products"
- [ ] **Michele** - Appel demain sur les mises à jour de pages
- [ ] **Michele** - Créer les tickets séparés pour les bugs de recommandations produit
- [ ] **Cindy** - Être consultée sur les écarts ingrédients actifs entre Notion et DB
- [ ] **Toute l'équipe** - Tester le flow "Recommended For Me" sur staging
