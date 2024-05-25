<script setup lang="ts">
import ComponentCheckbox from '@/components/ComponentCheckbox.vue';
import ComponentDropdown from '@/components/ComponentDropdown.vue';
import ComponentInput from '@/components/ComponentInput.vue';
import { errors, setErrors } from '@/composables/errors';
import { Protector, isNonEmptyString } from '@/composables/validates';
import { StoreCategory } from '@/pages/product/category/stores';
import type { Category, File, SubCategory } from '@/pages/product/category/types';
import { StoreIso } from '@/pages/product/iso/stores';
import type { Iso } from '@/pages/product/iso/types';
import { StoreProduct } from '@/pages/product/stores';
import { StoreCharacteristic } from '@/pages/product/stores/characteristic';
import type { Characteristic, Product } from '@/pages/product/types';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

const { create } = StoreProduct();

const category = StoreCategory();
const characteristic = StoreCharacteristic();
const iso = StoreIso();

category.find();
characteristic.find();
iso.find();

const data = reactive<Product>({
  category: {
    id: 0,
    file: {
      preview: '',
      video: ''
    } as File,
    sub_category: {
      id: 0,
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
    description: ''
  } as Category,
  characteristic: {
    id: 0,
    max_price: '',
    price: '',
    size: '',
    thickness: '',
    weight: ''
  } as Characteristic,
  published: false
});

// Create an instance of Protector class with rules for the field
const protector = new Protector(
  {
    fieldName: 'characteristic.weight',
    rule: (value: string) => isNonEmptyString(value),
    errorMessage: 'Вес 1 п/м - это обязательное поле'
  },
  {
    fieldName: 'characteristic.size',
    rule: (value: string) => isNonEmptyString(value),
    errorMessage: 'Типоразмер - это обязательное поле'
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

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentDropdown label="Категория" :value="category.categories" v-model="data.category" required="category.name"></ComponentDropdown>

      <ComponentCheckbox label="Опубликовать" v-model="data.published" required="published"></ComponentCheckbox>
    </section>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentInput label="Типоразмер" v-model="data.characteristic.size" type="text" required="characteristic.size"></ComponentInput>

      <ComponentInput label="Толщина стенки" v-model="data.characteristic.thickness" type="text" required=""></ComponentInput>

      <ComponentInput label="Вес 1 п/м" v-model="data.characteristic.weight" type="text" required="characteristic.weight"></ComponentInput>

      <ComponentInput label="Цена за 1 п/м c НДС" v-model="data.characteristic.price" type="text" required=""></ComponentInput>

      <ComponentInput label="Цена за 1 тонну с НДС" v-model="data.characteristic.max_price" type="text" required=""></ComponentInput>
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
.with__control {
  display: grid;
  gap: 0 20px;
  grid-template: auto / 1fr auto;

  :deep(label) {
    grid-column: 1 / -1;
  }

  svg {
    margin: auto;
  }
}

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
