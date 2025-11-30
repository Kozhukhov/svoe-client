#!/bin/bash

# Скрипт для тестирования API endpoints
# Использование: ./test-api.sh [host]
# По умолчанию: localhost:3000

HOST=${1:-localhost:3000}

echo "🧪 Тестирование API на $HOST"
echo "================================"
echo ""

echo "1️⃣  Health Check (GET /api/health)"
echo "-----------------------------------"
curl -s "http://$HOST/api/health" | json_pp || curl -s "http://$HOST/api/health"
echo -e "\n"

echo "2️⃣  Hello API - GET (GET /api/hello?name=Alex)"
echo "-----------------------------------------------"
curl -s "http://$HOST/api/hello?name=Alex" | json_pp || curl -s "http://$HOST/api/hello?name=Alex"
echo -e "\n"

echo "3️⃣  Hello API - POST (POST /api/hello)"
echo "---------------------------------------"
curl -s -X POST "http://$HOST/api/hello" \
  -H "Content-Type: application/json" \
  -d '{"message":"Test message","data":{"key":"value"}}' \
  | json_pp || curl -s -X POST "http://$HOST/api/hello" \
  -H "Content-Type: application/json" \
  -d '{"message":"Test message","data":{"key":"value"}}'
echo -e "\n"

echo "================================"
echo "✅ Тестирование завершено!"

