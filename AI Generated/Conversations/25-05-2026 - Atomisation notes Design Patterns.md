---
source: ai
---

# 25-05-2026 - Atomisation notes Design Patterns

**Domaine :** Code / Workflow  
**Statut :** Synthèse brute -> à intégrer dans les notes permanentes si pertinent

---

## Contexte

Restructuration du dossier `Notes Permanentes/Code/Craft/Design Patterns/` dans le vault Obsidian. Le contenu existant était organisé en 3 notes de groupe (Creational, Behavioral, Structural) avec tous les patterns détaillés à l'intérieur. L'objectif était d'atomiser : une note par pattern, les notes de groupe devenant de simples index de navigation.

## Points clés

- 4 fichiers existants analysés : `Design Patterns.md`, `Design Patterns Creational.md`, `Design Patterns Behavioral.md`, `Design Patterns Structural.md`
- 13 patterns identifiés et extraits : Factory Method, Abstract Factory, Builder, Singleton, Prototype (Creational) / Strategy, Observer, Command, State, Template Method, Chain of Responsibility, Iterator (Behavioral) / Adapter, Facade, Decorator, Proxy, Composite (Structural)
- Chaque note individuelle suit un format cohérent : problème résolu, code JS/Node concret, erreurs classiques en `###`, différences avec patterns proches, liens internes
- Exemples Oli's Lab intégrés dans le flux où c'était pertinent (Builder pour fixtures de test, State pour le cycle de vie d'une commande, Adapter pour les intégrations Stripe/Klaviyo, Facade pour un CheckoutFacade, Composite pour les catégories produit)
- Les 3 notes de groupe ont été réécrites : chaque pattern est maintenant une ligne + lien `[[...]]`, tableau récap conservé pour vue d'ensemble rapide
- La note `Design Patterns.md` (vue d'ensemble conceptuelle) n'a pas été modifiée

## Décisions prises

- Format de note individuelle acté : pas d'intro formelle, prose courte + code + listes, erreurs classiques en h3, exemples Oli's Lab dans le flux jamais en section dédiée, liens `[[...]]` généreusement utilisés
- Notes de groupe = index uniquement, pas de contenu détaillé

## À intégrer dans

- Le style des notes individuelles créées ici peut servir de référence pour atomiser d'autres groupes de notes (SOLID, Clean Architecture, DDD tactique...)
