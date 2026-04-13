# Dockerfile для Pomeshchik Estate
FROM node:20-alpine

WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости (включая dev для Vite)
RUN npm ci

# Копируем исходный код
COPY . .

# Открываем порт Vite и настраиваем хост
ENV HOST=0.0.0.0
EXPOSE 3000

# Запускаем dev-сервер с хостом 0.0.0.0 для доступа извне контейнера
CMD ["npm", "run", "dev"]
