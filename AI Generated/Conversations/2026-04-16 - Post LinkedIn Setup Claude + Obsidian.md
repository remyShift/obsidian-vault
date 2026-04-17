---
source: ai
---

# 2026-04-16 - Post LinkedIn Setup Claude + Obsidian

**Domaine :** Workflow / Créatif
**Statut :** Synthèse brute - à intégrer dans les notes permanentes si pertinent

---

## Contexte

Session de ghostwriting LinkedIn. Rémy voulait rédiger un post expliquant son setup Claude + Obsidian, inspiré de Karpathy, en insistant sur l'adaptation personnelle plutôt que la copie du système.

## Points clés

- Le post s'appuie sur la popularisation du combo Claude + Obsidian par Karpathy comme point d'entrée
- Le système repose sur une connexion MCP entre Claude (claude.ai et Claude Code) et Obsidian
- Commandes manuelles choisies volontairement : /wrap (synthèse de chat), /recap (résumé session de code), /evolve (comparaison hebdomadaire AI Generated vs Notes Permanentes)
- Les notes générées vont dans AI Generated/Conversations/ et AI Generated/Sessions/{projet}
- Un hook sessionStart dans Claude Code injecte les X notes récentes du projet en contexte au démarrage
- Le caractère manuel des commandes est une décision de design : éviter que tout finisse dans les notes, rester maître de ce qui est conservé
- Plusieurs itérations sur l'intro pour trouver le bon angle (ni name-drop creux, ni trop conceptuel)
- 5 propositions de CTA ont été soumises pour que Rémy choisisse

## Décisions prises

- Intro retenue : "Karpathy a popularisé le combo Claude + Obsidian, moi j'ai décidé de l'adapter plutôt que de le copier."
- Rémy a retravaillé le corps du post lui-même, la session s'est terminée sur la correction orthographique et le choix du CTA

## Actions à faire

- [ ] Choisir un CTA parmi les 5 proposés et finaliser le post
- [ ] Publier

## À intégrer dans

- Note permanente sur le workflow Claude + Obsidian (si elle existe)
- Note sur la ligne éditoriale LinkedIn de Rémy
