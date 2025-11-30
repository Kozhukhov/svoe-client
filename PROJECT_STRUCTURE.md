# 📁 Структура проекта

```
svoe-client/
│
├── 📄 Конфигурационные файлы
│   ├── next.config.ts          # Next.js конфиг (standalone mode для Docker)
│   ├── tsconfig.json           # TypeScript конфигурация
│   ├── package.json            # npm зависимости
│   ├── eslint.config.mjs       # ESLint правила
│   └── .gitignore              # Git игнорируемые файлы
│
├── 🐳 Docker файлы
│   ├── Dockerfile              # Multi-stage Docker build
│   ├── docker-compose.yml      # Docker Compose для локальной разработки
│   └── .dockerignore          # Исключения для Docker build
│
├── 📚 Документация
│   ├── README.md              # Основная документация
│   ├── QUICKSTART.md          # Быстрый старт
│   ├── DEPLOYMENT.md          # Инструкции по деплою
│   ├── COOLIFY.md             # Детальная инструкция для Coolify
│   └── PROJECT_STRUCTURE.md   # Этот файл
│
├── 🔧 Утилиты
│   ├── Makefile               # Make команды для удобства
│   └── test-api.sh            # Скрипт для тестирования API
│
├── 🤖 CI/CD
│   └── .github/
│       └── workflows/
│           └── docker.yml     # GitHub Actions для Docker build/test
│
├── 🎨 Frontend (Next.js App Router)
│   └── src/
│       └── app/
│           ├── layout.tsx     # Root layout
│           ├── page.tsx       # Главная страница
│           ├── page.module.css # Стили главной страницы
│           ├── globals.css    # Глобальные стили
│           └── favicon.ico    # Иконка сайта
│
├── 🔌 Backend (Next.js API Routes)
│   └── src/
│       └── app/
│           └── api/
│               ├── health/
│               │   └── route.ts    # GET /api/health - Health check
│               └── hello/
│                   └── route.ts    # GET/POST /api/hello - Пример API
│
└── 📦 Статические файлы
    └── public/
        ├── next.svg
        ├── vercel.svg
        ├── file.svg
        ├── globe.svg
        └── window.svg
```

## 📋 Описание ключевых файлов

### Docker конфигурация

#### `Dockerfile`
Multi-stage Docker build для оптимизации размера образа:
- **Stage 1 (deps)**: Установка зависимостей
- **Stage 2 (builder)**: Сборка Next.js приложения
- **Stage 3 (runner)**: Финальный production образ

Особенности:
- Использует Node.js 20 Alpine (минимальный размер)
- Non-root пользователь для безопасности
- Standalone режим Next.js для минимизации размера
- Оптимизирован для Coolify/Docker деплоя

#### `docker-compose.yml`
Для локальной разработки и тестирования:
- Порт 3000 → 3000
- Автоматический restart
- Health check на `/api/health`

### Next.js конфигурация

#### `next.config.ts`
```typescript
output: 'standalone'  // Критично для Docker!
```
Включает standalone режим - Next.js создает минимальную версию для production.

### API Routes

#### `src/app/api/health/route.ts`
Health check endpoint для мониторинга:
- Используется Docker health check
- Используется Coolify monitoring
- Простой JSON ответ со статусом

#### `src/app/api/hello/route.ts`
Пример полнофункционального API:
- **GET**: с query параметрами
- **POST**: с JSON body
- Обработка ошибок
- TypeScript типизация

### Утилиты

#### `Makefile`
Упрощенные команды:
```bash
make dev              # npm run dev
make docker-up        # docker-compose up -d
make test-api         # тест API endpoints
make help             # показать все команды
```

#### `test-api.sh`
Bash скрипт для быстрого тестирования всех endpoints:
```bash
./test-api.sh                    # localhost
./test-api.sh your-domain.com    # production
```

### CI/CD

#### `.github/workflows/docker.yml`
Автоматическая проверка при push:
1. Собирает Docker образ
2. Запускает контейнер
3. Тестирует health check
4. Можно расширить для деплоя

## 🚀 Как это работает?

### Локальная разработка
```
npm run dev
    ↓
Next.js Dev Server (Hot Reload)
    ↓
http://localhost:3000
```

### Production с Docker
```
docker build
    ↓
Multi-stage build:
  1. Установка deps
  2. Build Next.js
  3. Создание minimal runtime
    ↓
Docker Image (optimized)
    ↓
docker run / docker-compose
    ↓
Node.js server (standalone)
    ↓
http://localhost:3000
```

### Coolify деплой
```
git push
    ↓
Coolify Webhook (optional)
    ↓
Clone repository
    ↓
Detect Dockerfile
    ↓
Build Docker image
    ↓
Deploy container
    ↓
Health check (/api/health)
    ↓
Setup SSL (Let's Encrypt)
    ↓
https://your-domain.com ✅
```

## 📊 Размеры

- **Source code**: ~100 KB
- **node_modules**: ~400 MB (dev)
- **Docker image**: ~200-250 MB (optimized)
- **Standalone build**: ~50-80 MB

## 🔒 Безопасность

- ✅ Non-root пользователь в Docker
- ✅ Минимальный Alpine образ
- ✅ .dockerignore для исключения лишних файлов
- ✅ Environment variables для конфигурации
- ✅ HTTPS через Coolify/Let's Encrypt

## 🎯 Следующие шаги для расширения

1. **База данных**
   ```bash
   # Добавить в docker-compose.yml
   services:
     postgres:
       image: postgres:16-alpine
       ...
   ```

2. **Дополнительные API routes**
   ```
   src/app/api/
   ├── users/route.ts
   ├── auth/route.ts
   └── data/route.ts
   ```

3. **Middleware**
   ```typescript
   // src/middleware.ts
   export function middleware(request: NextRequest) {
     // CORS, Auth, Logging
   }
   ```

4. **Environment конфигурация**
   ```bash
   # .env.production
   DATABASE_URL=postgresql://...
   API_KEY=...
   ```

5. **Мониторинг**
   - Sentry для error tracking
   - Prometheus для метрик
   - Winston/Pino для логирования

## 📖 Дополнительные ресурсы

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Docker Multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)
- [Coolify Documentation](https://coolify.io/docs)
- [Next.js Standalone](https://nextjs.org/docs/app/api-reference/next-config-js/output)

