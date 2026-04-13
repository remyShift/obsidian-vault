---
source: ai
---

# 2026-04-13 — Audit et enrichissement notes Clean Code & Craft

**Domaine :** Code
**Statut :** Synthèse brute → à intégrer dans les notes permanentes si pertinent

---

## Contexte

Revue complète des notes existantes sur le Clean Code, les bonnes pratiques et les tests. Objectif : identifier les manques par rapport aux références (Uncle Bob, Refactoring Guru, GoF) et enrichir le vault en conséquence.

---

## Points clés

- Les notes existantes couvraient correctement la philosophie générale (KISS, DRY, YAGNI, SOLID, TDD, FIRST, doublures de tests) mais manquaient de toute la partie opérationnelle.
- Cinq grandes lacunes identifiées : design patterns (absent), code smells (absent), Loi de Déméter (citée mais non définie), Coupling & Cohesion (absent), TDD Outside-In vs Inside-Out (absent).
- Toutes les notes manquantes ont été créées dans `Notes de Lecture/Clean Code & Craft/`.
- 10 notes existantes ont été modifiées pour corriger les liens morts, formaliser les références informelles et connecter les nouveaux concepts.
- Une intro au DDD a été créée avec les 8 concepts clés (Entity, Value Object, Aggregate, Repository, Domain Service, Ubiquitous Language, Bounded Context, Domain Model) identifiés comme notes dédiées à créer à terme — chacun taggé `#TODO` dans un callout.
- Le lien `[[Domain-Driven Design]]` dans `Software Craft.md` a été mis à jour (n'était plus un `#TODO`).
- Principe retenu pour la suite : éviter le gras excessif dans les notes — le réserver aux termes vraiment centraux.
- Principe retenu pour les liens : ne pas référencer une même note à plusieurs endroits sauf extrême pertinence.

---

## Décisions prises

- Les notes de lecture vont dans `Notes de Lecture/Clean Code & Craft/` — à assimiler avant intégration dans les notes permanentes.
- Les design patterns sont séparés en trois fichiers (Creational, Structural, Behavioral) avec `Design Patterns.md` comme sommaire.
- `Patterns de Refactoring.md` est le sommaire des techniques de refacto, pas `Design Patterns.md`.
- Les 8 concepts DDD tactiques et stratégiques auront chacun leur note dédiée — à créer au fur et à mesure de l'approfondissement.

---

## Actions à faire

- [ ] Assimiler les notes de lecture créées avant de les intégrer dans les notes permanentes
- [ ] Créer les 8 notes dédiées DDD quand prêt : Ubiquitous Language, Bounded Context, Domain Model, Entity, Value Object, Aggregate, Repository (DDD), Domain Service
- [ ] Créer les notes `#TODO` restantes dans `Software Craft.md` : Techniques de Refactoring
- [ ] Explorer les 6 pistes d'approfondissement DDD dans l'ordre suggéré (Context Mapping → Domain Events → CQRS → Event Sourcing → ...)

---

## À intégrer dans

- `Notes Permanentes/Code/Craft/Clean Code/` — une fois les notes de lecture assimilées, les concepts peuvent alimenter les notes permanentes existantes
- `Notes Permanentes/Code/Craft/Software Craft.md` — déjà mis à jour pour DDD
