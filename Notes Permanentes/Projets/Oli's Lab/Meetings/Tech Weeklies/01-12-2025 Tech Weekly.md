---
date: 2025-12-01
type: meeting
projet: Oli's Lab
tags:
  - tech-weekly
  - olis-lab
participants:
  - Michele
  - Diego
  - Lucas
  - Patrick
  - Remy
lien: https://www.notion.so/olislab/Tech-Weekly-2bc4bf4c7fa1805ba795d64a9fb085e2
---

# Tech Weekly - 1er décembre 2025

---

## Process d'équipe

### Stand-up Slack (Dixie bot)
- Mise en place du bot Dixie sur Slack pour les stand-ups quotidiens
- 3 points à couvrir chaque jour : ce qu'on a fait, ce qu'on prévoit, les blockers
- Le bot prompt chaque membre à ~9h30-10h dans son fuseau horaire
- Les réponses sont reportées dans un channel dédié
- Michele configure ça cette semaine

### Gestion des tâches et PRs
- **Règle :** chaque PR doit être liée à une tâche Notion dans un projet. Pas de PR sans tâche.
- **Workflow PR feedback :**
  - GitHub : commentaires focalisés sur le code (implémentation, suggestions techniques)
  - Notion : questions générales, QA, discussions sur les effets de bord, relances d'attention (ex. "cette PR est toujours pas reviewée")
  - Objectif : réduire le bruit de notifs GitHub et garder les discussions dans le bon endroit
- **Bugs & feedbacks produit :** Michele veut créer un projet dédié dans Notion pour les bugs/feedbacks remontés par l'équipe (Suze, etc.), avec des statuts distincts (planning, triage, ready for dev). À ne pas mélanger avec les tâches de dev actives. Diego peut ajouter l'intégration GitHub dessus.

---

## Focus de la semaine

- **Priorité 1 :** Notion automation (voir section dédiée)
- **Priorité 2 :** Merger toutes les PRs de Lucas sur la librairie de composants UI
- Ce chantier pourrait s'étendre sur deux semaines

---

## Projet Notion Automation

- Sera implémenté dans la nouvelle API (API v2)
- Michele lead le projet, Diego et Rémy impliqués
- Michele veut des petits stand-ups dédiés pour garder la visibilité sur ce que fait Rémy
- **Blockers actuels :**
  - Comprendre comment mettre à jour Make pour utiliser la nouvelle version de l'API Notion
  - Problème de permissions : l'automation lit les produits mais pas les marques associées. Probablement lié aux rôles et permissions des intégrations, devrait se régler avec la mise à jour de l'API Notion.
  - Besoin d'une fonctionnalité de **bulk update** : plutôt que de déclencher une mise à jour produit par produit, pouvoir tout déclencher depuis Slack ou Make en une seule action

---

## Performance UI

### Lazy loading (Diego)
- Diego a implémenté le lazy loading sur les routes, mais il y a un problème de flickering au chargement initial
- Le délai artificiel de 1 seconde est trop long. Suggestion : 0.7-0.8s
- Problème identifié : conflit entre le lazy loading et l'interceptor, le composant arrive trop tard par rapport au moment où le loading state est censé apparaître
- Idée discutée : appliquer le délai uniquement au **premier chargement** (après, les composants sont déjà en cache, inutile d'attendre)
- Diego va tester cette approche et fine-tuner

### Skeleton loading (projet futur, Lucas)
- Objectif : afficher des squelettes de contenu pendant le chargement plutôt que des spinners ou du vide
- Cas prioritaires :
  - Carousels de produits sur la homepage
  - Résultats de recherche
  - Product cards en général (shop all, sous-catégories)
- Michele veut que ce soit fait **une fois la migration Next.js lancée**, pas maintenant (le vrai délai vient du cold start Lambda, pas du composant)
- Lucas doit proposer une stratégie cette semaine

### Layout shifting
- Problèmes constatés sur plusieurs pages :
  - **Shop All :** les cards produits arrivent après que le carousel a déjà rendu, créant un saut de layout
  - **Pages sous-catégorie :** le banner ou la grille produits arrivent à des moments différents, ce qui fait "sauter" la page
- Ce type de saut dégrade la performance perçue même si le chargement réel est rapide
- Pas urgent à résoudre cette semaine, mais Michele veut une proposition de stratégie d'ici vendredi

---

## État des PRs

| PR | Statut |
|---|---|
| Librairie composants (Lucas) | À merger cette semaine |
| Body Care Rating System | En review, à merger |
| API v2 | En review, à merger |
| OceanCMS | En review, à merger |
| Refacto Checkout | Projet plus large, à planifier |

---

## Actions

- [ ] **Michele** - Configurer le bot Dixie sur Slack (stand-up quotidien)
- [ ] **Michele** - Designer le système de gestion des bugs/feedbacks produit dans Notion
- [ ] **Toute l'équipe** - Merger les PRs librairie composants cette semaine
- [ ] **Diego** - Expliquer l'implémentation du lazy loading à l'équipe
- [ ] **Diego** - Fine-tuner le timing du lazy loading + tester l'approche "délai uniquement au premier chargement"
- [ ] **Lucas** - Proposer une stratégie pour le skeleton loading des produits
- [ ] **Michele** - Tester et valider le lazy loading
- [ ] **Michele + Diego + Rémy** - Avancer sur le projet Notion Automation (résolution des problèmes de permissions + bulk update)
