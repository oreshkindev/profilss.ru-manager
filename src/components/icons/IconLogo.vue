<script setup lang="ts">
interface Size {
  size: number;
}

const props: Size = defineProps({
  size: {
    default: 32
  }
});
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 52" fill="currentColor" :height="props.size" :width="props.size">
    <path
      d="M26.818 0a26.005 26.005 0 0 1 15.279 4.932l-7.727 16.83A16.83 16.83 0 0 0 26.82 20c-8.677 0-15.711 6.417-15.711 14.333s7.034 14.333 15.71 14.333c6.612 0 12.268-3.725 14.588-9h7.596C44.407 47.069 36.191 52 26.82 52 12.419 52 .746 40.36.746 26S12.42 0 26.82 0h-.001Z"
    />
  </svg>
</template>

<style scoped>
svg {
  color: var(--c-scheme);
}
</style>
