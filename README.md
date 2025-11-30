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

У вас есть **два варианта** деплоя:

### Вариант A: Coolify собирает из исходников (простой)
1. Запушьте в Git
2. В Coolify: New Application → Git Repository
3. Порт: `3000`
4. Deploy! (~2-5 минут)

### Вариант B: CI собирает образ (быстрый, рекомендуется)
1. Запушьте в Git → GitHub Actions соберёт образ
2. В Coolify: New Application → Docker Image
3. Image: `ghcr.io/username/svoe-client:main`
4. Deploy! (~30 секунд)

📖 **Подробное сравнение:** [DEPLOYMENT_OPTIONS.md](./DEPLOYMENT_OPTIONS.md)  
📚 **Детальная инструкция:** [COOLIFY.md](./COOLIFY.md)

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
