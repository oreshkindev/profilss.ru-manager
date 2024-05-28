import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { Support } from '../types';

import { router } from '@/router';

export const StoreSupport = defineStore('support', () => {
  const state = reactive({
    responseData: {} as Support,
    responseList: [] as Support[]
  });

  const find = async () => {
    try {
      const { data } = await axios.get<Support[]>('/support');
      state.responseList = data;
    } catch (error) {
      setErrors({ error });
    }
  };

  const first = async (id: string) => {
    try {
      const { data } = await axios.get<Support[]>(`/support/${id}`);
      state.responseList = data;
    } catch (error) {
      setErrors({ error });
    }
  };

  const update = async (id: string) => {
    try {
      await axios.put(`/support/${id}`);
    } catch (error) {
      setErrors({ error });
    } finally {
      find();
    }
  };

  const remove = async (id: string) => {
    try {
      await axios.delete(`/support/${id}`);
      router.push({ name: 'support' });
    } catch (error) {
      setErrors({ error });
    } finally {
      find();
    }
  };

  return { find, first, update, remove, state };
});
