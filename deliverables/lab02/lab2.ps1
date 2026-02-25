#!/bin/bash

## Parte Para ir más allá ##
echo "Identificación de dependencias obsoletas"
mkdir -Force reports | Out-Null
pnpm outdated --format json > reports/outdated-dependencies.json
# pnpm up --latest

echo "Identificación de dependencias vulnerables"
pnpm audit --json  > reports/vulnerable-dependencies.json   
# pnpm audit --fix
## Parte Para ir más allá ##

echo "Instalación de las dependencias del proyecto"
pnpm install

echo "Verificación de tipos" 
pnpm nuxt typecheck

echo "Construcción del proyecto"
pnpm nuxt build

echo "Análisis estático"
pnpm eslint .

# echo "Lanzamiento del paquete creado" 
# pnpm nuxt preview

echo "Ejecución de las pruebas"
pnpm vitest run