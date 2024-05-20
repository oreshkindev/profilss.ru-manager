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

  <span v-if="errors[props.k]">{{ errors[props.k] }}</span>
</template>

<style scoped lang="scss">
span {
  display: block;
  font-size: 14px;
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
</style>
