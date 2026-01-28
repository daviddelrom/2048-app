<template>
  <div
    :style="tileStyle"
    class="tile rounded-lg font-bold flex items-center justify-center transition-all duration-200"
  >
    {{ value > 0 ? value : '' }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
}>()

// Colores para cada valor de tile
const colorMap: Record<number, string> = {
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e',
  4096: '#3c3b2f'
}

const textColor = computed(() => {
  const val = props.value
  if (val === 0) return 'transparent'
  if (val <= 4) return '#776e65'
  return '#f9f6f2'
})

const tileStyle = computed(() => {
  const val = props.value
  return {
    backgroundColor: colorMap[val] || '#cdc1b4',
    color: textColor.value,
    fontSize: val >= 1024 ? '32px' : val >= 128 ? '40px' : '48px',
    width: '100%',
    height: '100%'
  }
})
</script>

<style scoped>
.tile {
  min-height: 100px;
}
</style>
