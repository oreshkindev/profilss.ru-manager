<script setup lang="ts">
import ComponentCheckbox from '@/components/ComponentCheckbox.vue';
import ComponentFileUpload from '@/components/ComponentFileUpload.vue';
import ComponentInput from '@/components/ComponentInput.vue';
import ComponentTextarea from '@/components/ComponentTextarea.vue';
import { errors, setErrors } from '@/composables/errors';
import { Protector, minLength } from '@/composables/validates';
import { StoreService } from '@/pages/service/stores';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import type { Service } from '../types';

const route = useRoute();

const store = StoreService();

const data = computed(() => store.service);

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
    fieldName: 'сontent',
    rule: (value: string) => minLength(value, 25),
    errorMessage: 'Содержимое публикации должно содержать не менее 25 символов'
  }
);

const prepareSubmit = () => {
  // Synchronous testing
  const errors = protector.validate(data.value);
  if (Object.keys(errors).length !== 0) {
    setErrors(errors);
    return;
  }

  store.update(data.value as Service);
};

store.first(route.params.id);
</script>

<template>
  <main v-if="data">
    <nav>
      <RouterLink :to="{ name: 'service' }" title="Новая запись" class="button">
        <span>Назад</span>
      </RouterLink>

      <button type="button" v-on:click="store.remove(route.params.id)">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
          />
        </svg>

        <span>Удалить запись</span>
      </button>
    </nav>

    <h1>Редактирование {{ data.name }}</h1>

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

      <ComponentCheckbox label="Опубликовать" v-model="data.published" k="published"></ComponentCheckbox>
    </section>

    <section class="card">
      <ComponentFileUpload v-model:file="data.file" :filename="data.file" accepted="image/png, image/jpeg"></ComponentFileUpload>
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
