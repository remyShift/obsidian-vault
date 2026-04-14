---
date: 2025-10-07
type: meeting
projet: Oli's Lab
tags: [tech-weekly, olis-lab]
---

# Tech Weekly - 7 octobre 2025

**Participants :** Michele, Patrick, Diego, Lucas, Remy, Andy
**Lien Notion :** https://www.notion.so/olislab/Tech-Weekly-2854bf4c7fa18116b0b1ff2407ce558a

---

## Avancement des projets

### Projet scientifique (Patrick)
- Backend des règles quasi terminé, finalisation prévue dans la journée
- Frontend prévu le lendemain
- Demo concrète attendue jeudi
- Tests en cours sur des vrais produits pour valider la cohérence des règles
- Demande faite à Cindy pour avoir des produits avec un score connu afin de vérifier les résultats

### Cookie consent
- UI validée, passée en "ready for dev"
- Implémentation à venir : toggle tracking PostHog / Google Analytics selon le consentement

### Repo cleanup
- Suppression des scrapers et de quelques dossiers annexes
- Diego prend la main, migration locale avant réouverture sur un nouveau repo si besoin

---

## Qualité du code et architecture

### Internationalisation (i18n)
- **Décision :** pour les textes multi-lignes statiques, on utilise plusieurs clés de traduction (pas de `\n` ni de parsing spécial)
- Pour les données dynamiques venant de Notion (descriptions produit, ingrédients), il faudra parser le rich text Notion correctement
  - Format Notion = objet structuré (pas du markdown lisible), déjà géré pour les articles, à étendre aux champs de base de données
- Rémy : retirer les `\n` restants dans les fichiers de traduction et créer des clés séparées pour les sauts de ligne
- Non-bloquant pour la merge, à faire proprement dans un second temps

### CSS
- Problèmes identifiés :
  - Styles non scopés (les classes s'appliquent globalement)
  - Nommage de classes incohérent
  - Beaucoup de styles inutilisés
  - Media queries pas toujours dans la bonne classe
- Besoin d'une convention : classe parent = nom du composant, tout le reste scopé en dessous
- Lien avec le tracking analytics : les class names tokenisés par Next.js ne sont pas fiables comme sélecteurs d'événements
- Plan : passe de cleanup à planifier + ajout d'IDs stables pour les éléments à tracker

### Déploiement
- Stage frontend : déploiement automatique OK
- Stage backend : encore manuel
- Objectif : automatiser aussi le backend sur stage
- Production : Diego + Michele uniquement pour l'instant

### Migration Next.js
- Direction confirmée : on veut aller sur Next.js
- Question ouverte : Lambda isolées (AWS) vs serveur live (monorepo) ?
- Constat actuel : cold start des Lambdas pénalise les perfs backend
- Diego doit creuser : pour un e-commerce en croissance, quelle architecture est la plus adaptée ?
- Objectif : prendre la décision avant de commencer le pilot, pour ne pas faire la migration deux fois

---

## Priorités d'implémentation

### Analytics & tracking
- Besoin marketing : Google Analytics pour les événements clés
- Événements prioritaires : `add_to_bag`, `subscribe`, `product_view`
- **Approche décidée :**
  - Créer un wrapper `dispatchEvent` / `recordEvent` côté front
  - Le wrapper envoie vers PostHog ET Google Analytics (et demain Meta, TikTok, etc.)
  - Dispatching asynchrone pour ne pas bloquer l'UX
  - Logique dans le frontend (interactions utilisateur), pas dans le backend
- PostHog reste en place (auto-capture + événements custom)
- Google Analytics : à connecter via librairie dédiée
- Sélecteurs CSS jugés non fiables pour le tracking (tokenisation Next.js) : préférer des IDs stables ou des événements explicites

### Homepage & shop page
- Mise à jour mensuelle pour la marque du mois : changement d'images
- Images actuellement dans `/public` : à migrer sur le CDN
- **Tri des produits à implémenter :**
  - Requête backend avec ordre pondéré (marque du mois, SKUs prioritaires, marques secondaires)
  - Dynamique : change chaque mois
  - Remplace le shuffle front actuel
  - Endpoint produits à mettre à jour pour retourner les données déjà triées
- Assigné à Lucas en priorité, Rémy peut reprendre si disponible

### CMS & gestion de contenu
- Notion comme CMS montre ses limites à mesure que le catalogue grandit
- Gestion des traductions particulièrement complexe (pas de CRUD natif propre dans Notion)
- Piste explorée : bases de données liées par langue (FR, IT, etc.) avec sous-ensemble de propriétés à traduire
- Pas urgent, mais le sujet "post-Notion" sera à aborder dès la semaine prochaine

---

## Actions

- [ ] **Patrick** - Finaliser backend des règles scientifiques + démarrer le frontend
- [ ] **Rémy** - Nettoyer les `\n` dans les fichiers de traduction, créer des clés séparées
- [ ] **Rémy** - Implémenter wrapper analytics + connecter Google Analytics (add to bag, subscribe, product view)
- [ ] **Michele** - Review et merge des PRs identifiées en meeting
- [ ] **Lucas** - Mettre à jour homepage/shop page pour la marque du mois + migration images vers CDN
- [ ] **Diego** - Explorer architecture Lambda vs serveur live pour Next.js
- [ ] **Diego** - Mettre en place règles ESLint + Husky (unused vars, taille fichiers)
- [ ] **Diego** - Automatiser le déploiement backend sur stage
- [ ] **Toute l'équipe** - Implémenter le cookie consent + intégration avec le toggle tracking

---

## Notes complémentaires

- Diego envisage d'aller à Chicago autour du 15 octobre pour ~1 mois, avec passage à Montréal
- Rémy a travaillé avec Michele sur un dashboard PostHog en prod (événements e-commerce)
- Le problème des CSS selectors pour PostHog est déjà connu : le CSS selector change à chaque redéploiement Next.js, donc les filtres manuels ne sont pas fiables à long terme
