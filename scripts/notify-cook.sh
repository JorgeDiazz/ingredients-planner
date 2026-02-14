#!/bin/bash
# Sends a daily WhatsApp reminder to the cook via CallMeBot
# Scheduled via crontab at 12:00 Colombia time (America/Bogota)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"

# Load .env
if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env file not found at $ENV_FILE"
  exit 1
fi

PHONE=$(grep '^CALLMEBOT_PHONE=' "$ENV_FILE" | cut -d'"' -f2)
API_KEY=$(grep '^CALLMEBOT_API_KEY=' "$ENV_FILE" | cut -d'"' -f2)

if [ -z "$PHONE" ] || [ -z "$API_KEY" ] || [ "$API_KEY" = "REPLACE_WITH_YOUR_API_KEY" ]; then
  echo "Error: CALLMEBOT_PHONE or CALLMEBOT_API_KEY not configured in .env"
  exit 1
fi

# Get local IP for the link
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || echo "localhost")

MESSAGE="🍳 Hora de revisar la cocina! Entra a la plataforma y actualiza las cantidades de tus ingredientes: http://${LOCAL_IP}:3000"

# URL-encode the message
ENCODED_MSG=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$MESSAGE'''))")

# Send via CallMeBot
curl -s -o /dev/null -w "%{http_code}" \
  "https://api.callmebot.com/whatsapp.php?phone=${PHONE}&text=${ENCODED_MSG}&apikey=${API_KEY}"

echo " - Notification sent at $(date)"
