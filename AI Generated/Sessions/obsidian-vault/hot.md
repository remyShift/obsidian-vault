---
updated: 24-06-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Dernière mise à jour
24-06-2026 - Ajout de 5 alias git fish (`gf`, `gm`, `glgg`, `gsta`, `gstp`), note `Setup Shell.md` recalée sur le contenu réel du fichier d'alias, push chezmoi (`ac3b254`).

## État du projet
- **Harnais shell stable** : fish login shell, dotfiles 100% chezmoi (`remyShift/dotfiles`) + Brewfile, hook git `commit-msg` anti co-author.
- **Alias git** dans `~/.config/fish/conf.d/aliases.fish` (source chezmoi `dot_config/fish/conf.d/aliases.fish`) : `gcd` (abbr), `gaa`, `gp`, `gcm`, `gcb`, `gst`, `gf`, `gm`, `glgg`, `gsta`, `gstp`. Fonctions git interactives (`gco`/`gbd` fzf, `gadd`/`gcim` gum) dans `conf.d/gum.fish`. Tout documenté dans `Notes Permanentes/Code/Setup Shell.md` (deux tables : binaires boostés + git).
- **Splashboard stabilisé, tout statique.** Deux dashboards perso : `home` (date figlet, citation mono-ligne, countdown Corée, world clock, météo Lyon/Séoul, calendrier, système, Hacker News) et `project` (nom repo, git live, mes PRs/reviews GitHub, analytics code). Thème synthwave_84. Token github via `~/.splashboard/secrets.toml`. Hero `text_ascii` figlet `ansi_shadow` + citation `text_plain` : la fenêtre `ANIMATION_WINDOW` de 2s est codée en dur (tout widget animé gèle le terminal 2s). Hook cd en `--on-cd` (splash project à la racine d'un repo, silencieux ailleurs).

## Faits récents importants
- Workflow chezmoi pour un dotfile : éditer la source `~/.local/share/chezmoi/...`, `chezmoi apply <fichier>`, puis `chezmoi git -- add/commit/push`. Vérifier `chezmoi diff` avant (source/live souvent synchro).
- Alias ajoutés ne sont pas actifs dans le shell courant : nouveau terminal ou `source` du fichier.
- Écriture vault : toujours `Write`, jamais `mcp__obsidian__*` (bug latin1). Mention IA dans les commits bloquée par le hook `commit-msg`.
- Bash de Claude = `/bin/zsh` figé sans TTY : ne rend PAS les TUI (splashboard) → valider via parse TOML / `splashboard catalog`, le visuel passe par les screenshots de Rémy.

## Décisions actives
- Éditer la source chezmoi puis `apply`, plutôt que `re-add` du live.
- Ne pas committer la note du vault dans le flux dotfiles (backup auto du vault s'en charge).
- Terminal instantané > animation : splashboard tranché côté statique (validé par Rémy). Citation mono-ligne assumée.
- `secrets.toml` comme canal token github (refus env global / gh stockage fichier), ignoré git + chezmoi.

## Prochaines étapes
- **Rémy : régénérer le token GitHub** (compromis via screenshot, scope `notifications`) + réécrire `secrets.toml`.
- Reliquats Rémy : `sudo rm` python.org, rotation mdp Mongo Atlas, suppr backup `~/shell-migration-backup-*`, tester `/coach`.
- Optionnel : splash home hors-repo (logique fish custom), widget PR titre-seul via ReadStore, `yazi`, pimper `starship.toml` Dracula, remontée upstream splashboard (render non-bloquant pendant l'anim).
