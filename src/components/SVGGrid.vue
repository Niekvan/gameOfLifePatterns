<template>
  <svg :viewBox="`0 0 ${state.columns} ${state.rows}`">
    <rect
      :key="cell.index"
      v-for="cell in cells"
      width="1"
      height="1"
      :transform="transfromCell(cell)"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Cell, Grid } from 'conway-game-of-life/dist/types';
export default defineComponent({
  name: 'SVGGrid',

  props: {
    state: {
      type: Object as () => Grid,
      required: true,
    },
  },

  setup(props) {
    const cells = ref(props.state.cells);

    const transfromCell = (cell: Cell): string => {
      return `translate(${cell.column}, ${cell.row})`;
    };

    return {
      cells,
      transfromCell,
    };
  },
});
</script>

<style></style>
