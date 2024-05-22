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
  <label :for="props.k">{{ props.label }}</label>

  <textarea :class="{ error: errors[k] }" rows="5" :id="props.k" v-model="model"></textarea>

  <template v-if="errors[props.k]">
    <span v-for="error in errors[props.k]" :key="error">{{ error }}</span>
  </template>
</template>

<style scoped lang="scss">
label {
  display: block;
  margin: 12px 0 0;
}

textarea {
  border-radius: 3px;
  border: 1px solid var(--c-border);
  display: block;
  margin: 10px 0;
  padding: 12px;
  width: 100%;
}

/* shake animation for error */
textarea.error {
  border-color: tomato;
}

span {
  display: block;
}
</style>
