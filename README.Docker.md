# 🐳 Docker-инструкция для Pomeshchik Estate

## Быстрый старт

### Сборка и запуск контейнера:
```bash
docker compose up --build
```

Или с использованием старого синтаксиса:
```bash
docker-compose up --build
```

### Остановка:
```bash
docker compose down
```

## Доступ к игре

После запуска откройте в браузере:
```
http://localhost:3000
```

## Режимы работы

### Development (по умолчанию)
Контейнер запускается с hot-reload. Изменения в коде автоматически применяются.

```bash
docker compose up
```

### Production build
Собрать production-версию внутри контейнера:
```bash
docker compose run --rm app npm run build
```

## Отладка

### Просмотр логов:
```bash
docker compose logs -f app
```

### Вход в контейнер:
```bash
docker compose exec app sh
```

### Пересборка без кэша:
```bash
docker compose build --no-cache
```

## Структура Docker-файлов

- `Dockerfile` — образ на Node.js 20 Alpine
- `docker-compose.yml` — оркестрация с volume для разработки
- `.dockerignore` — исключение лишних файлов из сборки

## Технические детали

- **Base image**: `node:20-alpine`
- **Port**: 3000
- **Working directory**: `/app`
- **Volume mounts**: 
  - `.:/app` — исходный код для hot-reload
  - `/app/node_modules` — изоляция зависимостей контейнера
