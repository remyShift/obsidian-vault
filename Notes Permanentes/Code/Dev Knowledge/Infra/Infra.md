---
tags: [DevKnowledge, Infra]
---
L'infrastructure désigne tout ce qui fait tourner une application sans être du code applicatif : serveurs, réseaux, bases de données, services cloud, pipelines de déploiement.

On distingue plusieurs grandes familles :

- **Hébergement** : où tourne le code ce sont les serveurs physiques, VPS, instances cloud (EC2, Cloud Run...), serverless
- **Réseau** : DNS, CDN, load balancers, firewalls, VPN
- **Conteneurisation** : Docker, container registries --> packager l'application et ses dépendances en unités portables
- **Orchestration** : Kubernetes, ECS --> piloter des flottes de conteneurs à grande échelle
- **CI/CD** : pipelines de build, test et déploiement automatisés
- **Observabilité** : monitoring, logging, alerting --> savoir ce qui se passe en production

L'**Infrastructure as Code (IaC)** est l'approche qui consiste à décrire et gérer toute cette infrastructure dans des fichiers de configuration versionnables, plutôt que de la configurer manuellement via des interfaces graphiques. [[Terraform]] est l'outil standard de l'industrie pour ça.
