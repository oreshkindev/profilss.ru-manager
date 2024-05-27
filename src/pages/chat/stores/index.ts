import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Chat } from '../types';

export const StoreChat = defineStore('chat', () => {
  const chat = ref<Chat>();

  const chats = ref<Chat[]>([]);

  const find = () => {
    axios
      .get('/chat')
      .then((response) => {
        chats.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/chat/${id}`)
      .then((response) => {
        chat.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  return { find, first, chat, chats };
});
