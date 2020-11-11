<template>
  <button
    class="inline-block box-border py-2 px-4 bg-teal-500 text-white rounded-md focus:border-teal-500 focus:outline-none hover:bg-teal-700 cursor-pointer"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Button',

  props: {},
});
</script>

<style></style>
