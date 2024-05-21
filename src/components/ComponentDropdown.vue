<script setup lang="ts">
import { errors } from '@/composables/errors';
import { ref } from 'vue';

interface Input {
  k: any;
  label: string;
  value: any[];
}

const visible = ref(false);

const props = defineProps<Input>();

const model = defineModel<any>();
</script>

<template>
  <label :for="props.k">{{ props.label }}</label>

  <ul :class="{ error: errors[props.k] }">
    <li @click="visible = !visible" :id="props.k">
      {{ model.name || 'Выбрать из списка' }}
    </li>

    <ul v-if="visible">
      <li v-for="item in props.value" :key="item" @click="(model = item), (visible = false)">
        {{ item.name }}
      </li>
    </ul>
  </ul>

  <span v-if="errors[props.k]">{{ errors[props.k] }}</span>
</template>

<style scoped lang="scss">
span {
  display: block;
  font-size: 14px;
}

ul {
  border-radius: 3px;
  border: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 10px 0;
  width: 100%;

  &.error {
    border-color: tomato;
  }

  li {
    cursor: pointer;
    display: block;
    padding: 12px;
  }

  ul {
    border-radius: unset;
    border: unset;

    li {
      padding: 0 0 0 12px;
      width: fit-content;

      &:hover {
        color: var(--c-scheme);
      }
    }
  }
}
</style>
