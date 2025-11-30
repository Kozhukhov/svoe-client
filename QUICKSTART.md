# 🚀 Быстрый старт

## Локальная разработка

```bash
# 1. Установить зависимости
npm install

# 2. Запустить dev сервер
npm run dev
```

Приложение доступно на http://localhost:3000

## Тестирование API

```bash
# Дать права на выполнение скрипта (один раз)
chmod +x test-api.sh

# Запустить тесты API
./test-api.sh

# Или вручную:
curl http://localhost:3000/api/health
curl http://localhost:3000/api/hello?name=Alex
```

## Docker (локально)

```bash
# Сборка и запуск одной командой
docker-compose up --build

# В фоновом режиме
docker-compose up -d

# Посмотреть логи
docker-compose logs -f

# Остановить
docker-compose down
```

## Использование Makefile

```bash
# Показать все доступные команды
make help

# Запустить разработку
make dev

# Собрать Docker и запустить
make docker-up

# Перезапустить Docker
make docker-restart

# Тестировать API
make test-api
```

## Деплой на Coolify

### Шаг 1: Подготовка репозитория

```bash
# Инициализация git (если еще не сделано)
git init
git add .
git commit -m "Initial commit with Docker support"

# Добавить remote и запушить
git remote add origin <your-repo-url>
git push -u origin main
```

### Шаг 2: Настройка в Coolify

1. Зайти в Coolify панель
2. **Create New Resource** → **Application**
3. Выбрать **Public Repository** или подключить свой репозиторий
4. Coolify автоматически обнаружит `Dockerfile`
5. Настройки:
   - **Build Pack**: Dockerfile
   - **Port**: 3000
   - **Health Check Path**: /api/health (опционально)

### Шаг 3: Переменные окружения

В разделе **Environment Variables** добавить:

```
NODE_ENV=production
PORT=3000
```

### Шаг 4: Deploy

Нажать **Deploy** и ждать!

## Проверка деплоя

После успешного деплоя:

```bash
# Заменить YOUR_DOMAIN на ваш домен из Coolify
curl https://YOUR_DOMAIN/api/health
curl https://YOUR_DOMAIN/api/hello?name=World

# Или использовать скрипт
./test-api.sh YOUR_DOMAIN
```

## Структура API

### GET /api/health
Health check endpoint для мониторинга

**Ответ:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-30T12:00:00.000Z",
  "message": "Server is running"
}
```

### GET /api/hello?name=NAME
Простой GET endpoint с параметрами

**Пример:**
```bash
curl "http://localhost:3000/api/hello?name=Alex"
```

**Ответ:**
```json
{
  "message": "Hello, Alex!",
  "timestamp": "2025-11-30T12:00:00.000Z"
}
```

### POST /api/hello
POST endpoint для отправки данных

**Пример:**
```bash
curl -X POST http://localhost:3000/api/hello \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from client"}'
```

**Ответ:**
```json
{
  "message": "Data received successfully",
  "receivedData": {
    "message": "Hello from client"
  },
  "timestamp": "2025-11-30T12:00:00.000Z"
}
```

## Troubleshooting

### Docker не запускается

```bash
# Убедитесь что Docker запущен
docker --version

# Очистите старые образы и контейнеры
docker system prune -a

# Попробуйте снова
docker-compose up --build
```

### API не отвечает

```bash
# Проверьте логи
docker-compose logs

# Или для конкретного контейнера
docker logs <container-id>
```

### Порт 3000 занят

```bash
# Найти процесс на порту 3000
lsof -i :3000

# Убить процесс
kill -9 <PID>

# Или использовать другой порт в docker-compose.yml
ports:
  - "3001:3000"  # localhost:3001 -> container:3000
```

## Следующие шаги

1. ✅ Добавить свои API endpoints в `src/app/api/`
2. ✅ Настроить базу данных (PostgreSQL, MongoDB и т.д.)
3. ✅ Добавить аутентификацию
4. ✅ Настроить CORS если нужно
5. ✅ Добавить логирование и мониторинг

Удачи! 🎉

