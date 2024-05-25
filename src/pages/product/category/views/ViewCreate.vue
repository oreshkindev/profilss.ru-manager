<script setup lang="ts">
import ComponentCheckbox from '@/components/ComponentCheckbox.vue';
import ComponentDropdown from '@/components/ComponentDropdown.vue';
import ComponentFileUpload from '@/components/ComponentFileUpload.vue';
import ComponentInput from '@/components/ComponentInput.vue';
import ComponentTextarea from '@/components/ComponentTextarea.vue';
import { errors, setErrors } from '@/composables/errors';
import { Protector, isNonEmptyString } from '@/composables/validates';
import { StoreCategory } from '@/pages/product/category/stores';
import type { Category, File, SubCategory } from '@/pages/product/category/types';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { StoreIso } from '../../iso/stores';
import type { Iso } from '../../iso/types';
import { StoreSubCategory } from '../subcategory/stores';

const store = StoreCategory();
const sub_category = StoreSubCategory();
const iso = StoreIso();

sub_category.find();
iso.find();

const data = reactive<Category>({
  file: {
    preview: '',
    video: ''
  } as File,
  sub_category: {
    name: '',
    description: '',
    content: '',
    published: false
  } as SubCategory,
  iso: [
    {
      id: 0,
      name: ''
    } as Iso
  ] as Iso[],
  name: '',
  description: '',
  published: false
});

const addISO = () => {
  data.iso.push({
    id: 0,
    name: ''
  } as Iso);
};

const removeISO = (index: number) => {
  if (data) {
    data.iso.splice(index, 1);
  }
};

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
  },
  {
    fieldName: 'sub_category.name',
    rule: (value: string) => isNonEmptyString(value),
    errorMessage: 'Подкатегория - это обязательное поле'
  },
  {
    fieldName: 'iso[0].name',
    rule: (value: string) => isNonEmptyString(value),
    errorMessage: 'ГОСТ - это обязательное поле'
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

    <h1>Создание категории</h1>

    <section class="card">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam veritatis molestias libero magnam quod impedit, illo veniam ipsam facilis vitae fugit, repellendus maiores
        dolor optio delectus debitis officia voluptatum! Sapiente.
      </p>
    </section>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentInput label="Наименование" v-model="data.name" type="text" k="name"></ComponentInput>

      <ComponentTextarea label="Описание" v-model="data.description" k="description"></ComponentTextarea>

      <ComponentCheckbox label="Опубликовать" v-model="data.published" k="published"></ComponentCheckbox>
    </section>

    <section class="card">
      <ComponentDropdown label="Подкатегория" :value="sub_category.sub_categories" v-model="data.sub_category" k="sub_category.name"></ComponentDropdown>
    </section>

    <section class="card with__control" v-for="(c, index) of data.iso" :key="index">
      <ComponentDropdown label="ГОСТ" :value="iso.isos" v-model="data.iso[index]" :k="`iso[${index}].name`"></ComponentDropdown>

      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" @click="removeISO(index)">
        <path
          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
        />
      </svg>
    </section>

    <button type="button" v-on:click="addISO()" style="margin: auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Добавить ГОСТ</span>
    </button>

    <section class="card">
      <ComponentFileUpload v-model:file="data.file.preview" :filename="data.file.preview" type="image" accepted="image/png, image/jpeg"></ComponentFileUpload>
    </section>

    <section class="card">
      <ComponentFileUpload v-model:file="data.file.video" :filename="data.file.video" type="video" accepted="video/*"></ComponentFileUpload>
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
