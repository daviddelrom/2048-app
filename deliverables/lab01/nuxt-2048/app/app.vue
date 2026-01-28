<template>
  <div id="app">
    <h1>2048</h1>
    <div class="score">Score: {{ score }}</div>
    <div class="grid" @keydown="handleKeydown" tabindex="0">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" :class="['cell', 'tile-' + cell]">
          {{ cell || '' }}
        </div>
      </div>
    </div>
    <button @click="resetGame">Reset Game</button>
    <div v-if="gameOver" class="game-over">Game Over!</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const grid = ref(Array(4).fill().map(() => Array(4).fill(0)))
const score = ref(0)
const gameOver = ref(false)

function addRandomTile() {
  const emptyCells = []
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid.value[i][j] === 0) {
        emptyCells.push([i, j])
      }
    }
  }
  if (emptyCells.length > 0) {
    const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    grid.value[i][j] = Math.random() < 0.9 ? 2 : 4
  }
}

function moveLeft(row) {
  const newRow = row.filter(cell => cell !== 0)
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2
      score.value += newRow[i]
      newRow.splice(i + 1, 1)
    }
  }
  while (newRow.length < 4) {
    newRow.push(0)
  }
  return newRow
}

function moveRight(row) {
  const reversed = row.slice().reverse()
  const moved = moveLeft(reversed).reverse()
  return moved
}

function transpose(grid) {
  return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]))
}

function move(direction) {
  let newGrid = [...grid.value.map(row => [...row])]
  if (direction === 'left') {
    newGrid = newGrid.map(moveLeft)
  } else if (direction === 'right') {
    newGrid = newGrid.map(moveRight)
  } else if (direction === 'up') {
    newGrid = transpose(newGrid).map(moveLeft)
    newGrid = transpose(newGrid)
  } else if (direction === 'down') {
    newGrid = transpose(newGrid).map(moveRight)
    newGrid = transpose(newGrid)
  }
  if (JSON.stringify(newGrid) !== JSON.stringify(grid.value)) {
    grid.value = newGrid
    addRandomTile()
    checkGameOver()
  }
}

function checkGameOver() {
  // Check if any moves are possible
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid.value[i][j] === 0) return
      if (i < 3 && grid.value[i][j] === grid.value[i + 1][j]) return
      if (j < 3 && grid.value[i][j] === grid.value[i][j + 1]) return
    }
  }
  gameOver.value = true
}

function handleKeydown(event) {
  if (gameOver.value) return
  switch (event.key) {
    case 'ArrowLeft':
      move('left')
      break
    case 'ArrowRight':
      move('right')
      break
    case 'ArrowUp':
      move('up')
      break
    case 'ArrowDown':
      move('down')
      break
  }
}

function resetGame() {
  grid.value = Array(4).fill().map(() => Array(4).fill(0))
  score.value = 0
  gameOver.value = false
  addRandomTile()
  addRandomTile()
}

onMounted(() => {
  resetGame()
})
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.grid {
  display: inline-block;
  background: #bbada0;
  border-radius: 6px;
  padding: 15px;
  position: relative;
}

.row {
  display: flex;
}

.cell {
  width: 100px;
  height: 100px;
  margin: 5px;
  border-radius: 3px;
  background: #cdc1b4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  color: #776e65;
}

.tile-2 { background: #eee4da; }
.tile-4 { background: #ede0c8; }
.tile-8 { background: #f2b179; color: #f9f6f2; }
.tile-16 { background: #f59563; color: #f9f6f2; }
.tile-32 { background: #f67c5f; color: #f9f6f2; }
.tile-64 { background: #f65e3b; color: #f9f6f2; }
.tile-128 { background: #edcf72; color: #f9f6f2; font-size: 28px; }
.tile-256 { background: #edcc61; color: #f9f6f2; font-size: 28px; }
.tile-512 { background: #edc850; color: #f9f6f2; font-size: 28px; }
.tile-1024 { background: #edc53f; color: #f9f6f2; font-size: 22px; }
.tile-2048 { background: #edc22e; color: #f9f6f2; font-size: 22px; }

.score {
  font-size: 24px;
  margin-bottom: 20px;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(238, 228, 218, 0.73);
  padding: 20px;
  border-radius: 6px;
  font-size: 36px;
  font-weight: bold;
}
</style>
