---
date: 2026-04-28
type: meeting
projet: "Oli's Lab"
tags:
  - olis-lab
participants:
  - Kyle
  - Diego
  - Remy
lien: ""
---

## Huddle : Search Support - CRA

---

### Contexte

Session de grooming sur la page de recherche. L'objectif est d'aligner l'équipe sur l'approche d'implémentation avant de commencer, avec une intention particulière sur le fait que ce code sera porté vers Next.js dans un second temps.

---

### Décisions techniques

#### Localisation et stack

- La page de recherche sera d'abord implémentée dans le CRA, puis portée vers Next.js
- **CSS modules** à utiliser (pas Tailwind, non implémenté dans le CRA)
- Pas de librairies externes (pas de Shadcn ou autre)

#### Composants

- **Pas de composant grid réutilisable dans le package UI** : chaque type de grid (products, brands, actives, articles) sera géré au cas par cas. Les grids sont assez simples pour ne pas justifier une abstraction.
- **Tabs** : refactorer le composant existant si pas trop complexe, sinon en construire un nouveau
- **Composants stateless** : rendre les composants stateless autant que possible pour faciliter le port vers Next.js

#### Search

- Pas besoin de toucher l'endpoint suggestions (réservé à l'expérience modale)
- Input avec debouncing, 4 endpoints backend distincts, pas de pagination sur les résultats
- La réponse de l'API retourne tous les types de ressources en une seule réponse (products, brands, actives, articles) avec les counts par type, ce qui simplifie le rendu par tabs

---

### Ordre d'implémentation

1. **Page skeleton** (bloquant pour tout le reste)
2. Search + affichage des produits
3. Extension aux autres collections (brands, actives, articles) dans les tabs
4. Nettoyage des composants dupliqués après dépréciation du feature flag
5. Nettoyage API (déprioritisé)
6. Filtres (peut être réordonné avec le cleanup)

#### Ce que couvre le skeleton

- Layout avec hero image et search input
- Filtres persistants sur tous les types de résultats
- Routes et structure de base de la page
- Types et dépendances
- Feature flag pour cacher/afficher la page

---

### Contexte produit & priorités

- Les priorités actuelles de la boîte sont les pages core du user journey : PLP, PDP, checkout (performance et conversion)
- La migration search vers le nouveau serveur et Payload n'est pas prioritaire pour l'instant
- La recherche actuelle lit les collections MongoDB. La version Next.js lira Payload, mais Payload n'est pas encore fully released à l'équipe
- Le feature flag sera déprécié après quelques semaines, avec nettoyage de tout le dead code associé (important pour le bundle size du CRA)

---

### Actions

- [ ] **Remy** - Implémenter le page skeleton (bloquant pour tout le reste)
- [ ] **Remy** - Implémenter search + affichage des produits
- [ ] **Remy** - Étendre la search aux autres collections dans les tabs (brands, actives, articles)
- [ ] **Remy** - Nettoyer les composants dupliqués après dépréciation du feature flag
- [ ] **Kyle + Remy** - Discuter du cleanup API en async
