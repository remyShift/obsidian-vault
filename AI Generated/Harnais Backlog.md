Backlog des frictions du harnais Claude (CLAUDE.md, skills, commandes, hooks, structure du vault). Alimenté **automatiquement** en fin de session par la capture passive (règle dans le CLAUDE.md du vault), et traité manuellement par `/improve`.

Format des entrées (append-only, ne pas réécrire les lignes existantes) :

`- [ ] [observation|explicite] description courte - DD-MM-YYYY`

- `[observation]` : friction détectée seule par Claude en fin de session.
- `[explicite]` : idée ajoutée à la main (via `/improve ajouter <description>`).

Une fois une amélioration appliquée par `/improve`, sa ligne est cochée `[x]` avec la date, jamais supprimée (registre de suivi).

---

## Frictions

<!-- les entrées s'ajoutent ici, plus récent en bas -->
- [ ] [observation] Sous-agent Explore a affirmé avec aplomb l'existence de fichiers (read CRA) en réalité absents du working tree local (16 commits de retard) ; vérité obtenue seulement en vérifiant `origin/develop`. Penser à instruire les sous-agents Explore de vérifier l'état git (local vs origin) quand le contexte mentionne un merge récent. - 15-06-2026
- [ ] [observation] L'outil Edit refuse d'éditer un fichier déjà lu via `Bash cat`/`git show` et exige un `Read` préalable — re-lecture redondante (SiteHeader, hot.md cette session). - 15-06-2026
- [x] [friction] Chaque appel Bash dans olis-lab doit re-sourcer nvm + `nvm use 20.19.6` (état shell non persistant entre tool calls) - répété 10+ fois - 16-06-2026 ✅ 20-06-2026 : nvm périmé (migré mise). Réglé en mettant les shims mise en tête de PATH dans `~/.zshenv` (tracké chezmoi). L'outil Bash (zsh non-interactif) lit `.mise.toml` au runtime via les shims → node 20 auto dans olis-lab, sans `cd` vivant. Effectif dès la prochaine session : l'outil Bash rejoue un snapshot zsh figé (`~/.claude/shell-snapshots/snapshot-zsh-*.sh`) régénéré au démarrage.
- [ ] [friction] ExitPlanMode a échoué une fois sur "Tool permission stream closed before response received" (glitch harnais) - 16-06-2026
- [ ] [observation] Écrire un escape unicode `̀-ͯ` dans une regex via Write/Edit : mon input rend les caractères combinants littéraux au lieu de la séquence ASCII `\u…`, 3 tentatives + workaround `printf` shell nécessaires - 17-06-2026
- [x] [observation] `rm` aliasé `rm -i` (plugin omz common-aliases) fait hanger l'outil Bash : le shell non-interactif source `.zshrc`, `rm` attend une confirmation et bloque (passé en background, hang) ; contourné via `/bin/rm` (2 occurrences cette session) → envisager `unalias rm` / `command rm` par défaut. - 19-06-2026 ✅ 20-06-2026 : réglé par la suppression de `.zshrc` (migration full fish). Plus d'omz common-aliases sourcé par l'outil Bash zsh → plus d'alias `rm -i` qui hangait.
- [ ] [observation] Le classifieur rejette TOUTE la commande Bash composée quand une seule sous-action est interdite (ex: vidage `/var/mail`) → perte des étapes sûres de la même commande ; réflexe à prendre : isoler les actions à risque dans des appels Bash séparés. - 19-06-2026
- [x] [observation] L'instruction harnais par défaut ajoute `Co-Authored-By: Claude` aux commits malgré la préférence "jamais" de Rémy (mistake répété cette session) ; mémoire créée, mais un réglage/hook qui strippe le trailer serait plus robuste. - 19-06-2026 ✅ 20-06-2026 : hook git global `commit-msg` installé (`~/.config/git/hooks/commit-msg` + `git config --global core.hooksPath ~/.config/git/hooks`) qui strippe les lignes `Co-Authored-By: …Claude/Anthropic` et `Generated with Claude Code`. Testé OK sur un message bidon. Limite : un repo avec `core.hooksPath` local (husky) bypasse le hook → la mémoire `no_claude_coauthor_in_commits` reste le filet. Ne touche pas les bodies de PR (passent par `gh`).
- [ ] [observation] zsh expand les globs AVANT de passer la commande → `grep --include=*.ts` et `ls tsconfig*.json` échouent en "no matches found" (2 occurrences cette session) ; réflexe : quoter les patterns (`--include='*.ts'`) ou utiliser des chemins explicites. - 19-06-2026
- [ ] [observation] L'outil Bash rejoue un snapshot zsh figé capturé au démarrage de session (`~/.claude/shell-snapshots/snapshot-zsh-*.sh`, PATH en dur) : un fix de config shell (`.zshenv`, ordre du PATH) n'est PAS vérifiable dans la même session, et il a fallu de nombreux round-trips avant de comprendre que node restait en 26 dans olis-lab à cause du snapshot, pas du fix. Réflexe : pour valider un changement de dotfile zsh, tester via `zsh -c 'source …; …'` plutôt que de se fier à l'état de l'outil Bash courant. - 20-06-2026
