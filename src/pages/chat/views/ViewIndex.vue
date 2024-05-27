<script setup lang="ts">
import { StoreChat } from '@/pages/chat/stores';
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import type { Chat } from '../types';

const store = StoreChat();

store.find();

const groupedChats = computed(() => {
  const groups = store.chats.reduce((acc: any, chat: Chat) => {
    // Находим группу по session_id или создаем новую
    let group = acc.find((g: any) => g.session_id === chat.session_id);
    if (!group) {
      group = {
        session_id: chat.session_id,
        messages: []
      };
      acc.push(group);
    }
    // Убираем session_id из сообщения, так как он уже есть в объекте группы
    const { ...messageWithoutSessionId } = chat;
    // Добавляем сообщение в массив messages группы
    group.messages.push(messageWithoutSessionId);
    return acc;
  }, []);

  return groups;
});
</script>

<template>
  <main v-if="$route.path === '/chat'">
    <h1>Заявки с сайта</h1>

    <section class="card">
      <p>
        Здесь размещаются все обращения пользователей и их состояние. Для того чтобы посмотреть заявку, необходимо нажать на <b>адрес эл.почты в заявке</b>, после чего вы попадете
        на страницу обращения. Удалить заявку можно нажав на кнопку <b>«Удалить запись»</b> на странице обращения.
      </p>
    </section>

    <table class="card" v-if="store.chats.length">
      <thead>
        <tr>
          <th>Пользователь</th>
        </tr>
      </thead>

      <tr v-for="item of groupedChats" :key="item.session_id">
        <td>
          <RouterLink :to="{ name: 'chat-view', params: { id: item.session_id } }">
            {{ item.session_id }}
          </RouterLink>
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
