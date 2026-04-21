---
date: 2025-10-08
type: meeting
projet: Oli's Lab
tags:
  - tech-weekly
  - analytics
  - posthog
  - traductions
  - inci-scanner
  - olis-lab
participants:
  - Michele
  - Patrick
  - Diego
  - Lucas
  - Ante
  - Remy
lien: https://www.notion.so/olislab/Tech-Standup-2864bf4c7fa181398a28db44826305a5?pvs=189#d6061f7047de4d319c9ccc5baa985a3d
---

# Tech Weekly - 8 octobre 2025

---

## Avancement des projets

### Google Merchant Integration (Rémy)
- Quasi finalisée, Rémy finalise les corrections sur les problèmes de langues
- Considérée comme presque fermée

### Analytics (Rémy)
- Rémy démarre le travail sur le reporting des événements analytics
- Approche : développer d'abord avec PostHog pour pouvoir tester en local et sur stage
- Une fois PostHog en place, connexion Google Analytics à suivre
- Michele étudie les capacités de GA4 en parallèle
- **Event wrapper décidé avec Diego :** un wrapper centralisé collecte les événements et les dispatche vers PostHog puis vers tous les autres outils analytics à connecter (GA4, Meta, TikTok...). Le data payload est commun, seuls le nom d'événement et le type de connexion peuvent varier selon les services.
- Objectif : avoir une démo fonctionnelle le lendemain pour la réunion à Paris avec Nicola (responsable performance marketing)

### Clés API PostHog
- Les clés ne sont pas dans le repo pour l'environnement local (non committées)
- Diego peut les partager via Slack
- Règle : ne setter les clés localement que quand on travaille activement sur PostHog, pour éviter de polluer les events en permanence
- Les variables d'environnement sont à laisser en place quelques semaines le temps de mettre à jour le pipeline de déploiement avant de les retirer du repo

### Optimisation des assets (Lucas)
- Nettoyage du dossier `/public` en cours : 150 Mo, beaucoup d'images inutilisées et de doublons
- Gain déjà obtenu : environ 20 Mo
- PR non encore mergée car des doublons subsistent (même image, noms différents, références différentes dans le code)
- Prochaine étape : migration vers le format Avif pour une meilleure compression
- Impact attendu sur le temps de chargement, même si limité jusqu'au changement d'infrastructure

### Infrastructure (Diego)
- Diego travaille sur une nouvelle infrastructure (serveur live ou lambdas supplémentaires)
- Achèvement prévu dans 1 à 2 semaines
- Permettra de mesurer les gains de performance réels

---

## Roadmap et prochaines features

### Priorités immédiates (semaines en cours)

| Feature | Responsable | Deadline estimée |
|---|---|---|
| Skincare rating system | Patrick | Vendredi + 1 semaine de tests |
| GA4 + Google Tag Manager | Rémy | En cours |
| Filtrage et tri produits | Lucas | Fin de semaine |
| Cookie consent banner | Diego | Semaine prochaine |

### Traductions et CMS (sujet majeur)

**Situation actuelle :**
- Le contenu dynamique (produits, bundles, marques, actives, articles, edits) est traduit automatiquement via Google Translate à chaque mise à jour depuis Notion
- Les fichiers JSON du repo gèrent le contenu statique, mais nécessitent un redéploiement à chaque modification
- Problème principal : quand un champ est mis à jour en anglais, la traduction automatique écrase les traductions humaines éventuellement corrigées manuellement

**Langues cibles :** français, italien, espagnol, allemand, potentiellement portugais

**Solutions discutées :**

1. **Approche double champ + flag (Patrick)** : un champ pour la traduction automatique, un champ pour la traduction manuelle, avec un flag pour choisir laquelle utiliser. La traduction automatique se met toujours à jour, la manuelle est protégée si le flag est activé.
2. **Règle sur la chaîne anglaise** : si la string anglaise n'a pas changé, ne pas écraser la traduction existante. Si elle a changé, relancer la traduction automatique.
3. **Strapi comme CMS** : Rémy propose Strapi, qu'il a utilisé dans une précédente expérience. Permet une gestion des traductions accessible aux non-techniques, avec un bouton pour déclencher la traduction automatique. Michele veut évaluer la solution.
4. **AppSmith** : interface low-code connectée directement à MongoDB pour permettre aux traducteurs d'aller corriger les traductions sans accès à la base de données en direct.
5. **Localize** : outil avancé intégrant GitHub et Figma pour voir les traductions in situ dans les designs, mais trop cher (800€/mois) et trop avancé pour les besoins actuels.

**Décision provisoire :**
- Priorité : refactorer les automations Notion en retirant Make du flux. L'objectif est d'aller directement de Notion vers le serveur sans ce miroir intermédiaire, et de passer par une lambda dédiée.
- Ensuite : revoir les schémas de base de données (ajout de timestamps `created_at` / `updated_at`, nettoyage des champs obsolètes) car indispensable pour implémenter la logique d'override ou non des traductions.
- Évaluation Strapi à mener. Si setup facile, migration envisageable.
- Michele veut réorganiser les pages Notion et construire des vues CMS structurées en attendant.

### InciScanner (feature post-novembre)

Feature existante à réviser et relancer. Principe : scanner le code barre ou l'étiquette d'un produit pour obtenir une notation et l'explication détaillée (ingrédients, règles appliquées).

**Contraintes techniques identifiées :**
- Aucun API public fiable ne fournit systématiquement la liste des ingrédients à partir d'un code barre
- Yuka utilise un API connu de l'équipe pour la reconnaissance du code barre (titre du produit trouvé la plupart du temps), mais les ingrédients sont souvent absents
- Solution multi-niveaux prévue :
  1. Scan du code barre → recherche dans les BDD publiques
  2. Si non trouvé → recherche dans la BDD interne (scraping existant, notamment via le scraper Shopify)
  3. Si non trouvé → OCR de l'étiquette ingrédients en photo de secours
  4. Si non trouvé → saisie manuelle par l'utilisateur
- Estimation : 50 à 60% des produits européens de marques connues sont couverts par le code barre

**Lien avec le projet scientifique (Patrick) :** la logique de matching d'ingrédients et de rating est commune. Cindy continuera à alimenter le système de matching quand une association n'est pas trouvée automatiquement.

**Scope :** produits hors catalogue Oli's Lab inclus. La pari est que si un produit concurrent est bien noté, ce n'est pas grave ; si notre produit fait mieux, l'utilisateur le voit.

**Vision future :** si la BDD de produits et d'ingrédients devient suffisamment riche, ouverture d'une API publique (freemium ou payante). Sujet légal à anticiper.

### Recommandations personnalisées (post-InciScanner)
- Permettre à l'utilisateur de construire une routine ou un bundle personnalisé
- Recommandations basées sur les problèmes de peau déclarés
- Homepage et profil de plus en plus personnalisés
- Approche : construire sur Next.js dès que la migration est en bonne voie (Diego)

---

## Front-end et design system

Diego et Ante convergent sur la nécessité de guidelines CSS avant d'attaquer les nouvelles features.

**Problèmes identifiés :**
- Styles non scopés, classes globales qui se marchent dessus
- Répétition des styles de boutons, inputs et autres composants de base
- Nommage incohérent, media queries mal placées
- CSS total massif avec beaucoup d'inutilisé

**Plan :**
- Diego rédige des guidelines (BEM ou équivalent validé en équipe)
- Ante implémente ces guidelines dans la librairie Figma
- Pour chaque nouvelle feature, le développeur front valide que la structure des composants Figma suit bien les guidelines avant d'implémenter
- Pour le code existant : adapter progressivement à chaque rework, ne pas laisser proliférer les mauvais patterns

---

## Actions

- [ ] **Rémy** - Terminer l'intégration Google Merchant et les corrections de langues
- [ ] **Rémy** - Implémenter le reporting analytics avec PostHog (event wrapper) et préparer la démo pour Paris
- [ ] **Patrick** - Finaliser le skincare rating system d'ici vendredi
- [ ] **Lucas** - Terminer le nettoyage des assets et finaliser la PR (doublons, migration Avif)
- [ ] **Lucas** - Implémenter le filtrage et tri produits
- [ ] **Diego** - Finaliser la nouvelle infrastructure (live server ou lambdas)
- [ ] **Diego** - Implémenter le cookie consent banner
- [ ] **Diego** - Rédiger les guidelines CSS et composants
- [ ] **Diego** - Partager les clés API PostHog sur Slack
- [ ] **Michele** - Évaluer Strapi comme solution CMS et traductions
- [ ] **Michele** - Réorganiser les pages Notion et construire des vues CMS structurées
- [ ] **Ante** - Implémenter les guidelines design dans la librairie Figma
- [ ] **Équipe** - Refactorer les automations Notion pour retirer Make du flux (Notion → serveur direct)
