---
date: 2026-01-20
type: meeting
projet: "Oli's Lab"
tags:
  - olis-lab
participants:
  - Michele
  - Patrick
  - Diego
  - Lucas
  - Remy
lien: https://www.notion.so/olislab/Product-Recommendation-Release-2ee4bf4c7fa180f78948d63a0e4962d2
---

## Product Recommendation Release

---

### Objectif

Réunion d'alignement pour définir le plan de mise en prod de la feature "Product Recommendation". Michele demande un état des lieux de ce qui manque et des bugs ouverts avant de valider le go-live.

---

### Décision clé : structure des données ingrédients

#### Problème

Patrick avait implémenté un split de la liste d'ingrédients (INCI) pour les besoins du projet scientifique. Ce split réécrivait le champ `inchlist` existant, causant des problèmes de formatage côté shop (ex. virgules supplémentaires sur le dernier ingrédient, asterisques mal positionnés).

#### Décision

- **Ne pas écraser le champ `inchlist` existant.** Il doit rester intact car il sera réécrit par l'automation Notion à chaque mise à jour produit (sans le split scientifique).
- **Créer un nouveau champ** avec un nom explicite type `inchlist_scientific_split` qui contient la version splittée pour le projet scientifique.
- Le split scientifique n'est nécessaire que pendant le calcul du scoring. Une fois le rating calculé, les données sont lues depuis la collection `matches`, pas depuis `inchlist`.
- Tout nouveau champ ajouté à une collection existante doit avoir un nom clair et ne jamais écraser un champ déjà existant.

#### Collections impliquées

- `matches` : déjà en place
- `scores` : déjà en place
- À documenter proprement quand l'équipe a plus de temps

---

### Scaling / tier limits

- Le script de scoring peut faire monter le nombre de requêtes et atteindre les limites du tier actuel
- Le tier se débloque automatiquement si la limite est atteinte (facturation au prochain palier)
- Patrick propose de faire une vidéo pour montrer comment monitorer et ajuster
- Option discutée : monter préventivement au tier supérieur pendant l'exécution du script, puis redescendre
- **Règle de sécurité :** le script ne doit être exécuté que par une personne identifiée, communiquée à l'équipe. Éviter les reruns ou rollbacks multiples qui pourraient créer des entités dupliquées ou incohérentes.

---

### Bugs et tâches avant go-live

#### Haute priorité

- Finir tous les bugs de feature et UI sur staging avant toute chose
- **Banner overflow** sur la page skin recommendation : Michele et un membre de l'équipe s'en occupent ensemble

#### Moyenne priorité

- Lucas : revoir les tâches medium priority dans l'onglet "content" de Notion
- **PR analytics de Rémy** : Michele doit la reviewer. Discussion en cours sur l'utilisation de `useEffect` ou non dans l'implémentation.

#### Feature flags

- Un **second feature flag** est nécessaire sur le toggle de la page collection produits
- À ajouter, lier la PR en commentaire de la tâche Notion et tagger Michele

---

### Plan de déploiement

1. Patrick finalise le Q&A sur staging
2. Patrick prévient Diego quand la feature est prête
3. Diego déploie sous feature flag
4. Michele envoie un message à la cohorte de testeurs le lendemain matin

**Michele ne sera pas disponible après 18h30-19h heure Europe le soir du déploiement.** Elle peut répondre sur Slack mais pas intervenir sur la machine.

---

### Actions

- [ ] **Patrick** - Enregistrer une vidéo sur le contrôle du tier/scaling pendant l'exécution du script
- [ ] **Patrick + équipe** - Créer le nouveau champ `inchlist_scientific_split` (ne pas écraser `inchlist`)
- [ ] **Patrick** - Finir tous les bugs et UI issues haute priorité sur staging
- [ ] **Lucas** - Revoir les tâches medium priority dans l'onglet "content"
- [ ] **Michele** - Reviewer la PR analytics de Rémy
- [ ] **Équipe** - Ajouter le second feature flag sur le toggle de la page collection produits
- [ ] **Équipe** - Ajouter les liens PR en commentaire des tâches Notion concernées
- [ ] **Patrick** - Faire le Q&A complet quand la feature est prête
- [ ] **Diego** - Déployer sous feature flag après validation Q&A
- [ ] **Michele** - Envoyer le message de test à la cohorte le lendemain matin
- [ ] **Équipe** - Documenter proprement la feature et les collections quand le temps le permet
