---
updated: 20-06-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Dernière mise à jour
20-06-2026 - Grosse journée (recap unique `20-06-2026_10-58`) : outils shell + helpers git fzf, passe `/evolve`, migration zsh -> fish, `/improve` (hook anti co-author), et **après-midi : deux dashboards splashboard custom (home + project), token GitHub résolu via `secrets.toml`**.

## État du projet
- **Splashboard** : 2 dashboards perso opérationnels. `home` (date figlet animée, citation, countdown Corée, world clock perso, météo Lyon/Séoul, système, Hacker News) et `project` (repo animé, git live, mes PRs/reviews GitHub, analytics code). Thème synthwave_84. Token github via `~/.splashboard/secrets.toml` (seul canal qui marche, l'env est strippé par le sandbox réseau). Documenté dans `Notes Permanentes/Code/Setup Shell.md`.
- **Harnais stable et durci.** Migration full fish faite (login shell), zsh réduit à `.zshenv` (shims mise). `/evolve` durci (A1/A4 clos), `/improve` opérationnel, hook git anti co-author. Dotfiles 100% reconstructibles : chezmoi (`remyShift/dotfiles`) + Brewfile.

## Faits récents importants
- Écriture vault : toujours `Write`, jamais `mcp__obsidian__*` (bug latin1). Mention IA dans les commits garantie absente par le hook `commit-msg`.
- **Bash de Claude = `/bin/zsh` figé sans TTY** (snapshot `~/.claude/shell-snapshots/`) : ne peut PAS rendre les programmes terminal (splashboard, TUI) -> valider via parse TOML / `splashboard catalog` / logs, le visuel passe par les screenshots de Rémy. Node par-projet via shims mise (effectif au prochain snapshot).
- splashboard : `catalog fetcher|renderer <nom>` fait autorité ; `animated_*` = intros ~2s qui figent ; figlet ansi_shadow ~6 lignes -> row `height = 7` ; `secrets.toml` déjà ignoré git+chezmoi.

## Décisions actives
- `secrets.toml` comme canal token github (refus env global / gh stockage fichier, pour la sécurité). Widgets retirés : Claude (keyring macOS), NASA (lent/KO), Notifications + todo_hotspots + Lobsters (place).
- Backlog harnais dans `AI Generated/`. Faux positif d'audit se reclasse dans le rapport `/evolve` (section `Audit clos`), pas en memory.
- Pas de force-push sur `ecf8fe7` (body amputé, cosmétique) sans accord.

## Prochaines étapes
- **Rémy : régénérer le token GitHub** (compromis via screenshot) avec scope `notifications`, puis réécrire `secrets.toml`.
- Prochaine session : constater node 20 dans olis-lab (nouveau snapshot). Prochain `/evolve` : A1/A4 ne remontent plus.
- Reliquats 19/06 (Rémy) : `sudo rm` python.org, rotation mdp Mongo Atlas, suppr backup `~/shell-migration-backup-*`, tester `/coach`.
- Optionnel : widget PR titre-seul via ReadStore ; `yazi` ; pimper `starship.toml` Dracula ; A3 (`Notes de Lecture/Code/`).
