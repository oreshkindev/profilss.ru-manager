<script setup lang="ts">
import { formatTimestamp } from '@/composables';
import { StoreHr } from '@/pages/hr/stores';
import { RouterLink, RouterView } from 'vue-router';

const store = StoreHr();

store.find();
</script>

<template>
  <main v-if="$route.path === '/hr'">
    <RouterLink :to="{ name: 'hr-create' }" title="Новая запись" class="button">
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Новая запись</span>
    </RouterLink>

    <h1>Вакансии</h1>

    <section class="card">
      <p>
        Здесь размещаются все актуальные вакансии компании и их состояние. Для создания вакансии нажмите кнопку
        <b>«Новая запись»</b> в навигационной панели. Для того чтобы отредактировать вакансию, необходимо нажать на <b>заголовок самой вакансии</b>, после чего вы попадете на
        страницу редактирования. Удалить вакансию можно нажав на кнопку <b>«Удалить запись»</b> на странице редактирования.
      </p>
    </section>

    <table class="card" v-if="store.hrs.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Зарплата</th>
          <th>Опубликован</th>
          <th>Дата публикации</th>
        </tr>
      </thead>

      <tr v-for="item of store.hrs" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          <RouterLink :to="{ name: 'hr-update', params: { id: item.id } }">{{ item.name }}</RouterLink>
        </td>
        <td>{{ item.cost }}</td>
        <td>{{ item.published ? 'Да' : 'Нет' }}</td>
        <td>
          {{ item.created_at ? formatTimestamp(item.created_at) : '' }}
        </td>
      </tr>
    </table>

    <h4 v-else>Список вакансии пуст</h4>
  </main>

  <RouterView></RouterView>
</template>

<style scoped lang="scss">
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
