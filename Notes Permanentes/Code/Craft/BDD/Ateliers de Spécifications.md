> [!info]- Tags
> #SoftwareCraft #BDD 

= atelier d’échange des 3 amigos
- lors des ces ateliers ils vont partir d’une / plusieurs user stories 
	- chaque partis va amener sa contribution selon son expertise lors d’échanges d’égal à d’égal
	- PO explique sa vision —> Développeur et Testeur : reformule selon leur compréhension en posant des questions pour plus de précisions
		- le développeur va proposer des solutions à la mise en place 
		- le testeur va questionner les cas limite / extrême d’utilisation et pointer les contradictions 
- Lors de ses échanges aucun rôle à l’ascendant sur les autres —> ils co-construisent ensemble
- Pour fluidifier la communication entre eux ils vont régulièrement partir d’un exemple concret reprenant l’idée de départ et la reformulant selon ce qu’ils ont compris 
	- les exemples sont le plus souvent exprimé avec le vocabulaire du métier et des détails concrets 
		- + on est concrets et précis + on révèle des cas d’ambiguïté à considérer et au mieux chaque partis a la même compréhension
			- attention néanmoins trop de concrets et de précisions peu pertinentes et qui ne sont pas strictement nécessaire va générer du bruit pour rien et donc compliqué la compréhension il faut bien doser le curseur 
		- On définis un exemple en posant le contexte —> l’action qui en résulte —> le résultat 
			- permets d’avoir des exemples plus durables
	- Les exemples qui suffisent à la compréhension vont être garder et appelés **scénario clé**. Les autres scénarios évoqué serviront quant à eux aux tests.


Une fois un consensus sur un besoin établis ça veut dire que les 3 amigos ont le même niveau de compréhension et que la connaissance est donc partagée et surtout qu’elle a été vérifiée aux fils des scénarios. Ensuite la construction du besoin de manière technique se fera sur des bases solides.


Il est nécessaire de garder des traces écrites et concises de ces échanges (essentiellement les scénarios trouvés qui sont pertinents) à des fin de transmission de la connaissance. Peu importe qui prends des notes comme dit précédemment tout le monde est sur le même pied d’égalité.


Après chaque atelier chacun des partis va continuer le travail fait lors de l’atelier selon sa pov :
- le PO trouve et cherche d’autres besoins,
- les devs mettent en place ce qui a été convenu lors de l’atelier de manière technique et notent les questions / problèmes à remonter lors du prochain atelier,
- les testeurs travaillent sur de nouveau scénarios afin d’avoir de meilleur tests et des tests plus étendues et non régressif

Si les devs / testeurs ont fait ce qu’il y a faire ils peuvent travailler ensemble sur[[Automatisations des scénarios | l’automatisation des tests]] basé sur les scénarios établis.

Si on résume, 1 seule activité, à savoir avoir 3 amigos qui ont des conversations régulières sur les besoins en langage métier, avec qui plus est des exemple concrets et auto-suffisants sur lesquelles on ajoute de l’automatisation va apporter à l’équipe :
- la compréhension partagée au même niveau entre tous,
- les critères d’acceptation pour déterminer l’avancement des devs,
- des tests de non régression avec une bonne couverture,
- une documentation vivante et évolutive et à jour si les tests passent

Le temps investis dans cette pratique nous rapporte tellement d’avantages et une rentabilité sur la durée.