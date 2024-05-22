import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Hr } from '../types';

export const StoreHr = defineStore('hr', () => {
  const hr = ref<Hr>();

  const hrs = ref<Hr[]>([]);

  const create = (data: Hr) => {
    axios
      .post('/hr', data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'hr' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const find = () => {
    axios
      .get('/hr')
      .then((response) => {
        hrs.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/hr/${id}`)
      .then((response) => {
        hr.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const remove = (id: any) => {
    axios
      .delete(`/hr/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'hr' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const update = (data: Hr) => {
    axios
      .put(`/hr/${data.id}`, data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'hr' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  return { create, find, first, hr, hrs, remove, update };
});
