<script setup lang="ts">
import ComponentCheckbox from '@/components/ComponentCheckbox.vue';
import ComponentInput from '@/components/ComponentInput.vue';
import ComponentTextarea from '@/components/ComponentTextarea.vue';
import { errors, setErrors } from '@/composables/errors';
import { Protector, isNonEmptyString } from '@/composables/validates';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { StoreSubCategory } from '../stores';
import type { SubCategory } from '../types';

const store = StoreSubCategory();

const data = reactive<SubCategory>({
  name: '',
  description: '',
  content: '',
  published: false
});

// Create an instance of Protector class with rules for the field
const protector = new Protector(
  {
    fieldName: 'name',
    rule: (value: string) => isNonEmptyString(value),
    errorMessage: 'Наименование - это обязательное поле'
  },
  {
    fieldName: 'description',
    rule: (value: string) => isNonEmptyString(value),
    errorMessage: 'Описание - это обязательное поле'
  }
);

const prepareSubmit = () => {
  // Synchronous testing
  const errors = protector.validate(data);
  if (Object.keys(errors).length !== 0) {
    setErrors(errors);
    return;
  }

  store.create(data);
};
</script>

<template>
  <main>
    <nav>
      <RouterLink :to="{ name: 'category' }" title="Новая запись" class="button">
        <span>Назад</span>
      </RouterLink>
    </nav>

    <h1>Создание подкатегории</h1>

    <section class="card">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam veritatis molestias libero magnam quod impedit, illo veniam ipsam facilis vitae fugit, repellendus maiores
        dolor optio delectus debitis officia voluptatum! Sapiente.
      </p>
    </section>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentInput label="Наименование" v-model="data.name" type="text" required="name"></ComponentInput>

      <ComponentTextarea label="Описание" v-model="data.description" required="description"></ComponentTextarea>

      <ComponentTextarea label="Содержимое" v-model="data.content" required="content"></ComponentTextarea>

      <ComponentCheckbox label="Опубликовать" v-model="data.published" required="published"></ComponentCheckbox>
    </section>

    <button type="button" v-on:click="prepareSubmit()">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"
        />
      </svg>

      <span>Сохранить</span>
    </button>
  </main>
</template>

<style scoped lang="scss">
main {
  overflow: auto;
}

nav {
  display: flex;
  gap: 24px;

  a {
    background-color: var(--c-border);

    &:hover {
      background-color: #707a8a;
    }
  }

  button {
    background-color: var(--c-border);

    &:hover {
      background-color: tomato;
    }
  }
}

section {
  padding: 24px;
}
</style>
