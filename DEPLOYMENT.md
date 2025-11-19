# Deployment Guide - Finance Dashboard

This guide covers deploying the Finance Dashboard using Docker containers on AWS and Azure.

## Prerequisites

- Docker installed locally
- AWS CLI or Azure CLI installed (depending on target platform)
- Container registry access (Docker Hub, AWS ECR, or Azure ACR)

## Quick Start - Local Docker Testing

### Build the Docker Image

```bash
docker build -t finance-dashboard:latest .
```

### Run Locally

```bash
docker run -p 3000:3000 finance-dashboard:latest
```

Or use Docker Compose:

```bash
docker-compose up -d
```

Visit: http://localhost:3000

### Stop Container

```bash
docker-compose down
```

---

## AWS Deployment

### Option 1: AWS Elastic Container Service (ECS) with Fargate

#### 1. Create ECR Repository

```bash
# Set your AWS region
export AWS_REGION=us-east-1
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Create ECR repository
aws ecr create-repository \
    --repository-name finance-dashboard \
    --region $AWS_REGION
```

#### 2. Build and Push to ECR

```bash
# Login to ECR
aws ecr get-login-password --region $AWS_REGION | \
    docker login --username AWS --password-stdin \
    $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build for ARM64 (Graviton) or AMD64
docker build --platform linux/amd64 -t finance-dashboard:latest .

# Tag image
docker tag finance-dashboard:latest \
    $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/finance-dashboard:latest

# Push to ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/finance-dashboard:latest
```

#### 3. Create ECS Task Definition

Create `task-definition.json`:

```json
{
  "family": "finance-dashboard",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "finance-dashboard",
      "image": "<AWS_ACCOUNT_ID>.dkr.ecr.<AWS_REGION>.amazonaws.com/finance-dashboard:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/finance-dashboard",
          "awslogs-region": "<AWS_REGION>",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

Register the task definition:

```bash
# Create CloudWatch log group
aws logs create-log-group --log-group-name /ecs/finance-dashboard

# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

#### 4. Create ECS Cluster and Service

```bash
# Create cluster
aws ecs create-cluster --cluster-name finance-dashboard-cluster

# Create service (requires VPC, subnets, and security group)
aws ecs create-service \
    --cluster finance-dashboard-cluster \
    --service-name finance-dashboard-service \
    --task-definition finance-dashboard \
    --desired-count 2 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={
        subnets=[subnet-xxxxx,subnet-yyyyy],
        securityGroups=[sg-xxxxx],
        assignPublicIp=ENABLED
    }"
```

#### 5. Setup Application Load Balancer (Optional but Recommended)

```bash
# Create ALB
aws elbv2 create-load-balancer \
    --name finance-dashboard-alb \
    --subnets subnet-xxxxx subnet-yyyyy \
    --security-groups sg-xxxxx

# Create target group
aws elbv2 create-target-group \
    --name finance-dashboard-tg \
    --protocol HTTP \
    --port 3000 \
    --vpc-id vpc-xxxxx \
    --target-type ip \
    --health-check-path /

# Update service to use ALB
aws ecs update-service \
    --cluster finance-dashboard-cluster \
    --service finance-dashboard-service \
    --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:...,containerName=finance-dashboard,containerPort=3000"
```

### Option 2: AWS App Runner (Simpler)

```bash
# Create apprunner.yaml
cat > apprunner.yaml <<EOF
version: 1.0
runtime: nodejs20
build:
  commands:
    build:
      - npm ci
      - npm run build
run:
  command: npm start
  network:
    port: 3000
EOF

# Deploy using App Runner (via console or CLI)
aws apprunner create-service \
    --service-name finance-dashboard \
    --source-configuration "CodeRepository={
        RepositoryUrl=<YOUR_REPO_URL>,
        SourceCodeVersion={Type=BRANCH,Value=main},
        CodeConfiguration={
            ConfigurationSource=CONFIGURATION_FILE
        }
    }"
```

---

## Azure Deployment

### Option 1: Azure Container Instances (ACI)

#### 1. Create Azure Container Registry

```bash
# Set variables
export RESOURCE_GROUP=finance-dashboard-rg
export LOCATION=eastus
export ACR_NAME=financedashboardacr
export CONTAINER_NAME=finance-dashboard

# Create resource group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create container registry
az acr create \
    --resource-group $RESOURCE_GROUP \
    --name $ACR_NAME \
    --sku Basic \
    --admin-enabled true
```

#### 2. Build and Push to ACR

```bash
# Login to ACR
az acr login --name $ACR_NAME

# Build and push (ACR can build for you)
az acr build \
    --registry $ACR_NAME \
    --image finance-dashboard:latest \
    --file Dockerfile \
    .

# Or build locally and push
docker build -t $ACR_NAME.azurecr.io/finance-dashboard:latest .
docker push $ACR_NAME.azurecr.io/finance-dashboard:latest
```

#### 3. Deploy to Azure Container Instances

```bash
# Get ACR credentials
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --query loginServer --output tsv)
ACR_USERNAME=$(az acr credential show --name $ACR_NAME --query username --output tsv)
ACR_PASSWORD=$(az acr credential show --name $ACR_NAME --query passwords[0].value --output tsv)

# Create container instance
az container create \
    --resource-group $RESOURCE_GROUP \
    --name $CONTAINER_NAME \
    --image $ACR_LOGIN_SERVER/finance-dashboard:latest \
    --cpu 1 \
    --memory 1 \
    --registry-login-server $ACR_LOGIN_SERVER \
    --registry-username $ACR_USERNAME \
    --registry-password $ACR_PASSWORD \
    --dns-name-label finance-dashboard-demo \
    --ports 3000 \
    --environment-variables NODE_ENV=production

# Get the FQDN
az container show \
    --resource-group $RESOURCE_GROUP \
    --name $CONTAINER_NAME \
    --query ipAddress.fqdn \
    --output tsv
```

### Option 2: Azure Container Apps (Recommended)

```bash
# Install Azure Container Apps extension
az extension add --name containerapp --upgrade

# Create Container Apps environment
az containerapp env create \
    --name finance-dashboard-env \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION

# Deploy container app
az containerapp create \
    --name finance-dashboard-app \
    --resource-group $RESOURCE_GROUP \
    --environment finance-dashboard-env \
    --image $ACR_LOGIN_SERVER/finance-dashboard:latest \
    --registry-server $ACR_LOGIN_SERVER \
    --registry-username $ACR_USERNAME \
    --registry-password $ACR_PASSWORD \
    --target-port 3000 \
    --ingress external \
    --cpu 0.5 \
    --memory 1.0Gi \
    --min-replicas 1 \
    --max-replicas 3 \
    --env-vars NODE_ENV=production

# Get the application URL
az containerapp show \
    --name finance-dashboard-app \
    --resource-group $RESOURCE_GROUP \
    --query properties.configuration.ingress.fqdn \
    --output tsv
```

### Option 3: Azure App Service for Containers

```bash
# Create App Service Plan
az appservice plan create \
    --name finance-dashboard-plan \
    --resource-group $RESOURCE_GROUP \
    --is-linux \
    --sku B1

# Create Web App
az webapp create \
    --resource-group $RESOURCE_GROUP \
    --plan finance-dashboard-plan \
    --name finance-dashboard-webapp \
    --deployment-container-image-name $ACR_LOGIN_SERVER/finance-dashboard:latest

# Configure container registry credentials
az webapp config container set \
    --name finance-dashboard-webapp \
    --resource-group $RESOURCE_GROUP \
    --docker-custom-image-name $ACR_LOGIN_SERVER/finance-dashboard:latest \
    --docker-registry-server-url https://$ACR_LOGIN_SERVER \
    --docker-registry-server-user $ACR_USERNAME \
    --docker-registry-server-password $ACR_PASSWORD

# Enable continuous deployment
az webapp deployment container config \
    --name finance-dashboard-webapp \
    --resource-group $RESOURCE_GROUP \
    --enable-cd true

# Get webhook URL for CI/CD
WEBHOOK_URL=$(az webapp deployment container show-cd-url \
    --name finance-dashboard-webapp \
    --resource-group $RESOURCE_GROUP \
    --query CI_CD_URL \
    --output tsv)

# Configure ACR webhook
az acr webhook create \
    --registry $ACR_NAME \
    --name financeWebhook \
    --actions push \
    --uri $WEBHOOK_URL
```

---

## Docker Image Optimization Tips

### Multi-Architecture Build

```bash
# Build for both ARM64 and AMD64
docker buildx create --use
docker buildx build \
    --platform linux/amd64,linux/arm64 \
    -t finance-dashboard:latest \
    --push \
    .
```

### Image Size Optimization

Current image size: ~150MB (using Alpine base)

To further optimize:
1. Use `.dockerignore` to exclude unnecessary files
2. Minimize layers in Dockerfile
3. Use multi-stage builds (already implemented)
4. Consider distroless images for production

---

## Environment Variables

Add these as needed for your deployment:

```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0

# Add your custom variables
# API_URL=https://api.example.com
# DATABASE_URL=postgresql://...
```

---

## Monitoring & Logs

### AWS CloudWatch

```bash
# View logs
aws logs tail /ecs/finance-dashboard --follow
```

### Azure Monitor

```bash
# Stream container logs
az container logs \
    --resource-group $RESOURCE_GROUP \
    --name $CONTAINER_NAME \
    --follow
```

---

## Health Checks

The application responds on:
- **Root**: `http://localhost:3000/`
- **Health Check**: Use root endpoint or create custom `/api/health`

---

## Cost Estimates

### AWS
- **ECS Fargate**: ~$30-50/month (2 tasks, 0.5 vCPU, 1GB RAM)
- **App Runner**: ~$25-40/month
- **ECR Storage**: ~$1/month

### Azure
- **Container Instances**: ~$30-45/month (1 vCPU, 1GB RAM)
- **Container Apps**: ~$35-55/month
- **ACR Basic**: ~$5/month

---

## Cleanup

### AWS

```bash
# Delete ECS service and cluster
aws ecs delete-service --cluster finance-dashboard-cluster --service finance-dashboard-service --force
aws ecs delete-cluster --cluster finance-dashboard-cluster

# Delete ECR repository
aws ecr delete-repository --repository-name finance-dashboard --force
```

### Azure

```bash
# Delete entire resource group (removes everything)
az group delete --name $RESOURCE_GROUP --yes --no-wait
```

---

## Troubleshooting

### Container won't start
- Check logs: `docker logs <container-id>`
- Verify port 3000 is exposed
- Ensure NODE_ENV is set correctly

### Image too large
- Review `.dockerignore` file
- Check for unnecessary dependencies
- Use `docker image ls` to check size

### Build fails
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all dependencies are in package.json

---

## Next Steps

1. Set up CI/CD pipeline (GitHub Actions, Azure DevOps, AWS CodePipeline)
2. Configure custom domain and SSL certificate
3. Set up monitoring and alerting
4. Implement backup strategies
5. Configure auto-scaling policies

---

**Happy Deploying! 🚀**

