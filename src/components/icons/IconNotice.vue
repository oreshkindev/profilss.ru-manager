<script setup lang="ts">
const props = defineProps(['unread']);
</script>

<template>
  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#707a8a" viewBox="0 0 16 16">
    <path
      d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z"
    />
    <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" :fill="props.unread ? '#5c9eff' : '#707a8a'" />
  </svg>
</template>

<style scoped lang="scss">
// & else
</style>
