# CMS Infrastructure Setup

All resources run in `eu-west-3` (Paris). Run these steps once before the first workflow deployment.

Two deploy targets:

- **ECS Express Mode** — production, Fargate-managed service with ALB
- **EC2** — dev/exploration, can be stopped when not in use

---

## Part 1: ECS Express Mode (Production)

### 1.1 ECR Repository

```bash
aws ecr create-repository --repository-name olis-cms --region eu-west-3 \
  --image-scanning-configuration scanOnPush=true --image-tag-mutability MUTABLE
```

### 1.2 IAM Role — Task Execution Role

Allows ECS to pull the image from ECR, write logs to CloudWatch, and resolve SSM secrets at task startup.

```bash
aws iam create-role --role-name OlisCmsECSTaskExecutionRole \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ecs-tasks.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

aws iam attach-role-policy --role-name OlisCmsECSTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# Required for SSM secrets resolution at task startup (used by the `secrets` field in task definition)
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

aws iam put-role-policy --role-name OlisCmsECSTaskExecutionRole \
  --policy-name OlisCmsSSMSecretsPolicy \
  --policy-document "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
      {\"Effect\": \"Allow\", \"Action\": [\"ssm:GetParameter\", \"ssm:GetParameters\"], \"Resource\": \"arn:aws:ssm:eu-west-3:${ACCOUNT_ID}:parameter/cms/production/*\"}
    ]
  }"
```

### 1.3 IAM Role — Task Role

What the running container itself can do (S3 + SSM access). Mirrors the old App Runner instance role.

```bash
aws iam create-role --role-name OlisCmsECSTaskRole \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ecs-tasks.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

aws iam put-role-policy --role-name OlisCmsECSTaskRole \
  --policy-name OlisCmsTaskPolicy \
  --policy-document "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
      {\"Effect\": \"Allow\", \"Action\": [\"ssm:GetParameter\", \"ssm:GetParameters\", \"ssm:GetParametersByPath\"], \"Resource\": \"arn:aws:ssm:eu-west-3:${ACCOUNT_ID}:parameter/cms/*\"},
      {\"Effect\": \"Allow\", \"Action\": [\"s3:GetObject\", \"s3:PutObject\", \"s3:DeleteObject\", \"s3:ListBucket\"], \"Resource\": [\"arn:aws:s3:::olis-uploads-*\", \"arn:aws:s3:::olis-uploads-*/*\"]}
    ]
  }"
```

### 1.4 ECS Cluster

```bash
aws ecs create-cluster --cluster-name olis-cms --region eu-west-3
```

### 1.5 CloudWatch Log Group

```bash
aws logs create-log-group --log-group-name /ecs/olis-cms --region eu-west-3
```

### 1.6 Networking — Security Group

Fargate tasks need a security group that allows inbound traffic on port 3000 (or 443 if behind ALB with TLS termination). Reuse an existing one or create a new one:

```bash
# Find your VPC ID
aws ec2 describe-vpcs --region eu-west-3 --query 'Vpcs[*].{ID:VpcId,CIDR:CidrBlock}' --output table

# Create security group
aws ec2 create-security-group \
  --group-name olis-cms-ecs \
  --description "ECS Fargate - Payload CMS" \
  --vpc-id vpc-XXXXXXXX \
  --region eu-west-3

# Allow inbound on port 3000
aws ec2 authorize-security-group-ingress \
  --group-id sg-XXXXXXXX \
  --protocol tcp --port 3000 --cidr 0.0.0.0/0 \
  --region eu-west-3
```

Note your subnet IDs for the workflow secrets:

```bash
aws ec2 describe-subnets --region eu-west-3 \
  --query 'Subnets[*].{ID:SubnetId,VPC:VpcId,AZ:AvailabilityZone}' --output table
```

### 1.7 SSM Parameters (Production)

Store under `/cms/production/` (unchanged from before):

```bash
aws ssm put-parameter --region eu-west-3 --name "/cms/production/DATABASE_URL" --type SecureString --value "..."
aws ssm put-parameter --region eu-west-3 --name "/cms/production/PAYLOAD_SECRET" --type SecureString --value "..."
aws ssm put-parameter --region eu-west-3 --name "/cms/production/S3_BUCKET" --type SecureString --value "..."
aws ssm put-parameter --region eu-west-3 --name "/cms/production/S3_ACCESS_KEY_ID" --type SecureString --value "..."
aws ssm put-parameter --region eu-west-3 --name "/cms/production/S3_SECRET_ACCESS_KEY" --type SecureString --value "..."
aws ssm put-parameter --region eu-west-3 --name "/cms/production/S3_REGION" --type String --value "eu-west-3"
aws ssm put-parameter --region eu-west-3 --name "/cms/production/BASE_FRONTEND_URL" --type String --value "https://olislab.com"
```

### 1.8 Local Test Before First CI Run

After completing steps 1.1–1.7, do a dry-run locally to confirm the image boots and connects to MongoDB before triggering the workflow.

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REGISTRY="${ACCOUNT_ID}.dkr.ecr.eu-west-3.amazonaws.com"
SSM_PREFIX="arn:aws:ssm:eu-west-3:${ACCOUNT_ID}:parameter/cms/production"

# Register a test task definition (secrets resolved from SSM at task startup)
aws ecs register-task-definition \
  --family olis-cms \
  --network-mode awsvpc \
  --requires-compatibilities FARGATE \
  --cpu 512 --memory 1024 \
  --execution-role-arn arn:aws:iam::${ACCOUNT_ID}:role/OlisCmsECSTaskExecutionRole \
  --task-role-arn arn:aws:iam::${ACCOUNT_ID}:role/OlisCmsECSTaskRole \
  --container-definitions "[{
    \"name\": \"cms\",
    \"image\": \"${ECR_REGISTRY}/olis-cms:prod-<sha>\",
    \"portMappings\": [{\"containerPort\": 3000}],
    \"essential\": true,
    \"environment\": [
      {\"name\": \"NODE_ENV\", \"value\": \"production\"}
    ],
    \"secrets\": [
      {\"name\": \"DATABASE_URL\",        \"valueFrom\": \"${SSM_PREFIX}/DATABASE_URL\"},
      {\"name\": \"PAYLOAD_SECRET\",       \"valueFrom\": \"${SSM_PREFIX}/PAYLOAD_SECRET\"},
      {\"name\": \"S3_BUCKET\",            \"valueFrom\": \"${SSM_PREFIX}/S3_BUCKET\"},
      {\"name\": \"S3_ACCESS_KEY_ID\",     \"valueFrom\": \"${SSM_PREFIX}/S3_ACCESS_KEY_ID\"},
      {\"name\": \"S3_SECRET_ACCESS_KEY\", \"valueFrom\": \"${SSM_PREFIX}/S3_SECRET_ACCESS_KEY\"},
      {\"name\": \"S3_REGION\",            \"valueFrom\": \"${SSM_PREFIX}/S3_REGION\"},
      {\"name\": \"BASE_FRONTEND_URL\",    \"valueFrom\": \"${SSM_PREFIX}/BASE_FRONTEND_URL\"}
    ],
    \"logConfiguration\": {
      \"logDriver\": \"awslogs\",
      \"options\": {
        \"awslogs-group\": \"/ecs/olis-cms\",
        \"awslogs-region\": \"eu-west-3\",
        \"awslogs-stream-prefix\": \"ecs\"
      }
    }
  }]" \
  --region eu-west-3

# Run a one-off task to verify the image starts correctly
aws ecs run-task \
  --cluster olis-cms \
  --task-definition olis-cms \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-XXXX],securityGroups=[sg-XXXX],assignPublicIp=ENABLED}" \
  --region eu-west-3
```

Check CloudWatch logs at `/ecs/olis-cms` to confirm Payload boots successfully before creating the persistent service.

---

## Part 2: EC2 (Dev)

> EC2 uses `/cms/dev/` SSM parameters (separate from ECS's `/cms/production/`).

### 2.1 ECR Repository

```bash
aws ecr create-repository --repository-name olis-cms-dev --region eu-west-3 \
  --image-scanning-configuration scanOnPush=true --image-tag-mutability MUTABLE
```

### 2.2 IAM Instance Profile

```bash
aws iam create-role --role-name OlisCmsEC2Role \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

# SSM Session Manager (required for deploy via workflow)
aws iam attach-role-policy --role-name OlisCmsEC2Role \
  --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore

# ECR pull access
aws iam attach-role-policy --role-name OlisCmsEC2Role \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly

# SSM parameter read + S3 access
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
aws iam put-role-policy --role-name OlisCmsEC2Role \
  --policy-name OlisCmsEC2Policy \
  --policy-document "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
      {\"Effect\": \"Allow\", \"Action\": [\"ssm:GetParameter\", \"ssm:GetParameters\", \"ssm:GetParametersByPath\"], \"Resource\": \"arn:aws:ssm:eu-west-3:${ACCOUNT_ID}:parameter/cms/*\"},
      {\"Effect\": \"Allow\", \"Action\": [\"s3:GetObject\", \"s3:PutObject\", \"s3:DeleteObject\", \"s3:ListBucket\"], \"Resource\": [\"arn:aws:s3:::olis-uploads-*\", \"arn:aws:s3:::olis-uploads-*/*\"]}
    ]
  }"

# Create instance profile and attach role
aws iam create-instance-profile --instance-profile-name OlisCmsEC2Profile
aws iam add-role-to-instance-profile --instance-profile-name OlisCmsEC2Profile --role-name OlisCmsEC2Role
```

### 2.3 Launch EC2 Instance

- **AMI**: Amazon Linux 2023 (SSM agent pre-installed)
- **Instance type**: t3.small (2 vCPU, 2 GB)
- **Storage**: 20 GB gp3
- **IAM Instance Profile**: `OlisCmsEC2Profile`
- **Security group**: open port 3000 inbound (or 80/443 if using a reverse proxy)

```bash
# Example CLI launch (adjust subnet-id, security-group-id)
aws ec2 run-instances \
  --image-id resolve:ssm:/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64 \
  --instance-type t3.small \
  --iam-instance-profile Name=OlisCmsEC2Profile \
  --security-group-ids sg-XXXXXXXX \
  --subnet-id subnet-XXXXXXXX \
  --block-device-mappings '[{"DeviceName":"/dev/xvda","Ebs":{"VolumeSize":20,"VolumeType":"gp3"}}]' \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=olis-cms-dev}]' \
  --region eu-west-3
```

### 2.4 Install Docker on EC2

Connect via SSM Session Manager (no SSH key needed):

```bash
aws ssm start-session --target i-XXXXXXXXX --region eu-west-3
```

Then run:

```bash
sudo yum install -y docker
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ssm-user
sudo usermod -aG docker ec2-user
```

Log out and reconnect for the group change to take effect.

### 2.5 SSM Parameters (Dev)

Store under `/cms/dev/` (separate from production):

```bash
aws ssm put-parameter --region eu-west-3 --name "/cms/dev/DATABASE_URL" --type SecureString --value "..."
aws ssm put-parameter --region eu-west-3 --name "/cms/dev/PAYLOAD_SECRET" --type SecureString --value "..."
aws ssm put-parameter --region eu-west-3 --name "/cms/dev/S3_BUCKET" --type SecureString --value "..."
aws ssm put-parameter --region eu-west-3 --name "/cms/dev/S3_ACCESS_KEY_ID" --type SecureString --value "..."
aws ssm put-parameter --region eu-west-3 --name "/cms/dev/S3_SECRET_ACCESS_KEY" --type SecureString --value "..."
aws ssm put-parameter --region eu-west-3 --name "/cms/dev/S3_REGION" --type String --value "eu-west-3"
aws ssm put-parameter --region eu-west-3 --name "/cms/dev/BASE_FRONTEND_URL" --type String --value "https://dev.olislab.com"
```

These are read at deploy time by the EC2 container via the SSM CLI on the instance.

### 2.6 Start/Stop Instance

```bash
# Stop (saves costs, keeps data)
aws ec2 stop-instances --instance-ids i-XXXXXXXXX --region eu-west-3

# Start
aws ec2 start-instances --instance-ids i-XXXXXXXXX --region eu-west-3
```

The container has `--restart unless-stopped`, so it will auto-start when the instance boots.

---

## Part 3: GitHub Configuration

### Secrets

| Secret                      | Used by  | Notes                                        |
| --------------------------- | -------- | -------------------------------------------- |
| `AWS_ACCOUNT_ID`            | Both     | AWS account ID                               |
| `AWS_ACCESS_KEY_ID`         | Both     | CI IAM user                                  |
| `AWS_SECRET_ACCESS_KEY`     | Both     | CI IAM user                                  |
| `CMS_EC2_INSTANCE_ID`       | EC2 only | e.g. `i-0abc123def456`                       |
| `CMS_ECS_SUBNET_IDS`        | ECS only | Comma-separated subnet IDs for Fargate tasks |
| `CMS_ECS_SECURITY_GROUP_ID` | ECS only | SG allowing inbound on port 3000             |

### CI IAM User Permissions

Add to the existing GitHub Actions IAM user:

- **ECR**: `GetAuthorizationToken` + push/pull on `olis-cms` and `olis-cms-dev`
- **ECS**: `RegisterTaskDefinition`, `DescribeServices`, `UpdateService`, `CreateService`
- **CloudWatch Logs**: `CreateLogGroup`, `DescribeLogGroups`
- **SSM (parameters)**: `GetParameter`, `GetParameters` on `/cms/*`
- **SSM (commands)**: `SendCommand`, `GetCommandInvocation` (for EC2 deploy)
- **IAM**: `PassRole` for `OlisCmsECSTaskExecutionRole` and `OlisCmsECSTaskRole`

---

## Part 4: Deploy & Verify

### Trigger Deployment

From GitHub Actions UI: Actions > "Deploy CMS" > Run workflow > select target.

Or via CLI:

```bash
# EC2 (default)
gh workflow run "Deploy CMS"
gh workflow run "Deploy CMS" -f target=ec2

# ECS Express Mode
gh workflow run "Deploy CMS" -f target=ecs
```

### Verify ECS

Check the ECS console for the `olis-cms` service in the `olis-cms` cluster, or via CLI:

```bash
aws ecs describe-services \
  --cluster olis-cms \
  --services olis-cms \
  --region eu-west-3 \
  --query 'services[0].{Status:status,Running:runningCount,Desired:desiredCount}'
```

Check logs in CloudWatch at `/ecs/olis-cms`, or tail them:

```bash
aws logs tail /ecs/olis-cms --follow --region eu-west-3
```

### Verify EC2

```bash
# SSH via SSM
aws ssm start-session --target i-XXXXXXXXX --region eu-west-3
docker ps --filter name=olis-cms
docker logs olis-cms

# Or from your machine
curl http://<EC2_PUBLIC_IP>:3000/admin
```
