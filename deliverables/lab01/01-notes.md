# Lab 01 - Notas del Proceso

## Objetivo Logrado

Se implementó una aplicación 2048 completamente funcional usando Vue 3 y TypeScript, cumpliendo con los requisitos especificados en el TP. La aplicación incluye todas las características esenciales del juego clásico con una interfaz limpia y responsiva.

## Aprendizajes Principales

### 1. Arquitectura con Composables
- **Beneficio**: Separación clara de responsabilidades
- **Aplicación**: useGameState para estado, useGameLogic para mecánica
- **Ventaja**: Código reutilizable y testeable

### 2. Lógica de Juego 2048
- Implementación del algoritmo de deslizamiento y fusión
- Detección de Game Over revisando:
  - Existencia de celdas vacías
  - Posibilidad de fusionar tiles adyacentes iguales
- Generación probabilística de tiles (90% de 2, 10% de 4)

### 3. Gestión de Estado en Vue 3
- Uso de `ref()` para reactividad
- `computed()` para valores derivados
- `watch()` para detectar cambios y persistir datos

### 4. LocalStorage para Persistencia
- Almacenamiento de la mejor puntuación
- Recuperación al cargar la aplicación

## Metodología Adoptada

1. **Planificación**: Diseño de la arquitectura con composables
2. **Desarrollo iterativo**: 
   - Primero: composables y lógica pura
   - Luego: componentes de presentación
   - Finalmente: integración y interactividad
3. **Testing manual**: Verificación de todas las mecánicas
   - Movimientos en 4 direcciones
   - Fusiones correctas
   - Detección de Game Over
   - Persistencia de puntuación

## Dificultades Encontradas y Soluciones

### 1. Tipado de Grid 4x4 en TypeScript
**Problema**: Mantener tipos seguros para array de 4x4
```typescript
type Grid = [number[], number[], number[], number[]]
```
**Solución**: Usar tuplas tipadas de longitud exacta

### 2. Reactividad en cambios de estado
**Problema**: Grid no se re-renderizaba después de cambios
**Solución**: Crear nuevo objeto de grid en lugar de mutar el existente
```typescript
const newGrid = grid.value.map((row: number[]) => [...row]) as Grid
```

### 3. Detección correcta de Game Over
**Problema**: El algoritmo inicial no detectaba bien todas las situaciones
**Solución**: Verificar en tres pasos:
1. ¿Hay celdas vacías?
2. ¿Hay tiles horizontales iguales adyacentes?
3. ¿Hay tiles verticales iguales adyacentes?

### 4. Gestión de listeners de teclado
**Problema**: Event listeners se acumulaban
**Solución**: Limpiar listeners en `onUnmounted` y usar `passive` en eventos

## Tecnologías Utilizadas

- **Framework**: Vue 3 (Composition API)
- **Lenguaje**: TypeScript 5
- **Estilos**: CSS puro + Tailwind CSS
- **Persistencia**: LocalStorage API
- **Desarrollo**: Vite + Nuxt

## Requisitos Completados

✅ Repositorio GitHub con código de aplicación 2048
✅ Implementación usando Nuxt/Vue con TypeScript
✅ Estilos con Tailwind CSS
✅ Funcionalidad completa del juego:
  - Movimientos en 4 direcciones
  - Fusión de tiles
  - Detección de Game Over y Victoria
  - Persistencia de mejor puntuación
✅ Código limpio y modular
✅ Documentación clara

## Notas Finales

La implementación demuestra cómo organizar una aplicación Vue 3 con TypeScript de forma escalable. Los composables permiten lógica reutilizable y testeable, mientras que los componentes se mantienen simples y enfocados en la presentación.

El código es lo suficientemente simple para entender fácilmente, pero lo suficientemente robusto para ser extensible (agregar animaciones, sonidos, modos de juego, etc.).

**Versión del Lab**: 01
**Fecha**: Enero 2026
**Estado**: ✅ Completo
