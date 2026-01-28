<template>
  <div class="board bg-gray-400 p-3 rounded-lg" :style="{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }">
    <Tile
      v-for="(value, index) in gridFlat"
      :key="index"
      :value="value"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  grid: [number[], number[], number[], number[]]
}>()

const gridFlat = computed(() => {
  return props.grid.flat()
})
</script>

<style scoped>
.board {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
