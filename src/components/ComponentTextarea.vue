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
  <label>{{ props.label }}</label>

  <template v-if="props.required">
    <textarea :class="{ error: errors[props.required] }" rows="5" v-model="model"></textarea>

    <template v-if="errors[props.required]">
      <span v-for="error in errors[props.required]" :key="error">{{ error }}</span>
    </template>
  </template>

  <template v-else>
    <textarea rows="5" v-model="model"></textarea>
  </template>
</template>

<style scoped lang="scss">
label {
  display: block;
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
