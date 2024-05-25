<script setup lang="ts">
import ComponentCheckbox from '@/components/ComponentCheckbox.vue';
import ComponentDropdown from '@/components/ComponentDropdown.vue';
import ComponentInput from '@/components/ComponentInput.vue';
import { errors, setErrors } from '@/composables/errors';
import { Protector, isNonEmptyString } from '@/composables/validates';
import { StoreCategory } from '@/pages/product/category/stores';
import { StoreProduct } from '@/pages/product/stores';
import { StoreCharacteristic } from '@/pages/product/stores/characteristic';
import type { Product } from '@/pages/product/types';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const store = StoreProduct();

const data = computed(() => store.product);

const category = StoreCategory();
const characteristic = StoreCharacteristic();

category.find();
characteristic.find();

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
    errorMessage: 'Типоразмер должен содержать не менее 5 символов'
  },
  {
    fieldName: 'category.name',
    rule: (value: any) => isNonEmptyString(value),
    errorMessage: 'Категория - это обязательное поле'
  }
);

const prepareSubmit = () => {
  // Synchronous testing
  const errors = protector.validate(data.value);
  if (Object.keys(errors).length !== 0) {
    setErrors(errors);
    return;
  }

  store.update(data.value as Product);
};

store.first(route.params.id);
</script>

<template>
  <main v-if="data">
    <nav>
      <RouterLink :to="{ name: 'product' }" title="Назад" class="button">
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

    <h1>Редактирование {{ data.characteristic.size }}</h1>

    <section class="card">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis vel vero suscipit voluptas nobis! Tempore voluptas eum qui obcaecati blanditiis nemo nostrum, laboriosam
        porro necessitatibus reiciendis officia nam, molestiae aliquid!
      </p>
    </section>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentDropdown label="Категория" :value="category.categories" v-model="data.category" k="category.name"></ComponentDropdown>

      <ComponentCheckbox label="Опубликовать" v-model="data.published" k="published"></ComponentCheckbox>
    </section>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentInput label="Типоразмер" v-model="data.characteristic.size" type="text" k="characteristic.size"></ComponentInput>

      <ComponentInput label="Толщина стенки" v-model="data.characteristic.thickness" type="text" k=""></ComponentInput>

      <ComponentInput label="Вес 1 п/м" v-model="data.characteristic.weight" type="text" k="characteristic.weight"></ComponentInput>

      <ComponentInput label="Цена за 1 п/м c НДС" v-model="data.characteristic.price" type="text" k=""></ComponentInput>

      <ComponentInput label="Цена за 1 тонну с НДС" v-model="data.characteristic.max_price" type="text" k=""></ComponentInput>
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
  position: relative;

  svg {
    cursor: pointer;

    &:hover {
      color: tomato;
    }
  }
}
</style>
