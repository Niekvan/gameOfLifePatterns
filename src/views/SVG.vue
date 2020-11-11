<template>
  <div class="home h-full flex">
    <SVGGrid
      class="h-full"
      :state="gameState"
      :running="running"
      @cell-clicked="handleCell"
    />
    <div class="buttons ml-5">
      <c-button class="ml-1" @click="start">Start</c-button>
      <c-button class="ml-1" @click="stop">Stop</c-button>
      <c-button class="ml-1" @click="randomise">Randomise</c-button>
      <c-button class="ml-1" @click="reset">Reset</c-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onBeforeMount } from 'vue';
import { GameOfLife } from 'conway-game-of-life';

import Button from '@/components/Button.vue';
import SVGGrid from '@/components/SVGGrid.vue';
import { Cell } from 'conway-game-of-life/dist/types';

export default defineComponent({
  name: 'SVG',
  components: {
    SVGGrid,
    'c-button': Button,
  },

  setup() {
    const game = new GameOfLife({ rows: 50, columns: 50 });
    const running = ref(false);

    const animationFrameId = ref(0);
    const state = reactive({
      rows: game.state.rows,
      columns: game.state.columns,
      cells: game.state.cells,
    });

    const loop = () => {
      game.sequence();
      state.cells = game.state.cells;
      animationFrameId.value = requestAnimationFrame(loop);
    };

    const handleCell = (cell: Cell) => {
      game.toggleCellAlive({ row: cell.row, column: cell.column });
      state.cells = game.state.cells;
    };

    const start = (): void => {
      animationFrameId.value = requestAnimationFrame(loop);
      running.value = true;
    };

    const stop = (): void => {
      cancelAnimationFrame(animationFrameId.value);
      running.value = false;
    };

    const randomise = () => {
      game.randomise();
      state.cells = game.state.cells;
    };

    const reset = () => {
      game.reset();
      state.cells = game.state.cells;
    };

    onBeforeMount(() => {
      randomise();
    });

    return {
      gameState: state,
      handleCell,
      start,
      stop,
      randomise,
      reset,
      running,
    };
  },
});
</script>
