<script setup lang="ts">
import { formatTimestamp } from '@/composables';
import { StoreProduct } from '@/pages/product/stores';
import { computed, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const store = StoreProduct();

const search = ref('');

const products = computed(() =>
  store.products.filter(
    (product: any) => product.characteristic.size.toLowerCase().includes(search.value.toLowerCase()) || product.category.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

store.find();
</script>

<template>
  <main v-if="$route.path === '/product'">
    <nav>
      <RouterLink :to="{ name: 'product-create' }" title="Новая запись" class="button">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
        </svg>

        <span>Новая запись</span>
      </RouterLink>

      <button type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5zM3 12v-2h2v2zm0 1h2v2H4a1 1 0 0 1-1-1zm3 2v-2h3v2zm4 0v-2h3v1a1 1 0 0 1-1 1zm3-3h-3v-2h3zm-7 0v-2h3v2z"
          />
        </svg>

        <span>Сформировать прайс</span>
      </button>
    </nav>

    <h1>Товарные позиции</h1>

    <section class="card">
      <p>
        Здесь размещаются все актуальные товарные позиции компании и их состояние. Для создания товарной позиции нажмите кнопку
        <b>«Новая запись»</b> в навигационной панели. Для того чтобы отредактировать товарную позицию, необходимо нажать на <b>заголовок самой товарной позиции</b>, после чего вы
        попадете на страницу редактирования. Удалить товарную позицию можно нажав на кнопку <b>«Удалить запись»</b> на странице редактирования.
      </p>
    </section>

    <section class="card">
      <input type="text" v-model="search" placeholder="Поиск по товарным позициям и категориям" />
    </section>

    <table class="card" v-if="store.products.length">
      <thead>
        <tr>
          <th>ID</th>

          <th>Типоразмер</th>

          <th>Категория</th>

          <th>Стандарты</th>

          <th>Опубликован</th>

          <th>Дата публикации</th>
        </tr>
      </thead>

      <tr v-for="item of products" :key="item.id">
        <td>{{ item.id }}</td>

        <td>
          <RouterLink :to="{ name: 'product-update', params: { id: item.id } }">
            {{ item.characteristic.size }}
          </RouterLink>
        </td>

        <td>
          {{ item.category.name }}
        </td>

        <td>
          <span v-for="(el, index) in item.isos" :key="el.id"> {{ index < item.isos.length - 1 ? el.name + ', ' : el.name }} </span>
        </td>

        <td>
          {{ item.published ? 'Да' : 'Нет' }}
        </td>

        <td>
          {{ item.created_at ? formatTimestamp(item.created_at) : '' }}
        </td>
      </tr>
    </table>

    <h4 v-else>Список товарных позиции пуст</h4>
  </main>

  <RouterView></RouterView>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: space-between;

  button {
    &:last-of-type {
      background-color: var(--c-border);

      &:hover {
        background-color: var(--c-scheme);
      }
    }
  }
}

input[type='text'] {
  border-radius: 3px;
  border: 1px solid var(--c-border);
  display: block;
  padding: 12px;
  width: 100%;
}

main {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
  gap: 24px;

  h4 {
    padding: 24px;
  }
}

section {
  padding: 24px;

  p {
    max-width: 1080px;
    text-align: justify;
  }

  b {
    font-weight: 600;
  }
}
</style>
