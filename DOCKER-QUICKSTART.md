# Docker Quick Start Guide

Quick reference for running the Finance Dashboard with Docker.

## Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- 2GB free disk space
- Port 3000 available

## Quick Commands

### Using Helper Scripts (Recommended)

**Linux/Mac:**
```bash
# Make script executable (first time only)
chmod +x docker-scripts.sh

# Build and run
./docker-scripts.sh build
./docker-scripts.sh run

# View status
./docker-scripts.sh status

# View logs
./docker-scripts.sh logs

# Stop
./docker-scripts.sh stop
```

**Windows (PowerShell):**
```powershell
# Build and run
.\docker-scripts.ps1 build
.\docker-scripts.ps1 run

# View status
.\docker-scripts.ps1 status

# View logs
.\docker-scripts.ps1 logs

# Stop
.\docker-scripts.ps1 stop
```

### Manual Docker Commands

**1. Build Image**
```bash
docker build -t finance-dashboard:latest .
```

**2. Run Container**
```bash
docker run -d --name finance-dashboard-app -p 3000:3000 finance-dashboard:latest
```

**3. View Logs**
```bash
docker logs -f finance-dashboard-app
```

**4. Stop Container**
```bash
docker stop finance-dashboard-app
docker rm finance-dashboard-app
```

### Using Docker Compose

**Start**
```bash
docker-compose up -d
```

**Stop**
```bash
docker-compose down
```

**View logs**
```bash
docker-compose logs -f
```

**Rebuild and restart**
```bash
docker-compose up -d --build
```

## Access the Application

Once running, access the dashboard at:
- **URL:** http://localhost:3000
- **Login:** Any email + password (min 3 chars)

## Common Tasks

### Check if Container is Running
```bash
docker ps | grep finance-dashboard
```

### Enter Container Shell
```bash
docker exec -it finance-dashboard-app sh
```

### View Resource Usage
```bash
docker stats finance-dashboard-app
```

### Remove Everything
```bash
docker stop finance-dashboard-app
docker rm finance-dashboard-app
docker rmi finance-dashboard:latest
```

## Troubleshooting

### Port Already in Use
```bash
# Find what's using port 3000
# Linux/Mac
lsof -i :3000

# Windows
netstat -ano | findstr :3000

# Use a different port
docker run -d --name finance-dashboard-app -p 8080:3000 finance-dashboard:latest
```

### Container Won't Start
```bash
# Check logs for errors
docker logs finance-dashboard-app

# Verify image exists
docker images | grep finance-dashboard

# Rebuild image
docker build --no-cache -t finance-dashboard:latest .
```

### Container Keeps Restarting
```bash
# Check logs
docker logs --tail 100 finance-dashboard-app

# Run in foreground to see errors
docker run --rm -p 3000:3000 finance-dashboard:latest
```

### Image Too Large
```bash
# Check image size
docker images finance-dashboard

# Optimize by removing build cache
docker system prune -a

# Rebuild with no cache
docker build --no-cache -t finance-dashboard:latest .
```

## Production Deployment

For production deployments to AWS or Azure, see:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guides
- `.github/workflows/` - CI/CD automation

## Image Details

- **Base Image:** node:20-alpine
- **Size:** ~150MB
- **Architecture:** Multi-stage build
- **User:** Non-root (nextjs:nodejs)
- **Port:** 3000
- **Health Check:** GET /

## Environment Variables

You can pass environment variables to the container:

```bash
docker run -d \
  --name finance-dashboard-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  finance-dashboard:latest
```

Or using Docker Compose (edit `docker-compose.yml`):

```yaml
environment:
  - NODE_ENV=production
  - CUSTOM_VAR=value
```

## Next Steps

1. ✅ Run locally with Docker
2. ✅ Test the application
3. 📤 Push to container registry (ECR/ACR)
4. 🚀 Deploy to cloud (AWS/Azure)
5. 🔄 Set up CI/CD pipeline

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [AWS ECS Guide](https://docs.aws.amazon.com/ecs/)
- [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/)

---

**Need Help?** Check the main [README.md](./README.md) or [DEPLOYMENT.md](./DEPLOYMENT.md)

