<script setup lang="ts">
import ComponentCheckbox from '@/components/ComponentCheckbox.vue';
import ComponentFileUpload from '@/components/ComponentFileUpload.vue';
import ComponentInput from '@/components/ComponentInput.vue';
import ComponentTextarea from '@/components/ComponentTextarea.vue';
import { errors, setErrors } from '@/composables/errors';
import { Protector, minLength } from '@/composables/validates';
import { StoreService } from '@/pages/service/stores';
import type { Service } from '@/pages/service/types';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

const { create } = StoreService();

const data = reactive<Service>({
  description: '',
  content: '',
  file: '',
  published: false,
  name: '',
  quote: ''
});

// Create an instance of Protector class with rules for the field
const protector = new Protector(
  {
    fieldName: 'name',
    rule: (value: string) => minLength(value, 5),
    errorMessage: 'Название должно содержать не менее 5 символов'
  },
  {
    fieldName: 'description',
    rule: (value: string) => minLength(value, 5),
    errorMessage: 'Описание должно содержать не менее 5 символов'
  },
  {
    fieldName: 'content',
    rule: (value: string) => minLength(value, 25),
    errorMessage: 'Содержимое публикации должно содержать не менее 25 символов'
  }
);

const prepareSubmit = () => {
  // Synchronous testing
  const errors = protector.validate(data);
  if (Object.keys(errors).length !== 0) {
    setErrors(errors);
    return;
  }

  create(data);
};
</script>

<template>
  <main>
    <nav>
      <RouterLink :to="{ name: 'service' }" title="Новая запись" class="button">
        <span>Назад</span>
      </RouterLink>
    </nav>

    <h1>Создание услуги</h1>

    <section class="card">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis vel vero suscipit voluptas nobis! Tempore voluptas eum qui obcaecati blanditiis nemo nostrum, laboriosam
        porro necessitatibus reiciendis officia nam, molestiae aliquid!
      </p>
    </section>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentInput label="Название" v-model="data.name" type="text" k="name"></ComponentInput>

      <ComponentTextarea label="Описание" v-model="data.description" k="description"></ComponentTextarea>

      <ComponentTextarea label="Содержимое публикации" v-model="data.content" k="content"></ComponentTextarea>

      <ComponentTextarea label="Цитата" v-model="data.quote" k="quote"></ComponentTextarea>

      <ComponentCheckbox label="Опубликовать" v-model="data.published" k="published"></ComponentCheckbox>
    </section>

    <section class="card">
      <ComponentFileUpload v-model:file="data.file" :filename="data.file" type="image" accepted="image/png, image/jpeg"></ComponentFileUpload>
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
