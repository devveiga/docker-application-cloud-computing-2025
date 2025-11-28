#!/bin/sh

echo "Aguardando o banco iniciar..."

while ! nc -z db 5432; do
  sleep 1
done

echo "Banco está pronto!"
npm start
