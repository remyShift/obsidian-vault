---
tags:
---
## Qu'est-ce que c'est

Terraform est un outil d'**Infrastructure as Code (IaC)** créé par HashiCorp en 2014. Il permet de définir, provisionner et gérer des infrastructures cloud dans des fichiers de configuration texte, versionnables comme du code source.

---

## Infrastructure as Code (IaC)

Avant IaC : on clique dans des interfaces graphiques (AWS Console, etc.) pour créer des serveurs, des réseaux, des bases de données. C'est manuel, non reproductible, et impossible à versionner.

Avec IaC : l'infrastructure est décrite dans des fichiers de code. On peut :
- La versionner dans Git
- La reproduire identiquement dans plusieurs environnements (dev, staging, prod)
- La faire reviewer comme n'importe quel changement de code
- La rollback si quelque chose se passe mal

---

## Ce qui distingue Terraform

### Déclaratif, pas impératif

On décrit **l'état désiré** de l'infrastructure, pas les étapes pour l'atteindre. Terraform calcule lui-même ce qui doit être créé, modifié ou détruit pour passer de l'état actuel à l'état désiré.

```hcl
# On dit ce qu'on veut, pas comment le créer
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
```

### Cloud-agnostique

Terraform fonctionne avec des centaines de providers : AWS, GCP, Azure, Cloudflare, GitHub, Datadog, Kubernetes, etc. Une seule syntaxe pour tout.

---

## Concepts clés

### Resources
Les unités de base : une instance EC2, un bucket S3, un enregistrement DNS, une base de données. Chaque resource est gérée par un provider.

### Providers
Les plugins qui connectent Terraform aux APIs des services. HashiCorp maintient les providers officiels ; la communauté en publie des centaines d'autres sur le Terraform Registry.

### State File
Terraform maintient un fichier d'état (`terraform.tfstate`) qui représente la réalité actuelle de l'infrastructure. C'est grâce à ce fichier qu'il sait ce qui existe et ce qui doit changer.

En équipe : le state file doit être stocké dans un backend distant (S3, Terraform Cloud) pour éviter les conflits.

### Modules
Des composants réutilisables. Au lieu de redéfinir un VPC dans chaque projet, on crée un module VPC standard que toute l'équipe peut importer.

---

## Le workflow standard

```
1. terraform init     # Télécharge les providers
2. terraform plan     # Affiche ce qui va changer (sans rien toucher)
3. terraform apply    # Applique les changements après confirmation
4. terraform destroy  # Supprime l'infrastructure (à utiliser avec précaution)
```

Le `plan` est particulièrement important : il montre exactement ce que Terraform va faire avant de le faire. C'est le diff de l'infrastructure.

---

## Exemple simple : créer un bucket S3

```hcl
provider "aws" {
  region = "eu-west-1"
}

resource "aws_s3_bucket" "assets" {
  bucket = "oli-lab-assets-prod"
}

resource "aws_s3_bucket_versioning" "assets_versioning" {
  bucket = aws_s3_bucket.assets.id
  versioning_configuration {
    status = "Enabled"
  }
}
```

---

## Avantages

- Infrastructure reproductible et versionnable
- Visibilité sur les changements avant application (plan)
- Un seul workflow pour tous les cloud providers
- Collaboratif (via remote state)
- Standard de l'industrie : large communauté, beaucoup de modules disponibles

---

## Points de vigilance

- Le **state file** est critique : le corrompre ou le perdre peut compliquer la gestion de l'infrastructure
- Les **opérations destructives** (destroy, remplacement de resources) sont irréversibles
- En équipe : ne jamais lancer terraform apply sans plan ni review
- La gestion des secrets (clés API, mots de passe) ne doit jamais être codée en dur dans les .tf

---

## Terraform vs autres outils

| Outil | Usage principal |
|---|---|
| **Terraform** | Provisionnement d'infrastructure (créer/détruire des ressources) |
| **Ansible** | Configuration de ressources existantes (installer des packages, configurer des services) |
| **AWS CloudFormation** | IaC AWS uniquement |
| **Pulumi** | IaC avec des langages de programmation classiques (TypeScript, Python) |
| **Kubernetes** | Orchestration de conteneurs (souvent géré via Terraform) |

---

## Sources

- https://developer.hashicorp.com/terraform/intro
- https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code
- https://www.pluralsight.com/resources/blog/cloud/what-is-terraform-infrastructure-as-code-iac
- https://www.firefly.ai/academy/terraform-iac
