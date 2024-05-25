<script setup lang="ts">
import { errors } from '@/composables/errors';

interface Input {
  required?: string;
  label: string;
}

const props = defineProps<Input>();

const model = defineModel<any>();
</script>

<template>
  <div>
    <label>{{ props.label }}</label>

    <template v-if="props.required">
      <input :class="{ error: errors[props.required] }" type="checkbox" v-model="model" />

      <template v-if="errors[props.required]">
        <span v-for="error in errors[props.required]" :key="error">{{ error }}</span>
      </template>
    </template>

    <template v-else>
      <input type="checkbox" v-model="model" />
    </template>
  </div>
</template>

<style scoped lang="scss">
label {
  display: block;
}

div {
  display: flex;
  gap: 24px;
  margin: 24px 0;
  place-items: center;
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

span {
  display: block;
}
</style>
