<script setup lang="ts">
import { formatTimestamp } from '@/composables';
import { StoreUser } from '@/pages/user/stores';
import { RouterLink, RouterView } from 'vue-router';

const store = StoreUser();

store.find();
</script>

<template>
  <main v-if="$route.path === '/user'">
    <RouterLink :to="{ name: 'user-create' }" title="Новая запись" class="button">
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Новая запись</span>
    </RouterLink>

    <h1>Пользователи</h1>

    <section class="card">
      <p>
        Здесь размещаются все сотрудники компании которые имеют доступ к панели управления и их состояние. Для создания учетной записи сотрудника нажмите кнопку
        <b>«Новая запись»</b> в навигационной панели. Для того чтобы отредактировать учетную запись, необходимо нажать на <b>заголовок учетной записи</b>, после чего вы попадете на
        страницу редактирования. Удалить учетную запись можно нажав на кнопку <b>«Удалить запись»</b> на странице редактирования.
      </p>
    </section>

    <table class="card" v-if="store.users.length">
      <thead>
        <tr>
          <th>ID</th>

          <th>Эл. почта</th>

          <th>ФИО</th>

          <th>Телефон</th>

          <th>Активность</th>
        </tr>
      </thead>

      <tr v-for="item of store.users" :key="item.id">
        <td>
          <RouterLink :to="{ name: 'user-update', params: { id: item.email } }">
            {{ item.id }}
          </RouterLink>
        </td>

        <td>
          {{ item.email }}
        </td>

        <td>
          {{ item.fullname }}
        </td>

        <td>
          {{ item.phone }}
        </td>

        <td>
          {{ item.updated_at ? formatTimestamp(item.updated_at) : '' }}
        </td>
      </tr>
    </table>

    <h4 v-else>Список пользователей пуст</h4>
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
    max-width: 1280px;
    text-align: justify;
  }

  b {
    font-weight: 600;
  }
}
</style>
