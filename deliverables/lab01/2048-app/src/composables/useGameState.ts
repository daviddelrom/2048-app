/**
 * Composable para manejar el estado del juego 2048
 * Gestiona: grid, puntuación, estado de juego
 */
import { ref } from 'vue'

type Grid = [number[], number[], number[], number[]]

export const useGameState = () => {
  const grid = ref<Grid>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  const score = ref(0)
  const gameOver = ref(false)
  const won = ref(false)

  /**
   * Crea un grid vacío
   */
  const createEmptyGrid = (): Grid => [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  /**
   * Genera una nueva tile (2 o 4) en una posición aleatoria vacía
   */
  const spawnTile = () => {
    const emptyCells: [number, number][] = []
    
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid.value[r as 0|1|2|3][c] === 0) {
          emptyCells.push([r, c])
        }
      }
    }

    if (emptyCells.length > 0) {
      const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      const newGrid = grid.value.map((row: number[]) => [...row]) as Grid
      newGrid[r as 0|1|2|3][c] = Math.random() < 0.9 ? 2 : 4
      grid.value = newGrid
    }
  }

  /**
   * Reinicia el juego
   */
  const resetGame = () => {
    grid.value = createEmptyGrid()
    score.value = 0
    gameOver.value = false
    won.value = false
    
    // Genera dos tiles iniciales
    spawnTile()
    spawnTile()
  }

  return {
    grid,
    score,
    gameOver,
    won,
    spawnTile,
    resetGame
  }
}
