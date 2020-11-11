<template>
  <div class="content h-full flex">
    <canvas ref="canvas" class="w-1/2"></canvas>
    <div class="w-1/2 flex items-center justify-center">
      <c-button class="ml-1" @click="start">Start</c-button>
      <c-button class="ml-1" @click="stop">Stop</c-button>
      <c-button class="ml-1" @click="randomise">Randomise</c-button>
      <c-button class="ml-1" @click="reset">Empty grid</c-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { GameOfLife } from 'conway-game-of-life';

import Button from '@/components/Button.vue';
import { Cell } from 'conway-game-of-life/dist/types';

export default defineComponent({
  name: 'ThreeJs',
  components: {
    'c-button': Button,
  },

  setup() {
    const canvas = ref(null);
    const animationFrameID = ref(0);
    const cellSize = ref(0);
    const ctx = ref();
    const running = ref(false);

    const game = new GameOfLife({ rows: 20, columns: 20 });

    const fillCanvas = (cells: Cell[], x = -1, y = -1) => {
      for (const cell of cells) {
        ctx.value.beginPath();
        ctx.value.rect(
          cell.column * cellSize.value,
          cell.row * cellSize.value,
          cellSize.value,
          cellSize.value
        );
        ctx.value.fillStyle =
          cell.alive || ctx.value.isPointInPath(x, y) ? '#FF7586' : '#181818';
        ctx.value.fill();
      }
    };

    const loop = () => {
      game.sequence();
      fillCanvas(game.state.cells);
      animationFrameID.value = requestAnimationFrame(loop);
    };

    const start = () => {
      running.value = true;
      animationFrameID.value = requestAnimationFrame(loop);
    };

    const stop = () => {
      running.value = false;
      cancelAnimationFrame(animationFrameID.value);
    };

    const randomise = () => {
      stop();
      game.randomise();
      fillCanvas(game.state.cells);
    };

    const reset = () => {
      stop();
      game.reset();
      fillCanvas(game.state.cells);
    };

    onMounted(() => {
      const canvasEl = (canvas.value as unknown) as HTMLCanvasElement;
      ctx.value = canvasEl.getContext('2d') as CanvasRenderingContext2D;

      const scale = window.devicePixelRatio;
      const size = window.innerWidth / 2;

      cellSize.value = Math.floor(size / game.state.columns);
      canvasEl.width = Math.floor(size * scale);
      canvasEl.height = Math.floor(size * scale);

      ctx.value.scale(scale, scale);

      game.randomise();
      fillCanvas(game.state.cells);

      canvasEl.onmousemove = (e: MouseEvent) => {
        // ignore mouse event when the sequence is running
        if (running.value) return;

        const rect = canvasEl.getBoundingClientRect();
        const x = e.clientX * scale - rect.left;
        const y = e.clientY * scale - rect.top;
        fillCanvas(game.state.cells, x, y);
      };

      canvasEl.onmouseleave = () => {
        fillCanvas(game.state.cells);
      };

      canvasEl.onclick = (e: MouseEvent) => {
        // ignore mouse event when the sequence is running
        if (running.value) return;

        const rect = canvasEl.getBoundingClientRect();
        console.log(rect);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const column = Math.floor(x / cellSize.value);
        const row = Math.floor(y / cellSize.value);
        game.toggleCellAlive({ column, row });
        fillCanvas(game.state.cells);
      };
    });

    return {
      canvas,
      start,
      stop,
      randomise,
      reset,
    };
  },
});
</script>
