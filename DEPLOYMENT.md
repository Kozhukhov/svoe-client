# Деплой на Coolify

## Быстрый старт

### 1. Сборка и запуск локально

```bash
# Сборка Docker образа
docker build -t svoe-client .

# Запуск контейнера
docker run -p 3000:3000 svoe-client

# Или используйте docker-compose
docker-compose up -d
```

### 2. Проверка работы API

После запуска доступны следующие endpoints:

- **Health Check**: `GET http://localhost:3000/api/health`
  ```bash
  curl http://localhost:3000/api/health
  ```

- **Hello Endpoint**: 
  - `GET http://localhost:3000/api/hello?name=YourName`
  - `POST http://localhost:3000/api/hello` (отправить JSON в body)
  
  ```bash
  # GET запрос
  curl http://localhost:3000/api/hello?name=Alex
  
  # POST запрос
  curl -X POST http://localhost:3000/api/hello \
    -H "Content-Type: application/json" \
    -d '{"message": "Hello from client"}'
  ```

## Деплой на Coolify

### Вариант 1: Из Git репозитория (рекомендуется)

1. Запушьте код в Git репозиторий (GitHub, GitLab, etc.)
2. В Coolify создайте новое приложение
3. Выберите ваш репозиторий
4. Coolify автоматически обнаружит Dockerfile
5. Настройте порт: **3000**
6. Deploy!

### Вариант 2: Docker Registry

1. Соберите и запушьте образ в registry:
   ```bash
   docker build -t your-registry/svoe-client:latest .
   docker push your-registry/svoe-client:latest
   ```

2. В Coolify добавьте приложение из Docker образа
3. Укажите образ: `your-registry/svoe-client:latest`
4. Настройте порт: **3000**
5. Deploy!

## Конфигурация

### Переменные окружения

В Coolify вы можете настроить следующие переменные:

- `NODE_ENV` - режим работы (production)
- `PORT` - порт приложения (по умолчанию 3000)

### Health Check

Coolify может использовать endpoint `/api/health` для проверки здоровья приложения:

- **Path**: `/api/health`
- **Port**: `3000`
- **Method**: `GET`

## Структура проекта

```
svoe-client/
├── Dockerfile              # Docker конфигурация
├── docker-compose.yml      # Локальная разработка
├── .dockerignore          # Исключения для Docker
├── next.config.ts         # Настроен standalone режим
└── src/
    └── app/
        └── api/           # Backend API routes
            ├── health/    # Health check endpoint
            └── hello/     # Пример API endpoint
```

## Troubleshooting

### Проблема: Приложение не запускается

Убедитесь что:
- Порт 3000 открыт
- В next.config.ts включен `output: 'standalone'`
- Все зависимости установлены

### Проблема: API не отвечает

Проверьте:
- Логи контейнера: `docker logs <container-id>`
- Health check: `curl http://localhost:3000/api/health`

## Команды для разработки

```bash
# Локальная разработка
npm run dev

# Сборка продакшн версии
npm run build

# Запуск продакшн версии
npm start

# Docker разработка
docker-compose up --build

# Остановка
docker-compose down
```

