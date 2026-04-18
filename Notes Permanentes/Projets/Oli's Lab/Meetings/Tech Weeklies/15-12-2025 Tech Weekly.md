---
date: 2025-12-15
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
  - Ante
  - Remy
notion: https://www.notion.so/olislab/Tech-Weekly-2ca4bf4c7fa180c1a126fe3a8b723c61
---

# Tech Weekly - 15 décembre 2025

---

## Updates généraux

### Calendrier des congés
- Michele va créer une adresse `holidays@olislab.com` avec un Google Calendar partagé
- Chaque membre crée ses événements d'absence directement dans ce calendrier
- En attendant : prévenir Michele directement
- Rétrospective de fin d'année prévue cette semaine (pas mercredi, Lucas a une soutenance de thèse à laquelle il assiste comme jury)

### Standards de code chez Oli's Lab
- Michele insiste sur l'adoption des pratiques Oli's Lab en plus des bonnes pratiques générales
- Exemple : utiliser les `spacer` au lieu des `margin` directement
- Réflexe attendu : avant de faire un choix d'implémentation, vérifier si un standard existe déjà (channel `#design-lab` ou `#tech`). S'il n'existe pas, proposer d'en créer un.
- Lucas souligne le besoin d'un **audit design system** : beaucoup de composants dupliqués dans le code (typographies, boutons, titres) avec des propriétés copiées au lieu d'être partagées. À documenter avant la migration vers Next.js pour savoir quoi abstraire.

---

## État des projets en cours

### Cloud Integrations / Klaviyo (Patrick)
- Tâche documentée et assignée à Patrick
- Extension de ce qui est déjà fait pour la newsletter et l'événement `placed_order`
- Objectif : mieux comprendre les clients (qui achète, combien, fréquence) et améliorer l'expérience email
- Flows à couvrir : referral flow + suite de la welcome series (post-inscription + post-création de compte)
- Michele va enregistrer un Loom explicatif pour Patrick

### SEO (Diego)
- Sitemap : déjà fait en local
- Reste : headers sur les pages produit, article, marques
- Bloquant : Diego n'a pas encore accès à Search Console / Analytics
- Estimation : 1 journée max une fois l'accès obtenu
- Michele doit lui donner l'accès

### Footer update (Lucas)
- PR toujours ouverte, des échanges entre Diego et Lucas sur des ajustements
- Lucas doit faire un dernier passage pour implémenter tous les changements discutés
- Michele va organiser une session de pair review demain pour débloquer et merger

### Mondial Relay (Rémy)
- La grosse PR Mondial Relay est en train d'être découpée en PRs plus petites et scopées
- Stratégie : rebase depuis la branche principale, sélection de commits groupés par thème, ouverture de PRs séparées
- Objectif : terminé d'ici vendredi

### Détection pays / API externe (Diego)
- Bug : l'API externe utilisée pour détecter le pays des utilisateurs a une limite de 1 000 requêtes/jour
- On la dépassait car chaque connexion déclenchait un appel (pas seulement le checkout)
- Fix : utiliser les headers CloudFront à la place (déjà disponibles, plus fiables)
- PR en cours. Migration définitive de l'API externe prévue l'année prochaine si CloudFront se confirme.

---

## Feature principale : "Recommended For Me"

### Vision générale
- La recommandation personnalisée de produits est **la différenciation centrale d'Oli's Lab** par rapport à un e-commerce standard
- Objectif long terme : intégrer une API de scan de peau par IA (vision computer) pour extraire les données cutanées visuellement. Prévu pour l'année prochaine.
- Pour l'instant : formulaire de questions textuelles

### Parcours utilisateur
1. L'utilisateur répond à **8 questions** sur sa peau et ses préoccupations (type de peau, allergies, fragrances, grossesse/allaitement, etc.)
2. Si l'utilisateur ne connaît pas son type de peau : sous-questions spécifiques (6 questions avec 4 réponses chacune, résultat calculé par prévalence de réponse A/B/C/D)
3. Un **skin resume** est créé et sauvegardé
   - Utilisateur anonyme : local storage / session
   - Utilisateur connecté : dans son profil
4. Sur chaque page de collection, un toggle "Recommended for you" filtre les produits correspondant au profil

### Points d'entrée dans l'app (MVP)
- Homepage (nouveau bloc UI à intégrer)
- Footer : lien "Discover my skin"
- Pages collection produits : bouton/filtre "Recommended for you"
- Processus de création de profil (étape optionnable)

### Comportement du filtre
- Peut être activé/désactivé par l'utilisateur (pour acheter pour quelqu'un d'autre, par exemple)
- Si pas de skin resume : clic sur le filtre ouvre le formulaire
- Michele préfère un **filtre toggle explicite** plutôt qu'une section auto-insérée dans les résultats (pour forcer l'action et convertir à la création de profil)
- À terme : fusion avec les "curated settings" via un concept de "best match" (pas encore défini)

### Architecture technique
- **Défi principal :** merger les données du rating system scientifique avec les données du shop pour permettre le filtrage
- Les attributs produits (concerns, fragrance, grossesse, etc.) viennent de deux sources :
  - Attributions directes sur le produit (déjà en place)
  - Données extraites par le rating system (ex. potentiel allergénique, fragrances détectées dans les ingrédients)
- Patrick doit identifier quelles données du rating system doivent être copiées/référencées dans les collections shop
- Cindy doit valider/compléter les conditions de matching pour chaque question du formulaire
- Diego prend le lead technique : planification des étapes, estimation, identification des manques

### Timeline MVP
- **Cette semaine :** Patrick passe en revue les conditions du formulaire et tague Cindy pour ce qui manque
- **Mercredi :** réunion scientifique (Diego + Patrick + Michele + Cindy) pour valider les données disponibles et les schémas
- **Vendredi :** Ante livre l'UX complète du MVP (formulaire, 3 points d'entrée, toggle dans les collections)
- **Objectif :** feature en prod avant fin décembre, ou première semaine de janvier au plus tard

---

## Deploy du jour
- Un deploy en prod est prévu (Diego envoie un message dans le channel tech avec la liste des changements)
- Chaque dev doit tester sa feature sur staging avant que ça parte
- Bundles update : Diego et Michele se retrouvent après le meeting pour préparer ça

---

## Actions

- [ ] **Michele** - Créer `holidays@olislab.com` + Google Calendar partagé
- [ ] **Michele** - Planifier la rétrospective cette semaine
- [ ] **Michele** - Enregistrer un Loom explicatif pour Patrick sur le projet Cloud Integrations
- [ ] **Patrick** - Lire la documentation Cloud Integrations et démarrer l'implémentation
- [ ] **Michele** - Donner accès Search Console / Analytics à Diego
- [ ] **Diego** - Finir le SEO (sitemap + headers)
- [ ] **Lucas** - Finaliser les changements sur la PR footer, session de review avec Michele
- [ ] **Rémy** - Découper les PRs Mondial Relay d'ici vendredi
- [ ] **Diego** - Merger la PR fix détection pays (CloudFront headers)
- [ ] **Patrick** - Passer en revue les conditions du formulaire skin type, tagger Cindy sur les manques
- [ ] **Diego** - Ajouter Patrick à la réunion scientifique mercredi
- [ ] **Diego** - Planifier les étapes techniques de la feature "Recommended For Me" + estimation
- [ ] **Ante** - Livrer l'UX complète du MVP "Recommended For Me" vendredi (formulaire + 3 points d'entrée + toggle)
- [ ] **Lucas + Ante** - Faire l'audit design system : identifier les composants/typographies dupliqués
- [ ] **Diego** - Organiser le deploy en prod + notifier l'équipe de ce qui part

---

## Notes complémentaires

- Michele rappelle la philosophie produit : les features scientifiques doivent primer sur les features e-commerce standard. Le "Recommended For Me" est la manifestation concrète de ce choix.
- Le formulaire skin type doit gérer le cas "je ne connais pas mon type de peau" avec un sous-flux de questions (logique de prévalence A/B/C/D sur 6 questions)
- Le formulaire sera dans une popup adaptative (width dépend du container), pas une page dédiée
- Lucas : ne pas s'investir trop sur la navbar pour l'instant, focus sur le footer et l'audit design system
