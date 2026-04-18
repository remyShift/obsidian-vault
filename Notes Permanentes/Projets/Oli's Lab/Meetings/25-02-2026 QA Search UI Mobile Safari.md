---
date: 2026-02-25
type: meeting
projet: Oli's Lab
tags:
  - ui
  - search
  - mobile
  - safari
  - localization
  - olis-lab
participants:
  - Michele
  - Remy
lien:
---

# Huddle : QA Search UI - Mobile, Safari, Localisation

---

## Contexte

Michele a testé la nouvelle UI de recherche sur mobile et desktop, elle remonte ses observations à Rémy avant un call immédiat avec Kyle et Diego sur la localisation.

---

## Problèmes identifiés

### Mobile : une seule carte par ligne dans les résultats de recherche
- Sur mobile, les résultats affichent un seul produit par ligne au lieu de deux
- La card est à sa taille minimale mais le padding général de la page est trop grand
- Michele demande de réduire le padding pour avoir 2 produits par ligne
- Rémy note qu'il y a une vieille PR de Lucas avec une nouvelle grille et de nouveaux cards qui pourrait résoudre ça directement
- **Décision :** regarder la PR de Lucas, la mettre à jour si besoin et l'intégrer. Si des doutes sur l'approche, en parler avec Kyle.

### Desktop : card d'actifs avec layout cassé
- Le card des actifs sur desktop semble avoir un problème de grille
- Rémy ne pense pas avoir touché la grille des actifs (il a modifié produits et bundles uniquement)
- Hypothèse : les actifs et articles partageaient un composant ou du CSS avec les produits qui a été affecté par ricochet
- À investiguer et corriger

### Mobile : popup de recherche qui se referme toute seule
- Michele observe que le popup de recherche se ferme parfois de façon inattendue
- Rémy n'a jamais reproduit ce bug localement
- Hypothèse : pourrait arriver sur une connexion lente (fetch trop long → état de loading qui déclenche un comportement inattendu)
- À surveiller, pas encore reproductible en local

### Safari desktop : effet frosted glass absent
- L'effet de flou/verre dépoli (backdrop-filter) ne s'affiche pas sur Safari desktop
- Rémy : c'est probablement Safari lui-même qui ne supporte pas `backdrop-filter` de la même façon
- Lucas a confirmé qu'il a bien l'effet sur son Safari → peut-être spécifique à certaines versions
- À déléguer à Lucas pour investigation
- Michele : Safari sera beaucoup utilisé par les users, pas optionnel de le corriger

---

## Arbitrage : perfectionner la search actuelle ou attendre la v2 ?

Rémy soulève : la search actuelle va être remplacée par une vraie search v2. Est-ce qu'il vaut vraiment la peine d'investir du temps pour la corriger ?

Michele : la search actuelle va quand même être utilisée pendant un moment. Elle doit être **présentable** et fonctionner correctement sur mobile, même si elle n'est pas parfaite. Le mobile est la priorité.

---

## Localisation des ingrédients

- Rémy a une vieille PR (4-5 mois) sur ce sujet qui n'a jamais été mergée
- Probablement pleine de conflits maintenant
- **Plan :** essayer de rebaser sur master pour voir l'état des conflits. Si ça passe, l'intégrer. Si trop conflictueux, recréer.
- Point important de Michele : vérifier que la traduction des noms d'ingrédients fonctionne correctement. Les ingrédients sont localisés en DB, donc ça devrait marcher en utilisant uniquement le nom anglais pour la récupération. À confirmer pendant le call suivant avec Kyle et Diego.

---

## Actions

- [ ] **Rémy** - Regarder la PR de Lucas (nouvelle grille + cards) pour résoudre le problème mobile 2 produits par ligne
- [ ] **Rémy** - Investiguer le problème de grille sur les cards d'actifs (régression probablement liée à la grille produits)
- [ ] **Lucas** - Investiguer le frosted glass absent sur Safari desktop
- [ ] **Rémy** - Essayer de rebaser la vieille PR de localisation des ingrédients sur master
- [ ] **Rémy** - Vérifier le comportement de traduction des noms d'ingrédients lors du call localisation
