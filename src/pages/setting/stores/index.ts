import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Settings } from '../types';

export const StoreSettings = defineStore('setting', () => {
  const setting = ref<Settings>();

  const settings = ref<Settings[]>([]);

  const create = (data: Settings) => {
    axios
      .post('/setting', data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'setting' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const find = () => {
    axios
      .get('/setting')
      .then((response) => {
        settings.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/setting/${id}`)
      .then((response) => {
        setting.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const remove = (id: any) => {
    axios
      .delete(`/setting/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'setting' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const update = (data: Settings) => {
    axios
      .put(`/setting/${data.id}`, data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'setting' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  return { create, find, first, setting, settings, remove, update };
});
