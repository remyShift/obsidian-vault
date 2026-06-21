---
updated: 21-06-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Dernière mise à jour
21-06-2026 - Polissage splashboard : dashboards passés 100% statiques (fin du blocage 2s), citation affichée en entier mono-ligne, hook cd en `--on-cd` (plus de splash home parasite dans les sous-dossiers). Note `Setup Shell.md` + chezmoi push faits.

## État du projet
- **Splashboard stabilisé.** Deux dashboards perso : `home` (date figlet, citation, countdown Corée, world clock perso, météo Lyon/Séoul, calendrier, système, Hacker News) et `project` (nom repo, git live status/commits/tag, mes PRs/reviews GitHub, analytics code). Thème synthwave_84. Token github via `~/.splashboard/secrets.toml`. Documenté dans `Notes Permanentes/Code/Setup Shell.md`.
- **Tout statique par choix** : la fenêtre `ANIMATION_WINDOW` de 2s est codée en dur dans splashboard 2.9.0 (tout widget animé gèle le terminal 2s ; `duration_ms` ne change que la vitesse, pas le blocage, aucun réglage global). Hero en `text_ascii` figlet `ansi_shadow`, citation en `text_plain` centrée pleine largeur.
- **Harnais shell stable** : fish login shell, dotfiles 100% chezmoi (`remyShift/dotfiles`) + Brewfile, hook git `commit-msg` anti co-author.

## Faits récents importants
- Splashboard : `random_quote` = une seule chaîne, **aucun word-wrap** (grep `wrap` sur catalog = vide) -> citation 2-lignes impossible nativement. Résolution dashboard = **racine de repo uniquement** (sinon home), d'où le `--on-cd` sur le hook cd. `text_ascii` = figlet statique, `text_plain` = texte statique aligné.
- Écriture vault : toujours `Write`, jamais `mcp__obsidian__*` (bug latin1). Mention IA dans les commits garantie absente par le hook `commit-msg`.
- **Bash de Claude = `/bin/zsh` figé sans TTY** : ne rend PAS les TUI (splashboard) -> valider via parse TOML / `splashboard catalog` / strings du binaire, le visuel passe par les screenshots de Rémy.

## Décisions actives
- Terminal instantané > animation : compromis tranché côté statique (validé par Rémy).
- Citation mono-ligne assumée, pas de bascule vers `random_fortune` (dénaturerait le widget).
- `secrets.toml` comme canal token github (refus env global / gh stockage fichier), ignoré git + chezmoi.
- Backlog harnais dans `AI Generated/`. Faux positif d'audit se reclasse dans le rapport `/evolve`, pas en memory.

## Prochaines étapes
- **Rémy : régénérer le token GitHub** (compromis via screenshot) avec scope `notifications`, puis réécrire `secrets.toml`.
- Reliquats Rémy : `sudo rm` python.org, rotation mdp Mongo Atlas, suppr backup `~/shell-migration-backup-*`, tester `/coach`.
- Optionnel : splash home en entrant dans un dir hors-repo (logique fish custom) ; widget PR titre-seul via ReadStore ; `yazi` ; pimper `starship.toml` Dracula ; remontée upstream splashboard (render non-bloquant pendant l'anim).
