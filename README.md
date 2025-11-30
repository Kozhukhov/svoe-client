# SVOE Client

Next.js приложение с Backend API, готовое к деплою на Coolify.

## 🚀 Быстрый старт

### Разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Docker

```bash
# Сборка и запуск
docker-compose up --build

# Остановка
docker-compose down
```

## 📡 API Endpoints

### Health Check
```bash
GET /api/health
```

Ответ:
```json
{
  "status": "ok",
  "timestamp": "2025-11-30T12:00:00.000Z",
  "message": "Server is running"
}
```

### Hello API
```bash
# GET запрос
GET /api/hello?name=Alex

# POST запрос
POST /api/hello
Content-Type: application/json

{
  "message": "Hello from client"
}
```

## 🐳 Деплой на Coolify

Подробные инструкции по деплою смотрите в [DEPLOYMENT.md](./DEPLOYMENT.md)

### Быстрый старт:

1. Запушьте проект в Git репозиторий
2. В Coolify создайте новое приложение из репозитория
3. Coolify автоматически обнаружит Dockerfile
4. Настройте порт: `3000`
5. Deploy!

## 📁 Структура

```
svoe-client/
├── src/
│   └── app/
│       ├── api/              # Backend API routes
│       │   ├── health/       # Health check
│       │   └── hello/        # Пример API
│       ├── page.tsx          # Главная страница
│       └── layout.tsx        # Layout
├── Dockerfile                # Docker конфигурация
├── docker-compose.yml        # Для локальной разработки
└── next.config.ts           # Next.js конфиг (standalone mode)
```

## 🛠 Технологии

- **Next.js 16** - React фреймворк
- **TypeScript** - Типизация
- **Docker** - Контейнеризация
- **Node.js 20** - Runtime

## 📝 Команды

```bash
npm run dev      # Запуск dev сервера
npm run build    # Сборка продакшн версии
npm run start    # Запуск продакшн сервера
npm run lint     # Линтер
```

## 🔗 Полезные ссылки

- [Next.js Documentation](https://nextjs.org/docs)
- [Coolify Documentation](https://coolify.io/docs)
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Подробная инструкция по деплою
