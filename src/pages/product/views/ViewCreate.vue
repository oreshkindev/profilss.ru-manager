<script setup lang="ts">
import ComponentCheckbox from '@/components/ComponentCheckbox.vue';
import ComponentDropdown from '@/components/ComponentDropdown.vue';
import ComponentFileUpload from '@/components/ComponentFileUpload.vue';
import ComponentInput from '@/components/ComponentInput.vue';
import ComponentTextarea from '@/components/ComponentTextarea.vue';
import { errors, setErrors } from '@/composables/errors';
import { Protector, isNonEmptyString, minLength } from '@/composables/validates';
import { StoreProduct } from '@/pages/product/stores';
import { StoreCategory } from '@/pages/product/stores/category';
import { StoreCharacteristic } from '@/pages/product/stores/characteristic';
import { StoreMeasure } from '@/pages/product/stores/measure';
import type { Category, Characteristic, Measure, Product, ProductCharacteristics } from '@/pages/product/types';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

const { create } = StoreProduct();

const category = StoreCategory();
const characteristic = StoreCharacteristic();
const measure = StoreMeasure();

category.find();
characteristic.find();
measure.find();

const data = reactive<Product>({
  characteristics: [
    {
      characteristic: {
        id: 0,
        name: '',
        description: ''
      } as Characteristic,
      measure: {
        id: 0,
        name: '',
        code: ''
      } as Measure,
      value: ''
    }
  ] as ProductCharacteristics[],
  category: {
    id: 0,
    name: '',
    description: ''
  } as Category,
  description: '',
  file: '',
  published: false,
  name: ''
});

const addCharacteristic = () => {
  data.characteristics.push({
    characteristic: {
      id: 0,
      name: '',
      description: ''
    } as Characteristic,
    measure: {
      id: 0,
      name: '',
      code: ''
    } as Measure,
    value: ''
  });
};

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
    fieldName: 'category.name',
    rule: (value: any) => isNonEmptyString(value),
    errorMessage: 'Категория - это обязательное поле'
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
<!-- TODO дропдауны -->
<template>
  <main>
    <nav>
      <RouterLink :to="{ name: 'product' }" title="Новая запись" class="button">
        <span>Назад</span>
      </RouterLink>
    </nav>

    <h1>Создание товарной позиции</h1>

    <section class="card">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis vel vero suscipit voluptas nobis! Tempore voluptas eum qui obcaecati blanditiis nemo nostrum, laboriosam
        porro necessitatibus reiciendis officia nam, molestiae aliquid!
      </p>
    </section>

    <section class="card">
      <ComponentFileUpload v-model:file="data.file" :filename="data.file" accepted="image/png, image/jpeg"></ComponentFileUpload>
    </section>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentInput label="Название" v-model="data.name" type="text" k="name"></ComponentInput>

      <ComponentTextarea label="Описание" v-model="data.description" k="description"></ComponentTextarea>

      <ComponentCheckbox label="Опубликовать" v-model="data.published" k="published"></ComponentCheckbox>

      <ComponentDropdown label="Категория" :value="category.categories" v-model="data.category" k="category.name"></ComponentDropdown>
    </section>

    <section class="card" v-for="(c, i) of data.characteristics" :key="i">
      <ComponentDropdown label="Характеристика" :value="characteristic.characteristics" v-model="data.characteristics[i].characteristic" k=""></ComponentDropdown>

      <ComponentDropdown label="Ед. измерения" :value="measure.measures" v-model="data.characteristics[i].measure" k=""></ComponentDropdown>

      <ComponentInput label="Значение" v-model="data.characteristics[i].value" type="text" k=""></ComponentInput>
    </section>

    <button type="button" v-on:click="addCharacteristic()" style="margin: auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Добавить характеристику</span>
    </button>

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
