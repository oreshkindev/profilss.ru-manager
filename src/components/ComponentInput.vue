<script setup lang="ts">
import { errors } from '@/composables/errors';

interface Input {
  required?: string;
  label: string;
  type: 'text' | 'email' | 'password';
}

const props = defineProps<Input>();

const model = defineModel<any>();
</script>

<template>
  <label>{{ props.label }}</label>

  <template v-if="props.required">
    <input :class="{ error: errors[props.required] }" :type="props.type" v-model="model" />

    <template v-if="errors[props.required]">
      <span v-for="error in errors[props.required]" :key="error">{{ error }}</span>
    </template>
  </template>

  <template v-else>
    <input :type="props.type" v-model="model" />
  </template>
</template>

<style scoped lang="scss">
label {
  display: block;
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
