<template>
  <div class="container min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-md mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-4xl font-bold">2048</h1>
          <p class="text-gray-600">Join the tiles, get to 2048!</p>
        </div>
        <button
          @click="handleNewGame"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          New Game
        </button>
      </div>

      <!-- Score Display -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-white p-4 rounded text-center">
          <p class="text-gray-600 text-sm">Score</p>
          <p class="text-3xl font-bold">{{ score }}</p>
        </div>
        <div class="bg-white p-4 rounded text-center">
          <p class="text-gray-600 text-sm">Best</p>
          <p class="text-3xl font-bold">{{ bestScore }}</p>
        </div>
      </div>

      <!-- Game Board -->
      <Board :grid="grid" />

      <!-- Instructions -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <p><strong>HOW TO PLAY:</strong> Use arrow keys or WASD to move.</p>
        <p class="mt-1">Tiles with the same number merge when they touch.</p>
      </div>

      <!-- Game Over Modal -->
      <div
        v-if="gameOver"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white p-8 rounded-lg text-center">
          <h2 class="text-3xl font-bold mb-4">Game Over!</h2>
          <p class="text-xl mb-4">Final Score: {{ score }}</p>
          <button
            @click="handleNewGame"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
          >
            Play Again
          </button>
        </div>
      </div>

      <!-- Won Modal -->
      <div
        v-if="won && !gameOver"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white p-8 rounded-lg text-center">
          <h2 class="text-3xl font-bold mb-4 text-green-600">You Won!</h2>
          <p class="text-xl mb-4">Score: {{ score }}</p>
          <button
            @click="handleNewGame"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import Board from './Board.vue'
import { useGameState } from '../composables/useGameState'
import { useGameLogic } from '../composables/useGameLogic'

const { grid, score, gameOver, won, spawnTile, resetGame } = useGameState()
const { move } = useGameLogic(grid, score, gameOver, won, spawnTile)

const bestScore = ref(localStorage.getItem('bestScore2048') ? parseInt(localStorage.getItem('bestScore2048')!) : 0)

const handleNewGame = () => {
  resetGame()
}

const handleKeyPress = (e: KeyboardEvent) => {
  const key = e.key.toLowerCase()
  
  if (['arrowup', 'w'].includes(key)) {
    e.preventDefault()
    move('up')
  } else if (['arrowdown', 's'].includes(key)) {
    e.preventDefault()
    move('down')
  } else if (['arrowleft', 'a'].includes(key)) {
    e.preventDefault()
    move('left')
  } else if (['arrowright', 'd'].includes(key)) {
    e.preventDefault()
    move('right')
  }
}

// Watch score changes to update best score
const watcher = watch(score, (newScore) => {
  if (newScore > bestScore.value) {
    bestScore.value = newScore
    localStorage.setItem('bestScore2048', bestScore.value.toString())
  }
})

onMounted(() => {
  resetGame()
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
  watcher()
})
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
}
</style>
