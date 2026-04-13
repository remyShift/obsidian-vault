> [!info]- Tags
> #Tests 
> 

## Tests unitaires FIRST :

En TDD les tests arrivent en premier (en first), néanmoins **FIRST =** les caractéristiques qu’un bon tests doit avoir.

**F**ast —> un test doit être rapide,
**I**solated / **I**ndependent —> un test doit être isolé et indépendant des autres tests,
**R**epeatable —> un test doit être répétable / reproductible,
**S**elf-verifying —> un test doit être auto validant,
**T**imely —> un test doit être opportun et précis,

Il vous respecter ces principes pour pouvoir maintenir comme il faut les tests et pouvoir ainsi les lancer régulièrement.
### Fast :

Lorsqu’on fait des tests on les lance fréquemment et on s’attends à un feed-back immédiat, comme vu précédemment ça peut nous servir à éviter toute régression.
- Un test unitaire ne devrait dépasser les millisecondes.

Au contraire si un test mets trop de temps ça nous dissuadera de le lancer régulièrement. Et donc on verra moins bien les régressions et trop tard et ça sera contre productif.

### Isolé :

Un test ne doit dépendre d’aucun autre test pour mener à bien son exécution. Si il est lancé seul ou dans une suite de test le résultat doit être le même.

On doit pouvoir lancer les tests individuellement, en parallèle et dans n’importe quel ordre sans que ça influe sur le résultat de ces derniers.

### Répétable :

On doit pouvoir répéter l’exécution d’un test à l’infini sans en changer le comportement et le résultat et ce peu importe l’environnement d’exécution.
 
Il doit s’exécuter comme un système fermé et ne doit pas se baser sur des données aléatoires comme la date du jour où des identifiants.

### Self-verifying :

Le test n’exécute pas uniquement le code de production, il se doit de produire un résultat objectivable : soit en succès soit en échec.

Le résultat attendu doit être clairement visible et explicite.

Un test qui n’est pas auto-validant doit nécessite une intervention manuelle ce qui n’est pas le but.

### Timely (opportun et précis) :

Opportun ? si on se réfère au TDD c’est avant l’écriture du code de prod.

Précis ? Car il doit couvrir qu’un seul cas d’utilisation —> 1 test / scénario


