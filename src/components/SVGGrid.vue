<template>
  <svg :viewBox="`0 0 ${state.columns * cellSize} ${state.rows * cellSize}`">
    <rect
      :key="cell.index"
      v-for="cell in state.cells"
      :width="cellSize"
      :height="cellSize"
      :x="cell.column * cellSize"
      :y="cell.row * cellSize"
      class="fill-current stroke-current stroke-1 transition-colors duration-200"
      :class="
        cell.alive
          ? 'text-teal-400 hover:text-gray-700'
          : 'text-gray-700 hover:text-teal-400'
      "
      @click="handleClick(cell)"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Grid, Cell } from 'conway-game-of-life/dist/types';
export default defineComponent({
  name: 'SVGGrid',

  props: {
    state: {
      type: Object as () => Grid,
      required: true,
    },
  },

  emits: ['cell-clicked'],

  setup(props, { emit }) {
    const cellSize = ref(10);

    const handleClick = (cell: Cell) => {
      emit('cell-clicked', cell);
    };

    return {
      cellSize,
      handleClick,
    };
  },
});
</script>
