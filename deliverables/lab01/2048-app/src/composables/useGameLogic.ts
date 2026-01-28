/**
 * Composable para la lógica de movimientos del 2048
 * Maneja: deslizamiento, fusión de tiles, detección de game over
 */
import { ref } from 'vue'

type Grid = [number[], number[], number[], number[]]

export const useGameLogic = (
  grid: any,
  score: any,
  gameOver: any,
  won: any,
  spawnTile: () => void
) => {
  /**
   * Desliza un array hacia la izquierda y fusiona tiles iguales
   */
  const slideLeft = (row: number[]): { row: number[], points: number } => {
    let arr = row.filter(val => val !== 0)
    let points = 0

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] = arr[i] * 2
        points += arr[i]
        
        if (arr[i] === 2048) {
          won.value = true
        }
        
        arr.splice(i + 1, 1)
      }
    }

    while (arr.length < 4) {
      arr.push(0)
    }

    return { row: arr, points }
  }

  /**
   * Mueve el grid en una dirección dada
   */
  const move = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver.value) return

    const oldGrid = JSON.stringify(grid.value)
    let totalPoints = 0
    const newGrid: Grid = grid.value.map((row: number[]) => [...row]) as Grid

    if (direction === 'left') {
      for (let r = 0; r < 4; r++) {
        const { row: newRow, points } = slideLeft(newGrid[r as 0|1|2|3])
        newGrid[r as 0|1|2|3] = newRow
        totalPoints += points
      }
    } else if (direction === 'right') {
      for (let r = 0; r < 4; r++) {
        const { row: newRow, points } = slideLeft([...newGrid[r as 0|1|2|3]].reverse())
        newGrid[r as 0|1|2|3] = newRow.reverse()
        totalPoints += points
      }
    } else if (direction === 'up') {
      for (let c = 0; c < 4; c++) {
        const col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]]
        const { row: newRow, points } = slideLeft(col)
        for (let r = 0; r < 4; r++) {
          newGrid[r as 0|1|2|3][c] = newRow[r]
        }
        totalPoints += points
      }
    } else if (direction === 'down') {
      for (let c = 0; c < 4; c++) {
        const col = [newGrid[3][c], newGrid[2][c], newGrid[1][c], newGrid[0][c]]
        const { row: newRow, points } = slideLeft(col)
        for (let r = 0; r < 4; r++) {
          newGrid[(3 - r) as 0|1|2|3][c] = newRow[r]
        }
        totalPoints += points
      }
    }

    // Solo procesa si el grid cambió
    if (JSON.stringify(newGrid) !== oldGrid) {
      grid.value = newGrid
      score.value += totalPoints
      spawnTile()
      checkGameOver()
    }
  }

  /**
   * Detecta si el juego terminó
   */
  const checkGameOver = () => {
    const currentGrid = grid.value

    // Verifica si hay celdas vacías
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentGrid[r as 0|1|2|3][c] === 0) return
      }
    }

    // Verifica si hay movimientos posibles (tiles iguales adyacentes)
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        if (currentGrid[r as 0|1|2|3][c] === currentGrid[r as 0|1|2|3][c + 1]) return
      }
    }

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentGrid[r as 0|1|2|3][c] === currentGrid[(r + 1) as 0|1|2|3][c]) return
      }
    }

    gameOver.value = true
  }

  return {
    move,
    checkGameOver
  }
}
