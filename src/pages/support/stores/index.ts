import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Support } from '../types';

export const StoreSupport = defineStore('support', () => {
  const support = ref<Support>();

  const supports = ref<Support[]>([]);

  const find = () => {
    axios
      .get('/support')
      .then((response) => {
        supports.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/support/${id}`)
      .then((response) => {
        support.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  return { find, first, support, supports };
});
