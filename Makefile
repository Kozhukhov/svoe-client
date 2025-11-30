.PHONY: help dev build start docker-build docker-up docker-down docker-restart test-api clean

help: ## Показать это сообщение помощи
	@echo "Доступные команды:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Запустить dev сервер
	npm run dev

build: ## Собрать production версию
	npm run build

start: ## Запустить production сервер
	npm run start

docker-build: ## Собрать Docker образ
	docker build -t svoe-client .

docker-up: ## Запустить Docker контейнер
	docker-compose up -d

docker-down: ## Остановить Docker контейнер
	docker-compose down

docker-restart: ## Перезапустить Docker контейнер
	docker-compose down && docker-compose up --build -d

docker-logs: ## Показать логи Docker контейнера
	docker-compose logs -f

test-api: ## Протестировать API endpoints
	./test-api.sh

clean: ## Очистить сборку и зависимости
	rm -rf .next
	rm -rf node_modules
	rm -rf out

install: ## Установить зависимости
	npm install

