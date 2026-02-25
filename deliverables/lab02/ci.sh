#!/bin/bash

# ===================================
# Script de integración continua
# ===================================
# Este script automatiza las siguientes tareas CI:
# 1. Instalación de dependencias
# 2. Verificación de tipado estático
# 3. Análisis estático del código
# 4. Construcción del paquete
# 5. Ejecución de pruebas
# ===================================

set -e  # Detener el script en caso de error
set -u  # Tratar variables no definidas como errores

echo "=========================================="
echo "Inicio de la tubería de integración continua"
echo "=========================================="
echo ""

# ===================================
# Paso 1: Instalación de dependencias
# ===================================
echo "Instalando dependencias..."
echo "------------------------------------------"
pnpm install
echo "✅ Dependencias instaladas con éxito"
echo ""

# ===================================
# Paso 2: Verificación del tipado estático
# ===================================
echo "Verificando tipado estático..."
echo "------------------------------------------"
pnpm nuxt typecheck
echo "✅ Tipado estático validado"
echo ""

# ===================================
# Paso 3: Análisis estático del código
# ===================================
echo "Análisis estático del código (ESLint)..."
echo "------------------------------------------"
pnpm lint
echo "✅ Análisis estático finalizado sin errores"
echo ""

# ===================================
# Paso 4: Construcción del paquete
# ===================================
echo "Construyendo paquete..."
echo "------------------------------------------"
# Nuxt genera el build en .output por defecto
# Usamos nuxt generate para crear una versión estática
pnpm nuxt generate
# Copiar el resultado al directorio publish
rm -rf publish
cp -r .output/public publish
echo "✅ Paquete construido con éxito en el directorio 'publish'"
echo ""

# ===================================
# Paso 5: Ejecución de pruebas
# ===================================
echo "Ejecutando pruebas..."
echo "------------------------------------------"
pnpm test
echo "✅ Todas las pruebas pasaron"
echo ""

# ===================================
# Paso 6: Análisis de dependencias obsoletas
# ===================================
echo "Analizando dependencias obsoletas..."
echo "------------------------------------------"
mkdir -p reports
pnpm outdated --format json > reports/outdated-dependencies.json || true
# El comando puede retornar un código de error si hay dependencias obsoletas
# Usamos '|| true' para no detener el script
if [ -s reports/outdated-dependencies.json ]; then
    echo "⚠️  Se encontraron dependencias obsoletas (ver reports/outdated-dependencies.json)"
else
    echo "✅ Todas las dependencias están actualizadas"
fi
echo ""

# ===================================
# Paso 7: Análisis de vulnerabilidades
# ===================================
echo "Analizando vulnerabilidades de dependencias..."
echo "------------------------------------------"
pnpm audit --json > reports/vulnerable-dependencies.json || true
# El comando puede retornar un código de error si se encuentran vulnerabilidades
# Usamos '|| true' para no detener el script
if [ -s reports/vulnerable-dependencies.json ]; then
    # Verificar si hay vulnerabilidades
    VULN_COUNT=$(grep -o '"vulnerabilities"' reports/vulnerable-dependencies.json | wc -l || echo "0")
    if [ "$VULN_COUNT" -gt 0 ]; then
        echo "⚠️  Se encontraron vulnerabilidades (ver reports/vulnerable-dependencies.json)"
    else
        echo "✅ No se encontraron vulnerabilidades"
    fi
else
    echo "✅ No se encontraron vulnerabilidades"
fi
echo ""

echo "=========================================="
echo "✅ ¡Tubería completada con éxito!"
echo "=========================================="
