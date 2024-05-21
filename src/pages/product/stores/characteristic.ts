import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Characteristic } from '../types';

export const StoreCharacteristic = defineStore('characteristic', () => {
  const characteristic = ref<Characteristic>();

  const characteristics = ref<Characteristic[]>([]);

  const create = (data: Characteristic) => {
    axios
      .post('/product/characteristic', data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'characteristic' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const find = () => {
    axios
      .get('/product/characteristic')
      .then((response) => {
        characteristics.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/product/characteristic/${id}`)
      .then((response) => {
        characteristic.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const remove = (id: any) => {
    axios
      .delete(`/product/characteristic/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'characteristic' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  return { create, find, first, characteristic, characteristics, remove };
});
