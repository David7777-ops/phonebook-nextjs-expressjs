#!/bin/bash

KEY_NAME="kutt-ssh-key-prod"
REGION="ap-northeast-1"
KEY_FILE="${KEY_NAME}.pem"

# Vérifie si la clé existe localement
if [ -f "$KEY_FILE" ]; then
  echo "✅ Clé privée $KEY_FILE déjà présente localement."
else
  echo "🔐 Génération de la clé SSH..."
  ssh-keygen -t rsa -b 4096 -f "$KEY_NAME" -N ""
  if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la génération de la clé SSH."
    exit 1
  fi
fi

# Vérifie si la clé est déjà importée dans AWS
EXISTS=$(aws ec2 describe-key-pairs \
  --region "$REGION" \
  --query "KeyPairs[?KeyName=='$KEY_NAME'] | length(@)")

if [ "$EXISTS" -eq 0 ]; then
  echo "☁️ Import de la clé publique dans AWS ($REGION)..."
  aws ec2 import-key-pair \
    --key-name "$KEY_NAME" \
    --public-key-material "fileb://${KEY_NAME}.pub" \
    --region "$REGION"
else
  echo "☁️ Clé $KEY_NAME déjà présente dans AWS ($REGION)."
fi

# Protection des permissions
chmod 400 "$KEY_FILE"

echo "✅ Clé SSH prête : $KEY_FILE"