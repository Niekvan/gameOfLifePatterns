<template>
  <div class="content">
    <canvas ref="canvas" id="three-canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { init as initThree } from '@/helpers/render';
import { GameOfLife } from 'conway-game-of-life';

export default defineComponent({
  name: 'ThreeJs',

  setup() {
    const canvas = ref(null);
    const game = new GameOfLife({ rows: 20, columns: 20 });
    game.randomise();

    onMounted(() => {
      initThree((canvas.value as unknown) as HTMLCanvasElement, game);
    });

    return {
      canvas,
    };
  },
});
</script>

<style>
#three-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
