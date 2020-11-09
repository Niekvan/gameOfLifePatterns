<template>
  <div class="home">
    <SVGGrid :state="gameState" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { GameOfLife } from 'conway-game-of-life';

import SVGGrid from '../components/SVGGrid.vue';

export default defineComponent({
  name: 'Home',
  components: {
    // HelloWorld,
    SVGGrid,
  },

  setup() {
    const game = new GameOfLife({ rows: 100, columns: 100 });
    const gameState = ref(game.state);

    return {
      gameState,
    };
  },
});
</script>
