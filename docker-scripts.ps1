# Finance Dashboard - Docker Management Script (PowerShell)
# Usage: .\docker-scripts.ps1 [command]

param(
    [Parameter(Position=0)]
    [string]$Command = "help"
)

$IMAGE_NAME = "finance-dashboard"
$CONTAINER_NAME = "finance-dashboard-app"
$PORT = "3000"

function Print-Header {
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "  Finance Dashboard - Docker" -ForegroundColor Cyan
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host ""
}

function Build-Image {
    Print-Header
    Write-Host "📦 Building Docker image..." -ForegroundColor Yellow
    docker build -t ${IMAGE_NAME}:latest .
    Write-Host "✅ Build complete!" -ForegroundColor Green
    Write-Host "Image: ${IMAGE_NAME}:latest"
}

function Run-Container {
    Print-Header
    Write-Host "🚀 Starting container..." -ForegroundColor Yellow
    
    # Stop existing container if running
    $existing = docker ps -q -f name=$CONTAINER_NAME
    if ($existing) {
        Write-Host "⚠️  Stopping existing container..." -ForegroundColor Yellow
        docker stop $CONTAINER_NAME
        docker rm $CONTAINER_NAME
    }
    
    docker run -d `
        --name $CONTAINER_NAME `
        -p ${PORT}:${PORT} `
        -e NODE_ENV=production `
        ${IMAGE_NAME}:latest
    
    Write-Host "✅ Container started!" -ForegroundColor Green
    Write-Host "Access the app at: http://localhost:$PORT"
    Write-Host ""
    Write-Host "To view logs: docker logs -f $CONTAINER_NAME"
}

function Stop-Container {
    Print-Header
    Write-Host "🛑 Stopping container..." -ForegroundColor Yellow
    docker stop $CONTAINER_NAME 2>$null
    docker rm $CONTAINER_NAME 2>$null
    Write-Host "✅ Container stopped and removed!" -ForegroundColor Green
}

function Show-Logs {
    Print-Header
    Write-Host "📋 Container logs (Ctrl+C to exit):" -ForegroundColor Yellow
    Write-Host ""
    docker logs -f $CONTAINER_NAME
}

function Restart-Container {
    Stop-Container
    Run-Container
}

function Clean-All {
    Print-Header
    Write-Host "🧹 Cleaning up..." -ForegroundColor Yellow
    docker stop $CONTAINER_NAME 2>$null
    docker rm $CONTAINER_NAME 2>$null
    docker rmi ${IMAGE_NAME}:latest 2>$null
    Write-Host "✅ Cleanup complete!" -ForegroundColor Green
}

function Open-Shell {
    Print-Header
    Write-Host "🐚 Opening shell in container..." -ForegroundColor Yellow
    docker exec -it $CONTAINER_NAME sh
}

function Show-Status {
    Print-Header
    Write-Host "📊 Container Status:" -ForegroundColor Yellow
    Write-Host ""
    
    $running = docker ps -q -f name=$CONTAINER_NAME
    if ($running) {
        Write-Host "✅ Container is running" -ForegroundColor Green
        Write-Host ""
        docker ps -f name=$CONTAINER_NAME --format "table {{.Names}}`t{{.Status}}`t{{.Ports}}"
        Write-Host ""
        Write-Host "Access the app at: http://localhost:$PORT"
    } else {
        Write-Host "⚠️  Container is not running" -ForegroundColor Yellow
    }
}

function Show-Help {
    Print-Header
    Write-Host "Available commands:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  build      - Build Docker image"
    Write-Host "  run        - Run container"
    Write-Host "  stop       - Stop and remove container"
    Write-Host "  restart    - Restart container"
    Write-Host "  logs       - View container logs"
    Write-Host "  shell      - Open shell in container"
    Write-Host "  status     - Check container status"
    Write-Host "  clean      - Remove container and image"
    Write-Host "  help       - Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Cyan
    Write-Host "  .\docker-scripts.ps1 build"
    Write-Host "  .\docker-scripts.ps1 run"
    Write-Host "  .\docker-scripts.ps1 logs"
    Write-Host ""
}

# Main command handler
switch ($Command.ToLower()) {
    "build" { Build-Image }
    "run" { Run-Container }
    "stop" { Stop-Container }
    "restart" { Restart-Container }
    "logs" { Show-Logs }
    "shell" { Open-Shell }
    "status" { Show-Status }
    "clean" { Clean-All }
    "help" { Show-Help }
    default {
        Write-Host "❌ Unknown command: $Command" -ForegroundColor Red
        Write-Host ""
        Show-Help
        exit 1
    }
}

