<script setup lang="ts">
import { formatTimestamp } from '@/composables';
import { StoreBid } from '@/pages/bid/stores';
import { RouterLink, RouterView } from 'vue-router';

const store = StoreBid();

store.find();
</script>

<template>
  <main v-if="$route.path === '/bid'">
    <h1>Заявки с сайта</h1>

    <section class="card">
      <p>
        Здесь размещаются все обращения пользователей и их состояние. Для того чтобы посмотреть заявку, необходимо нажать на <b>адрес эл.почты в заявке</b>, после чего вы попадете
        на страницу обращения. Удалить заявку можно нажав на кнопку <b>«Удалить запись»</b> на странице обращения.
      </p>
    </section>

    <table class="card" v-if="store.bids.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Адрес эл.почты</th>
          <th>Пользователь</th>
          <th>Телефон</th>
          <th>Статус</th>
          <th>Дата публикации</th>
        </tr>
      </thead>

      <tr v-for="item of store.bids" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          <RouterLink :to="{ name: 'bid-view', params: { id: item.id } }">
            {{ item.email }}
          </RouterLink>
        </td>
        <td>{{ item.fullname }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.status ? 'Обработана' : 'Новая' }}</td>
        <td>
          {{ item.created_at ? formatTimestamp(item.created_at) : '' }}
        </td>
      </tr>
    </table>

    <h4 v-else>Список заявок пуст</h4>
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
}
</style>
