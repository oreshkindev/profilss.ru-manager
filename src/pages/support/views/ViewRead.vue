<script setup lang="ts">
import { StoreSupport } from '@/pages/support/stores';
import { computed, nextTick, onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const store = StoreSupport();

const messageSound = new Audio('https://oreshkin.dev/notification.mp3');

const data = computed(() => store.support);

const baseURL = import.meta.env.VITE_WSS;

const input = ref('');

const messages = ref<any>();

const container = ref<any>(null);

store.first(route.params.id);

const socket = new WebSocket(`${baseURL}/support/room/${route.params.id}`);

socket.onopen = function () {
  socket.send(
    JSON.stringify({
      session_id: route.params.id
    })
  );
};

socket.onmessage = function (event) {
  const message: any = JSON.parse(event.data);

  if (Array.isArray(message) && message.length > 0) {
    messages.value = message;
  } else {
    messages.value.push(message);

    messageSound.play();
  }

  scrollToBottom();
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

const scrollToBottom = () => {
  nextTick(() => {
    if (container.value) {
      (container.value as HTMLElement).scrollTop = (container.value as HTMLElement).scrollHeight;
    }
  });
};

// Call scrollToBottom when the component is mounted
onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <main v-if="data">
    <nav>
      <RouterLink :to="{ name: 'support' }" title="Назад" class="button">
        <span>Назад</span>
      </RouterLink>
    </nav>

    <section class="card">
      <p>
        Обратите внимание на текущее состояние заявки. Если заявка находится в статусе <b>«Обработана»</b>, кнопка будет неактивна и перевести ее в статус <b>«Новая»</b> не будет
        возможности. Если заявка находится в статусе <b>«Новая»</b>, менеждер может перевести ее в стату <b>«Обработана»</b>.
      </p>

      <p>После обработки заявки не забывайте изменить ее состояние.</p>
    </section>

    <section class="card">
      <div class="chat" ref="container">
        <p :class="[{ manager: message.manager_id === 1 }, 'card']" v-for="(message, index) in messages || data" :key="index">{{ message.message }}</p>
      </div>

      <input type="text" v-model="input" placeholder="Напишите сообщение" />
    </section>

    <button type="button" :disabled="data.status === true" @click="sendMessage()">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z"
        />
        <path
          d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"
        />
      </svg>

      <span>Отправить</span>
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

  .chat {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    max-height: 700px;
    overflow: auto;
    scrollbar-width: none;
    padding-bottom: 70px;
    position: relative;
  }

  input[type='text'] {
    border: 1px solid var(--c-border);
    border-radius: 3px;
    background-color: #ffffff;
    display: block;
    width: 100%;
    padding: 12px 24px;
    margin-top: -50px;
    position: relative;
  }

  p {
    padding: 12px 24px;
    width: fit-content;

    &.manager {
      margin-left: auto;
    }
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
