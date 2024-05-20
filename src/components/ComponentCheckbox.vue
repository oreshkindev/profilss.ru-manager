<script setup lang="ts">
import { errors } from '@/composables/errors';

interface Input {
  k: string;
  label: string;
}

const props = defineProps<Input>();

const model = defineModel<any>();
</script>

<template>
  <div>
    <input :class="{ error: errors[props.k] }" type="checkbox" :id="props.k" v-model="model" />

    <label :for="props.k">{{ props.label }}</label>

    <span v-if="errors[props.k]">{{ errors[props.k] }}</span>
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  gap: 24px;
  margin: 24px 0;
  place-items: center;
}

span {
  display: block;
  font-size: 14px;
}

input[type='checkbox'] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;

  /* Remove most all native input styles */
  appearance: none;

  /* For iOS < 15 */
  background-color: #ffffff;

  border-radius: 3px;
  border: 1px solid #cbcdd6;

  cursor: pointer;

  display: flex;
  padding: 6px;

  &::before {
    box-shadow: inset 1em 1em var(--c-scheme);
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);

    content: '';

    padding: 6px;
    transform: scale(0);
  }

  &:checked {
    &::before {
      transform: scale(1);
    }
  }
}

/* shake animation for error */
input.error {
  border-color: tomato;
}
</style>
