---
date: 2026-01-27
type: meeting
projet: Oli's Lab
tags: [categories, subcategories, architecture, product-recommendation, olis-lab]
participants: [Diego, Michele, R\u00e9my]
notion:
---

# Huddle : Restructuration Catégories/Sous-catégories

---

## Contexte

Michele explique la nouvelle structure de catégories/sous-catégories souhaitée, Diego et Rémy challengent l'approche technique. Décisions sur le groupement commercial vs la catégorisation produit réelle.

---

## Problème à résoudre : catégorisation commerciale vs catégorisation produit

### Situation actuelle
Certaines sous-catégories sont très proches et on n'a pas assez de produits pour justifier des collections séparées :
- **Hand care** (4 produits) + **Foot care** (1 produit) → trop peu pour deux collections séparées
- **Moisturizers** + **Serums** → regroupés dans "Moisturizers & Serums" côté body care

### Ce que Louis et Michele veulent
- Côté **attribution produit** (base de données) : chaque produit est précisément catégorisé (`hand_care` ou `foot_care`, `moisturizer` ou `serum`)
- Côté **expérience utilisateur** (menus, pages collection, filtres) : ces sous-catégories proches sont regroupées en une seule entrée ("Hand & Foot Care", "Moisturizers & Serums")

### Pourquoi deux niveaux distincts
1. **Product recommendation / routine builder** : ne peut pas recommander un moisturizer et un serum en même temps (ce sont deux étapes différentes d'une routine). Idem hand care vs foot care (usage différent dans la journée). La précision scientifique est nécessaire.
2. **Analytics** : Michele veut savoir comment le stock est réparti par sous-catégorie précise, pas juste par groupe commercial.

---

## Structure de catégories validée

### Skincare
- Cleansers
- Moisturizers
- Serums
- (etc.)
- Un produit peut appartenir à plusieurs sous-catégories (rare mais possible)

### Body Care
- Body Wash
- Exfoliators & Scrubs (même chose, renommé)
- **Hand & Foot Care** (groupement commercial de `hand_care` + `foot_care`)
- **Moisturizers & Serums** (groupement commercial de `moisturizer` + `serum` body)
- (à terme : nail care)

### Tools & Accessories
- Pas de sous-catégorie actuellement (4 produits seulement)
- **Solution retenue :** créer une sous-catégorie "Tools & Accessories" qui pointe vers la catégorie du même nom (un peu redondant mais ça permettra au filtre latéral de fonctionner, car le filtre lit uniquement les sous-catégories)
- Évolutif : si le catalogue grossit, on ajoutera des sous-catégories réelles

---

## Implémentation du groupement commercial

### Option discutée et rejetée : champ `commercial_name` sur subcategory
Rémy proposait d'ajouter un champ `commercial_name` dans la collection subcategories pour afficher "Hand & Foot Care" alors que la vraie valeur est `hand_care`. Diego rejette : trop peu contrôlé, quelqu'un pourrait mettre n'importe quelle valeur.

### Solution retenue court terme : mapper dans le backend
- À chaque fetch des catégories/sous-catégories, ajouter une étape de transformation qui regroupe selon un mapping hardcodé
- Exemple : `{ hand_care, foot_care } → "Hand & Foot Care"`
- Avantage : rapide à implémenter
- Limite : si on veut une image spécifique pour le groupe commercial, un mapper ne suffit plus

### Solution long terme : nouvelle collection/table
- Une collection séparée de "groupements commerciaux" avec :
  - Nom traduit
  - Image de couverture
  - Liens vers les sous-catégories qui le composent
- Michele veut aller là, Diego aussi, mais pas cette semaine
- **Semaine prochaine** : Michele crée la structure, Rémy l'intègre

### Pour cette semaine
Déployer les catégories/sous-catégories telles quelles (sans groupement). La semaine suivante, on ajoute la couche de groupement.

---

## Recommandation pour la routine builder
- Ajouter à chaque sous-catégorie un champ `routine_step` (numéro de l'étape dans une routine) → permettra plus tard de construire des routines cohérentes
- Rémy a déjà ajouté le champ au schéma mais non requis pour l'instant

---

## Synchronisation des données prod → stage

Michele va modifier les catégories directement en **prod**. Rémy a besoin que le stage reflète les mêmes données pour tester que ses fixes fonctionnent.

**Plan :**
1. Michele fait les changements en prod
2. Michele prévient Rémy quand c'est fait
3. Diego aide à dumper les données prod vers stage (copy DB)
4. Rémy teste ses corrections localement avec les nouvelles données

---

## Impact sur "Recommended For Me"

Changer les labels de catégories risque de casser le mapping utilisé dans la feature de recommandation (qui se base sur les labels pour matcher les réponses du quiz aux catégories de produits).

- Rémy préfère **attendre de voir ce qui casse** plutôt que de faire une PR préventive dans l'obscurité
- Michele : OK, mais si possible préparer un PR de mapping en avance pour éviter la casse
- Compromis : Michele prévient Rémy des labels qui changent, Rémy prépare ce qu'il peut

---

## Actions

- [ ] **Michele** - Mettre à jour les données catégories/sous-catégories en prod
- [ ] **Michele** - Prévenir Rémy des changements de labels qui impactent "Recommended For Me"
- [ ] **Diego** - Synchroniser les données prod → stage une fois que Michele a terminé
- [ ] **Rémy** - Une fois les données synchées, identifier ce qui casse dans "Recommended For Me" et corriger
- [ ] **Diego + Rémy** - Implémenter le mapper de groupement commercial (court terme)
- [ ] **Rémy** - Demain : lancer le script de création des collections `categories` et `subcategories`
- [ ] **Michele** - Début de semaine prochaine : proposer la structure de la collection "groupements commerciaux"
