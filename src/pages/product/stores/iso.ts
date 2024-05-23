import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ISO } from '../types';

export const StoreISO = defineStore('iso', () => {
  const iso = ref<ISO>();

  const isos = ref<ISO[]>([]);

  const create = (data: ISO) => {
    axios
      .post('/product/iso', data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'iso' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const find = () => {
    axios
      .get('/product/iso')
      .then((response) => {
        isos.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/product/iso/${id}`)
      .then((response) => {
        iso.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const remove = (id: any) => {
    axios
      .delete(`/product/iso/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'iso' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  return { create, find, first, iso, isos, remove };
});
