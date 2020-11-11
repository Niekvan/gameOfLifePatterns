<template>
  <div class="home h-full">
    <article
      class="container pb-10 mx-auto flex flex-col items-center text-left text-gray-900"
    >
      <h1 class="text-5xl mb-8 font-Bagnard">
        Conway's game of life
      </h1>
      <p class="body text-xl leading-8 mb-6">
        Conway's Game of Life, also known as the Game of Life or simply Life, is
        a cellular automaton devised by the British mathematician John Horton
        Conway in 1970. It is the best-known example of a cellular automaton.
        The "game" is actually a zero-player game, meaning that its evolution is
        determined by its initial state, needing no input from human players.
        One interacts with the Game of Life by creating an initial configuration
        and observing how it evolves.
      </p>
      <p class="body text-xl leading-8">
        The universe of the Game of Life is an infinite two-dimensional
        orthogonal grid of square cells, each of which is in one of two possible
        states, live or dead. Every cell interacts with its eight neighbours,
        which are the cells that are directly horizontally, vertically, or
        diagonally adjacent. At each step in time, the following transitions
        occur:
      </p>
      <ul class="body my-6 pl-6 text-xl list-decimal">
        <li class="mb-3">
          Any live cell with fewer than two live neighbours dies (referred to as
          underpopulation or exposure[1]).
        </li>
        <li class="mb-3">
          Any live cell with more than three live neighbours dies (referred to
          as overpopulation or overcrowding).
        </li>
        <li class="mb-3">
          Any live cell with two or three live neighbours lives, unchanged, to
          the next generation.
        </li>
        <li>
          Any dead cell with exactly three live neighbours will come to life.
        </li>
      </ul>
      <p class="body text-xl leading-8 mb-4">
        The initial pattern constitutes the 'seed' of the system. The first
        generation is created by applying the above rules simultaneously to
        every cell in the seed — births and deaths happen simultaneously, and
        the discrete moment at which this happens is sometimes called a tick.
        (In other words, each generation is a pure function of the one before.)
        The rules continue to be applied repeatedly to create further
        generations.
      </p>

      <a
        class="italic link text-base text-teal-500 mb-10"
        href="https://www.conwaylife.com/wiki/Conway%27s_Game_of_Life"
        rel="noreferrer noopener external"
        target="_blank"
      >
        Desciption from https://www.conwaylife.com/wiki/Conway%27s_Game_of_Life
      </a>
      <router-link to="/svg">
        <c-button>Explore patterns</c-button>
      </router-link>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from '@/components/Button.vue';

export default defineComponent({
  name: 'Home',
  components: {
    'c-button': Button,
  },
});
</script>

<style scoped>
.body {
  max-width: 32em;
}

.link {
  width: 40em;
}
</style>
