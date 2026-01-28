# 📋 Lab 01 - Índice de Entregables

## 📁 Contenido

### 1. **01-notes.md** ✅
Archivo principal de notas del Lab 01 que documenta:
- **Objetivo**: Implementación de aplicación 2048 con Nuxt/Vue + TypeScript
- **Aprendizajes principales**: Composables, lógica de juego, gestión de estado
- **Metodología**: Desarrollo iterativo con testing manual
- **Dificultades resueltas**: Tipado TypeScript, reactividad, Game Over
- **Requisitos completados**: Todos ✅

### 2. **2048-app/** 📂
Carpeta conteniendo el código de la aplicación

#### **2048-app/README.md**
Documentación técnica de la implementación:
- Descripción general del proyecto
- Estructura del código (composables y componentes)
- Características clave implementadas
- Instrucciones de uso
- Tecnologías utilizadas

#### **2048-app/src/composables/**
Lógica reutilizable del juego:

- **useGameState.ts** (85 líneas)
  - Gestiona estado global: grid, score, gameOver, won
  - Funciones: `spawnTile()`, `resetGame()`
  - Uso de TypeScript estricto

- **useGameLogic.ts** (120 líneas)
  - Implementa mecánica del 2048
  - Funciones: `slideLeft()`, `move()`, `checkGameOver()`
  - Lógica de fusión de tiles y detección de fin de juego

#### **2048-app/src/components/**
Componentes Vue 3 para la interfaz:

- **Tile.vue** (40 líneas)
  - Renderiza una celda individual
  - Colores dinámicos según valor
  - Estilos responsivos

- **Board.vue** (25 líneas)
  - Tablero 4x4 con CSS Grid
  - Renderiza 16 tiles
  - Recibe grid como prop

- **GameContainer.vue** (95 líneas)
  - Componente principal de la aplicación
  - Interfaz completa: puntuación, tablero, botones
  - Listeners de teclado (flechas + WASD)
  - Modales para Game Over y Victoria
  - Persistencia en localStorage

### 3. **IMPLEMENTATION.md** 📄
Documento técnico adicional:
- Estructura detallada de archivos
- Resumen del código por archivo
- Decisiones de diseño arquitectónico
- Características implementadas
- Cómo extender la aplicación
- Validación y testing realizado

---

## 📊 Estadísticas del Código

| Aspecto | Valor |
|---------|-------|
| **Archivos TypeScript/Vue** | 5 |
| **Líneas de código funcional** | ~365 |
| **Composables** | 2 |
| **Componentes Vue** | 3 |
| **Documentación** | 3 archivos |
| **Complejidad** | Baja-Media |

---

## ✅ Requisitos Cumplidos

✅ Repositorio GitHub con código  
✅ Implementación en Nuxt/Vue + TypeScript  
✅ Estilos con CSS/Tailwind  
✅ Gameplay 2048 completo:
  - Movimientos en 4 direcciones
  - Fusión de tiles
  - Game Over y Victoria
  - Persistencia de score
✅ Código limpio y modular  
✅ Documentación completa  

---

## 🎮 Características del Juego

**Mecánica:**
- Movimiento en 4 direcciones
- Fusión de tiles idénticos (n + n = 2n)
- Generación automática de nuevas fichas
- 90% probabilidad de 2, 10% probabilidad de 4

**Interfaz:**
- Puntuación actual y mejor puntuación
- Tablero visual 4x4
- Colores únicos por valor de tile
- Modales de Game Over y Victoria
- Botón "New Game"

**Entrada:**
- Teclado: Flechas directionales + WASD
- Eventos bien manejados con preventDefault()

**Persistencia:**
- Mejor puntuación guardada en localStorage
- Se restaura al recargar la página

---

## 📝 Notas Finales

Esta implementación demuestra una arquitectura Vue 3 moderna y profesional:

1. **Composables** para separación de lógica
2. **TypeScript** para type-safety
3. **Componentes funcionales** simples y focalizados
4. **Documentación clara** para mantenibilidad

El código es educativo, escalable y listo para extender con:
- Animaciones
- Sonidos
- Modos de dificultad
- Estadísticas avanzadas
- Tema oscuro/claro

---

**Status**: ✅ COMPLETADO  
**Versión**: Lab 01  
**Fecha**: Enero 2026
