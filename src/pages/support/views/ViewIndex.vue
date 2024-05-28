<script setup lang="ts">
import { StoreSupport } from '@/pages/support/stores';
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import type { Support } from '../types';

const store = StoreSupport();

store.find();

const groupedSupports = computed(() => {
  const groups = store.state.responseList.reduce((acc: any, support: Support) => {
    // Находим группу по session_id или создаем новую
    let group = acc.find((g: any) => g.session_id === support.session_id);
    if (!group) {
      group = {
        session_id: support.session_id,
        messages: []
      };
      acc.push(group);
    }
    // Убираем session_id из сообщения, так как он уже есть в объекте группы
    const { ...messageWithoutSessionId } = support;
    // Добавляем сообщение в массив messages группы
    group.messages.push(messageWithoutSessionId);
    return acc;
  }, []);

  return groups;
});
</script>

<template>
  <main v-if="$route.path === '/support'">
    <h1>Обращения с сайта</h1>

    <section class="card">
      <p>
        Здесь размещаются все обращения пользователей и их состояние. Для того чтобы перейти в чат, необходимо нажать на <b>идентификатор сессии</b>, после чего вы попадете на
        страницу обращения. Удалить чат можно нажав на кнопку <b>«Удалить чат»</b> на странице обращения.
      </p>
    </section>

    <table class="card" v-if="store.state.responseList.length">
      <thead>
        <tr>
          <th>Пользователь</th>
        </tr>
      </thead>

      <tr v-for="item of groupedSupports" :key="item.session_id">
        <td>
          <RouterLink :to="{ name: 'support-view', params: { id: item.session_id } }">
            {{ item.session_id }}
          </RouterLink>
        </td>
      </tr>
    </table>

    <h4 v-else>Список обращений пуст</h4>
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
