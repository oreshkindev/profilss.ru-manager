<script setup lang="ts">
import { StoreSupport } from '@/pages/support/stores';
import { nextTick, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const store = StoreSupport();

const messageSound = new Audio('https://oreshkin.dev/notification.mp3');

const baseURL = import.meta.env.VITE_WSS;

const input = ref('');

const container = ref<HTMLElement | null>(null);

store.first(route.params.id as string);

const socket = new WebSocket(`${baseURL}/support/room/${route.params.id}`);

socket.onopen = () => {
  socket.send(
    JSON.stringify({
      session_id: route.params.id
    })
  );
};

socket.onmessage = (event) => {
  const parsedMessage = JSON.parse(event.data);

  if (!Array.isArray(parsedMessage)) {
    store.state.responseList = [...store.state.responseList, parsedMessage];

    messageSound.play();
  }

  scrollToBottom();
};

const scrollToBottom = () => {
  nextTick(() => {
    const element = container.value;
    if (element) {
      element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
    }
  });
};

const sendMessage = () => {
  if (input.value) {
    socket.send(
      JSON.stringify({
        session_id: route.params.id,
        manager_id: 1,
        message: input.value,
        status: true
      })
    );
  }
  input.value = '';
};

store.update(route.params.id as string);

scrollToBottom();
</script>

<template>
  <main>
    <nav>
      <RouterLink :to="{ name: 'support' }" title="Назад" class="button">
        <span>Назад</span>
      </RouterLink>

      <button type="button" v-on:click="store.remove(route.params.id as string)">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
          />
        </svg>

        <span>Удалить комнату</span>
      </button>
    </nav>

    <section class="card">
      <p>
        Обратите внимание на состояние индикатора в правом верхнем углу. Если имеются непрочитанные сообщения в какой-либо комнате, индикатор будет <b>подсвечиваться синим</b>. В
        обычном состоянии индикатор серый. При открытии комнаты состояния сообщений в этой комнате сбрасывается в обычное состояние.
      </p>

      <p>После обработки заявки не забывайте изменить ее состояние.</p>
    </section>

    <section class="card chat" ref="container">
      <p v-for="(el, index) in store.state.responseList" :key="index" :class="[{ manager: el.manager_id === 1 }, 'card']">{{ el.message }}</p>
    </section>

    <input type="text" v-model="input" v-on:keyup.enter="sendMessage()" placeholder="Напишите сообщение" />

    <button type="button" v-on:click="sendMessage()">
      <span>Отправить</span>
    </button>
  </main>
</template>

<style scoped lang="scss">
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

  &.chat {
    display: grid;
    gap: 24px;
    max-height: 400px;
    min-height: 280px;
    overflow: auto;
    scrollbar-width: none;

    p {
      padding: 12px 24px;
      width: fit-content;

      &.manager {
        margin-left: auto;
      }
    }
  }
}

input[type='text'] {
  padding: 12px 24px;
}
</style>
