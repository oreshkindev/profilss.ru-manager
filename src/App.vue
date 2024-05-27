<script setup lang="ts">
import { state } from '@/stores';
import { watchEffect } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import ComponentLoader from './components/ComponentLoader.vue';

const route = useRoute();

watchEffect(() => {
  state.pending ? document.body.classList.add('pending') : document.body.classList.remove('pending');
});
</script>

<template>
  <ComponentLoader v-if="state.pending"></ComponentLoader>

  <component :is="route.meta.layoutComponent">
    <RouterView />
  </component>
</template>

<style lang="scss">
:root {
  --c-border: #cbcdd6;
  --c-scheme: #5c9eff;
  --c-scheme-hover: #3b88fd;
  --c-shadow: 0 4px 16px #0033990a, 0 2px 2px #00339914;
}

body {
  background-color: #f2f4f7; // #f8fafc
  color: #707a8a;
  line-height: 1.64;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &.pending {
    overflow: hidden;
  }
}

main {
  overflow: auto;
  scrollbar-width: none;
}

b {
  font-weight: 600;
}

h1 {
  font-size: 32px;
}

button[type='button'],
.button {
  background-color: var(--c-scheme);
  border-radius: 3px;
  box-shadow: var(--c-shadow);
  color: #ffffff;

  cursor: pointer;

  display: block;
  margin: 12px 0 0;
  padding: 12px 24px;
  width: fit-content;

  &:has(svg) {
    display: flex;
    gap: 8px;
    place-items: center;
  }

  &:hover {
    background-color: var(--c-scheme-hover);
  }

  &:disabled {
    background-color: #dfe3e8;
    cursor: default;
  }
}

.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: var(--c-shadow);
}

.link {
  color: var(--c-scheme);

  &:hover {
    text-decoration: underline;
  }
}

table {
  border-collapse: collapse;

  th {
    border-bottom: 1px solid #f2f4f7;
    color: #707a8a;
    padding: 24px;
  }

  td {
    padding: 12px 24px;

    a {
      color: var(--c-scheme);
    }
  }

  th,
  td {
    font: inherit;
    text-align: left;
  }

  tr {
    &:not(:first-child) {
      &:hover {
        background-color: #f2f4f7;
      }
    }
  }
}

.error {
  animation: shake 0.5s ease-in-out 1;
}

/* shake keyframes */
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(5px);
  }
  50% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
