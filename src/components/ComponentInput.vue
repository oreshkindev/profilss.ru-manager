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

  <span v-if="errors[props.k]">{{ errors[props.k] }}</span>
</template>

<style scoped lang="scss">
span {
  display: block;
  font-size: 14px;
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
</style>
