---
date: 2026-04-30
type: meeting
projet: "Oli's Lab"
tags:
  - olis-lab
participants:
  - Diego
  - Michele
  - Remy
lien: https://www.notion.so/olislab/Automated-Translation-SEO-3514bf4c7fa1808ca94be6a1c897b16f?pvs=189#3514bf4c7fa180d1addef7820435976c
---

## Huddle : Automated Translation & SEO Plugin

---

### Contexte

Réunion sur la stratégie de traduction automatisée des contenus Payload CMS et la génération automatique de SEO. L'équipe a une traductrice (Suze) qui reviendra sur toutes les traductions, mais le besoin est d'avoir un premier jet automatique pour ne pas lui faire tout faire depuis zéro.

---

### Décision principale : plugin Payload plutôt que solution custom

#### Pourquoi le plugin

- L'usage est minoritaire : 80% du temps on édite du contenu déjà localisé, et la création de nouveaux documents est sporadique (mensuelle environ)
- Pour un usage aussi rare, maintenir une solution custom (à tester, reviewer, maintenir) n'a pas de sens
- Le plugin fournit la fonctionnalité out-of-the-box
- Si des besoins plus fins arrivent dans 6 mois, on pourra développer quelque chose de plus complet à ce moment

#### Workflow de traduction décidé

- Tout le contenu est créé en anglais en premier, toujours
- Une fois le document anglais finalisé, on clique "translate" dans le CMS
- Le plugin traduit tous les champs localisés vers le français
- Suze (traductrice) revoit et corrige les traductions automatiques
- Les champs non localisés (ex. relations comme `subcategory`) ne sont pas traduits, c'est attendu

#### Edge case : mise à jour d'un champ anglais après traduction française

- Si on retouche un champ source anglais, le plugin retraduit les champs français correspondants, ce qui écrase les corrections manuelles éventuelles de Suze
- L'équipe juge ce risque acceptable : le process normal est de finir l'anglais avant de traduire. Version control couvre le reste si besoin.
- Les champs côté langue cible (français) ne déclenchent pas de retraduction vers l'anglais.

---

### SEO auto-generation

- Le même plugin couvre aussi la génération automatique de SEO title et SEO description
- Fonctionnement : prompt engineering vers OpenAI, le document entier est passé en contexte, le plugin génère les deux champs
- Le SEO plugin officiel de Payload expose déjà les fonctions `generateTitle` et `generateDescription`, on peut s'appuyer dessus en injectant juste le prompt et la connexion OpenAI
- Suze peut définir dans le futur un ton de voix pour affiner les prompts SEO
- SEMrush sera connecté pour évaluer l'efficacité SEO a posteriori

#### SEO plugin : standalone ou intégré

- Le plugin SEO est une dépendance séparée, installable indépendamment
- Même chose pour le plugin de traduction : peut être installé seul
- Initialement l'équipe pensait que c'était un seul gros package, ce n'est pas le cas

---

### Détails techniques

#### API OpenAI

- Un token OpenAI Oli's Lab existe déjà dans le codebase (fichiers YAML)
- Michele va ajouter des crédits au compte et créer un projet dédié pour les traductions
- Modèle visé : un modèle cheap (type `mini`) car les besoins en logique sont faibles
- Coût estimé : ~$10/mois, à monitorer
- Facturation à la consommation, pas de subscription nécessaire pour l'API

#### Support rich text

- Le plugin supporte le rich text Lexical (éditeur utilisé dans Payload)

#### Note sur la maintenance du repo

- Le repo du plugin de traduction n'est plus maintenu depuis 2 ans
- L'équipe en est consciente mais juge le risque acceptable pour un usage interne

#### Pourquoi Payload et pas Sanity/Contentful

- Question soulevée pendant la réunion, clarification apportée par Michele :
  - Payload est free et open source
  - Self-hosted : on possède la base de données, pas de vendor lock-in
  - Les autres CMS SaaS (Sanity, Contentful) : on paye le hosting, les membres, les features, et on n'a pas accès direct à la data
  - Payload est un hybride framework/CMS, proche des devs, facile à intégrer
  - Ce que construit Oli's Lab c'est un e-commerce (scanner, shop, actives), pas un outil CMS

---

### Actions

- [ ] **Remy** - Installer et configurer le plugin de traduction automatique
- [ ] **Remy** - Tester la clé OpenAI existante dans les fichiers YAML
- [ ] **Remy** - Compléter l'implémentation d'ici demain (jeudi)
- [ ] **Diego** - Reviewer l'implémentation après completion
- [ ] **Michele** - Ajouter des crédits au compte OpenAI Oli's Lab
- [ ] **Michele** - Créer un projet OpenAI dédié pour les traductions
- [ ] **Team** - Monitorer la consommation OpenAI une fois en prod

### Timeline

- Remy a déjà testé le plugin de traduction en local
- Implémentation cible : demain (jeudi)
- Review par Diego : dans la foulée
- Mise en prod cible : semaine prochaine
