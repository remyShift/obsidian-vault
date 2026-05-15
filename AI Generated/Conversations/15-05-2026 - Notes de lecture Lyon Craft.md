---
source: ai
---

# 15-05-2026 - Notes de lecture Lyon Craft

**Domaine :** Code / Workflow
**Statut :** Synthèse brute -> à intégrer dans les notes permanentes si pertinent

---

## Contexte

Suite à Lyon Craft 2025, Rémy a partagé ses notes brutes sur une série de sujets abordés durant les 2 jours de conférence. L'objectif était de créer une note de lecture dans `Notes de Lecture/Inbox/` pour chacun d'eux, prête à être traitée ensuite en notes permanentes.

---

## Points clés

- Toutes les notes suivent la même structure : frontmatter avec `tags:` vide uniquement (Rémy gère les tags lui-même), contenu, section `## À faire` avec checkboxes, section `## Sources` en fin de note
- La note `CQRS - Event Sourcing` a été scindée en 3 notes distinctes : `CQRS`, `Event Sourcing`, `CQRS + Event Sourcing` - l'ancienne note a été réduite à un stub de redirection
- La `Méthode Mikado` a eu droit à une note enrichie avec sources externes (Vinta Software, Matthias Noback, Martin Reigosa) en plus de la note de synthèse issue du talk

---

## Notes créées

- `TDD et au-dela - Gamble TDD & Methode Mikado.md` - note brute du talk
- `Méthode Mikado.md` - note dédiée enrichie avec sources externes
- `Tests Paramétriques.md`
- `Tests de Propriétés.md`
- `Value Object.md`
- `CQRS.md`
- `Event Sourcing.md`
- `CQRS + Event Sourcing.md`
- `Loi de Goodhart.md`
- `Bus Factor.md`
- `Dépendance sans Couplage.md`
- `Mapped Types TypeScript.md`
- `DTO.md`
- `SDK.md`
- `Terraform.md`

---

## Décisions prises

- Frontmatter = `tags:` vide uniquement, pas de `created`, `type`, `status`, ni `sources` en frontmatter
- Sources toujours en bas de note dans une section `## Sources`, pas dans le frontmatter
- Les notes sans sources externes n'ont pas de section Sources

---

## Actions à faire

- [ ] Passer les notes de l'Inbox en notes permanentes pour les sujets suffisamment clairs
- [ ] Supprimer manuellement `CQRS - Event Sourcing.md` depuis Obsidian (stub de redirection)
- [ ] Relier les notes entre elles via wikilinks (Value Object <-> CQRS, DTO <-> Mapped Types, etc.)
