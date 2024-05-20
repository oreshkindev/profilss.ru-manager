<script setup lang="ts">
import { formatTimestamp } from '@/composables';
import { postStore } from '@/pages/post/stores';
import { RouterLink, RouterView } from 'vue-router';

const store = postStore();

store.find();
</script>

<template>
  <main v-if="$route.path === '/post'">
    <RouterLink :to="{ name: 'post-create' }" title="Новая запись" class="button">
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Новая запись</span>
    </RouterLink>

    <h1>Новости</h1>

    <section class="card">
      <p>
        Здесь размещаются все актуальные новости компании и их состояние. Для создания новости нажмите кнопку
        <b>«Новая запись»</b> в навигационной панели. Для того чтобы отредактировать новость, необходимо нажать на <b>заголовок самой новости</b>, после чего вы попадете на
        страницу редактирования. Удалить новость можно нажав на кнопку <b>«Удалить запись»</b> на странице редактирования.
      </p>
    </section>

    <table class="card">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Акция</th>
          <th>Опубликован</th>
          <th>Дата публикации</th>
        </tr>
      </thead>

      <tr v-for="item of store.posts" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          <RouterLink :to="{ name: 'post-update', params: { id: item.id } }">{{ item.name }}</RouterLink>
        </td>
        <td>{{ item.promo ? 'Да' : 'Нет' }}</td>
        <td>{{ item.published ? 'Да' : 'Нет' }}</td>
        <td>
          {{ item.created_at ? formatTimestamp(item.created_at) : '' }}
        </td>
      </tr>
    </table>
  </main>

  <RouterView></RouterView>
</template>

<style scoped lang="scss">
table {
  border-collapse: collapse;

  th {
    color: #707a8a;
    padding: 24px;

    &:first-of-type {
      width: 60px;
    }

    &:last-of-type {
      width: 180px;
    }
  }

  td {
    padding: 12px 24px;

    a {
      color: var(--c-scheme);
    }
  }

  th,
  td {
    font: inherit;
    text-align: left;
  }

  tr {
    &:not(:first-child) {
      &:hover {
        background-color: #f2f4f7;
      }
    }
  }
}

main {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
  gap: 24px;
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
