#!/bin/bash

# Finance Dashboard - Docker Management Script
# Usage: ./docker-scripts.sh [command]

set -e

IMAGE_NAME="finance-dashboard"
CONTAINER_NAME="finance-dashboard-app"
PORT="3000"

function print_header() {
    echo "================================"
    echo "  Finance Dashboard - Docker"
    echo "================================"
    echo ""
}

function build() {
    print_header
    echo "📦 Building Docker image..."
    docker build -t $IMAGE_NAME:latest .
    echo "✅ Build complete!"
    echo "Image: $IMAGE_NAME:latest"
}

function run() {
    print_header
    echo "🚀 Starting container..."
    
    # Stop existing container if running
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        echo "⚠️  Stopping existing container..."
        docker stop $CONTAINER_NAME
        docker rm $CONTAINER_NAME
    fi
    
    docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:$PORT \
        -e NODE_ENV=production \
        $IMAGE_NAME:latest
    
    echo "✅ Container started!"
    echo "Access the app at: http://localhost:$PORT"
    echo ""
    echo "To view logs: docker logs -f $CONTAINER_NAME"
}

function stop() {
    print_header
    echo "🛑 Stopping container..."
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true
    echo "✅ Container stopped and removed!"
}

function logs() {
    print_header
    echo "📋 Container logs (Ctrl+C to exit):"
    echo ""
    docker logs -f $CONTAINER_NAME
}

function restart() {
    stop
    run
}

function clean() {
    print_header
    echo "🧹 Cleaning up..."
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true
    docker rmi $IMAGE_NAME:latest 2>/dev/null || true
    echo "✅ Cleanup complete!"
}

function shell() {
    print_header
    echo "🐚 Opening shell in container..."
    docker exec -it $CONTAINER_NAME sh
}

function status() {
    print_header
    echo "📊 Container Status:"
    echo ""
    
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        echo "✅ Container is running"
        echo ""
        docker ps -f name=$CONTAINER_NAME --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        echo ""
        echo "Access the app at: http://localhost:$PORT"
    else
        echo "⚠️  Container is not running"
    fi
}

function help() {
    print_header
    echo "Available commands:"
    echo ""
    echo "  build      - Build Docker image"
    echo "  run        - Run container"
    echo "  stop       - Stop and remove container"
    echo "  restart    - Restart container"
    echo "  logs       - View container logs"
    echo "  shell      - Open shell in container"
    echo "  status     - Check container status"
    echo "  clean      - Remove container and image"
    echo "  help       - Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./docker-scripts.sh build"
    echo "  ./docker-scripts.sh run"
    echo "  ./docker-scripts.sh logs"
    echo ""
}

# Main command handler
case "${1:-help}" in
    build)
        build
        ;;
    run)
        run
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    logs)
        logs
        ;;
    shell)
        shell
        ;;
    status)
        status
        ;;
    clean)
        clean
        ;;
    help|--help|-h)
        help
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo ""
        help
        exit 1
        ;;
esac

