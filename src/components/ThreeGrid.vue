<template>
  <div class="content h-full flex">
    <canvas ref="canvas" class="flex-1"></canvas>
    <div class="flex flex-1 items-center justify-center">
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

import {
  init as initThree,
  start,
  stop,
  reset,
  randomise,
} from '@/helpers/render';

import Button from '@/components/Button.vue';

export default defineComponent({
  name: 'ThreeJs',
  components: {
    'c-button': Button,
  },

  setup() {
    const canvas = ref(null);
    const game = new GameOfLife({ rows: 20, columns: 20 });
    game.randomise();

    onMounted(() => {
      initThree((canvas.value as unknown) as HTMLCanvasElement, game);
    });

    return {
      canvas,
      start,
      stop,
      reset,
      randomise,
    };
  },
});
</script>
