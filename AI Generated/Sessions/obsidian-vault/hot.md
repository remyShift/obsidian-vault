---
updated: 20-06-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Dernière mise à jour
20-06-2026 - Session `/improve` : hook git anti co-author installé + tracké chezmoi, dotfiles commités/pushés (`remyShift/dotfiles`), backlog harnais déplacé dans `AI Generated/`. Suite directe de la migration zsh -> fish du matin (recap unique `20-06-2026_10-58`).

## État du projet
- **Harnais stable et durci.** Migration full fish faite (login shell), zsh réduit à `.zshenv` (cargo + shims mise pour le non-interactif). `/evolve` durci (faux positifs A1/A4 clos), `/improve` opérationnel, backlog frictions désormais dans `AI Generated/Harnais Backlog.md` (`source: ai`).
- Setup shell final dans `Notes Permanentes/Code/Setup Shell.md` (16 outils + alias/fonctions).
- Dotfiles 100% reconstructibles : chezmoi (`remyShift/dotfiles`) + Brewfile (`brew bundle`).

## Faits récents importants
- **Hook git global `commit-msg`** strippe `Co-Authored-By: …Claude/Anthropic` + `🤖 Generated with Claude Code`. Tracké chezmoi (`executable_commit-msg`) + `core.hooksPath` en `~/` portable dans `.gitconfig`. Limite : repos husky (hooksPath local) le bypassent -> mémoire = filet ; bodies de PR non couverts (passent par `gh`).
- **Outil Bash de Claude = `/bin/zsh` figé via snapshot** (`~/.claude/shell-snapshots/`), pas de `cd` vivant. Node par-projet vient des shims mise dans `.zshenv` ; effectif au PROCHAIN snapshot (la session courante peut encore voir node 26 dans olis-lab).
- Écriture vault : toujours `Write`, jamais `mcp__obsidian__*` (bug latin1). Mention IA dans les commits désormais aussi garantie absente par le hook.

## Décisions actives
- Backlog harnais dans `AI Generated/` (généré par Claude via capture passive), pas dans Notes Permanentes.
- Hook déterministe > règle mémoire seule pour le co-author (mémoire reste le filet husky/PR).
- Faux positif d'audit se reclasse dans le rapport `/evolve` (section `Audit clos`), pas en memory.
- Pas de force-push pour nettoyer le commit `ecf8fe7` (body amputé par le hook v1, cosmétique) sans accord de Rémy.

## Prochaines étapes
- Prochaine session : constater que node 20 est bien résolu dans olis-lab (nouveau snapshot).
- Prochain `/evolve` : confirmer que A1/A4 ne remontent plus.
- Reliquat 19/06 (Rémy) : `sudo rm` python.org, rotation mdp Mongo Atlas, suppr backup `~/shell-migration-backup-*`, tester `/coach`.
- Optionnel : `yazi`, pimper `starship.toml` Dracula, promouvoir `Notes de Lecture/Code/` (A3), ou amender+force-push `ecf8fe7`.
