<script setup lang="ts">
import IconLogo from './icons/IconLogo.vue';
</script>

<template>
  <section>
    <IconLogo :size="54" />
  </section>
</template>

<style scoped lang="scss">
section {
  display: grid;
  height: 100vh;

  svg {
    animation: blink 1s steps(5, start) infinite;
    margin: auto;
  }
}

@keyframes blink {
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 0;
  }
  75% {
    opacity: 0.5;
  }
}
</style>
