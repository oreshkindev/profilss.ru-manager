<script setup lang="ts">
import { errors } from '@/composables/errors';

interface Input {
  k: string;
  label: string;
  type: 'text' | 'email' | 'password';
}

const props = defineProps<Input>();

const model = defineModel<any>();
</script>

<template>
  <label :for="props.k">{{ props.label }}</label>

  <input :class="{ error: errors[props.k] }" :type="props.type" :id="props.k" v-model="model" />

  <template v-if="errors[props.k]">
    <span v-for="error in errors[props.k]" :key="error">{{ error }}</span>
  </template>
</template>

<style scoped lang="scss">
label {
  display: block;
  margin: 12px 0 0;
}

input[type='text'],
input[type='email'],
input[type='password'] {
  border-radius: 3px;
  border: 1px solid var(--c-border);
  display: block;
  margin: 10px 0;
  padding: 12px;
  width: 100%;
}

/* shake animation for error */
input.error {
  border-color: tomato;
}

span {
  display: block;
}
</style>
