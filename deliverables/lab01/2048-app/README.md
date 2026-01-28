# 2048 Game - Lab 01

## Descripción

Implementación simplificada de la aplicación 2048 usando:
- **Vue 3** con TypeScript
- **Composables** para la lógica reutilizable
- **CSS Grid** para el tablero de juego
- **LocalStorage** para persistencia de puntuación

## Estructura del Código

### Composables
- **useGameState.ts**: Maneja el estado del juego (grid, puntuación, estado de juego)
  - `grid`: Array 4x4 que representa el tablero
  - `score`: Puntuación actual
  - `gameOver`: Indica si el juego terminó
  - `won`: Indica si alcanzó 2048
  - `spawnTile()`: Genera una nueva tile
  - `resetGame()`: Reinicia el juego

- **useGameLogic.ts**: Implementa la mecánica de juego
  - `move(direction)`: Mueve las tiles en una dirección
  - `slideLeft()`: Desliza y fusiona tiles
  - `checkGameOver()`: Detecta fin de juego

### Componentes
- **Tile.vue**: Representa una celda individual
  - Colores dinámicos según el valor
  - Estilos responsivos

- **Board.vue**: Renderiza el tablero 4x4
  - Grid CSS para layout
  - Renderiza 16 tiles

- **GameContainer.vue**: Componente principal
  - Maneja entrada de teclado (flechas + WASD)
  - Muestra puntuación y mejor puntuación
  - Modales para Game Over y Victoria
  - Persistencia de mejor puntuación en localStorage

## Características Clave

✓ **Gameplay funcional**: Movimientos en 4 direcciones, fusión de tiles
✓ **Detección inteligente de Game Over**: Verifica celdas vacías y movimientos posibles
✓ **Persistencia**: Guarda la mejor puntuación
✓ **Interfaz simple y clara**: Enfocada en usabilidad
✓ **TypeScript**: Tipado completo para mayor seguridad

## Cómo Usar

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Hacer build para producción
pnpm build
```

## Instrucciones de Juego

- **Mover**: Usa flechas ⬅️⬆️⬇️➡️ o WASD
- **Fusionar**: Tiles iguales se fusionan cuando se tocan
- **Ganar**: Alcanza la tile 2048
- **Reiniciar**: Haz clic en "New Game"

## Requisitos Cumplidos

✅ Implementación con GitHub Copilot
✅ Código en Nuxt/Vue con TypeScript
✅ Estilos con Tailwind CSS/CSS puro
✅ Lógica clara y modular
✅ Interfaz responsiva
✅ Archivo de notas documentando el proceso
