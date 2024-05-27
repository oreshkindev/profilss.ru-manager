<script setup lang="ts">
import { StoreChat } from '@/pages/chat/stores';
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const store = StoreChat();

const data = computed(() => store.chat);

// interface Message {
//   manager_id?: number;
//   message: string;
//   session_id: string;
//   status: boolean;
// }

const input = ref('');

const messages = ref<any>();

store.first(route.params.id);

const socket = new WebSocket(`wss://api.profilss.com/v1/chat/ws/${route.params.id}`);

socket.onopen = function () {
  socket.send(
    JSON.stringify({
      session_id: route.params.id
    })
  );
};

socket.onmessage = function (event) {
  const message: any = JSON.parse(event.data);

  if (message.length > 0) {
    messages.value = message;
  } else {
    messages.value.push(message);
  }
};

const sendMessage = () => {
  if (input.value) {
    socket.send(
      JSON.stringify({
        session_id: route.params.id,
        manager_id: 1,
        message: input.value
      })
    );
  }
  input.value = '';
};
</script>

<template>
  <main v-if="data">
    <nav>
      <RouterLink :to="{ name: 'chat' }" title="Назад" class="button">
        <span>Назад</span>
      </RouterLink>

      <button type="button">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
          />
        </svg>

        <span>Удалить чат</span>
      </button>
    </nav>

    <section class="card">
      <p>
        Обратите внимание на текущее состояние заявки. Если заявка находится в статусе <b>«Обработана»</b>, кнопка будет неактивна и перевести ее в статус <b>«Новая»</b> не будет
        возможности. Если заявка находится в статусе <b>«Новая»</b>, менеждер может перевести ее в стату <b>«Обработана»</b>.
      </p>

      <p>После обработки заявки не забывайте изменить ее состояние.</p>
    </section>

    <section class="card">
      <p class="card" v-for="(message, index) in messages" :key="index">{{ message.message }}</p>

      <input type="text" v-model="input" placeholder="awfawfaw" />
    </section>

    <button type="button" :disabled="data.status === true" @click="sendMessage()">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"
        />
      </svg>

      <span>Обработана</span>
    </button>
  </main>
</template>

<style scoped lang="scss">
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

  p {
    margin: 10px;
    padding: 12px 24px;
    width: fit-content;
  }

  ul {
    margin-bottom: 12px;
    li {
      display: block;

      a {
        color: var(--c-scheme);

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
