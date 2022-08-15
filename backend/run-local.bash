docker-compose down
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
docker-compose --env-file .env -f docker-compose.yml -f docker-compose.dev.yml up --scale backend=2