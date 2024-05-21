import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Measure } from '../types';

export const StoreMeasure = defineStore('measure', () => {
  const measure = ref<Measure>();

  const measures = ref<Measure[]>([]);

  const create = (data: Measure) => {
    axios
      .post('/product/measure', data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'measure' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const find = () => {
    axios
      .get('/product/measure')
      .then((response) => {
        measures.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/product/measure/${id}`)
      .then((response) => {
        measure.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const remove = (id: any) => {
    axios
      .delete(`/product/measure/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'measure' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  return { create, find, first, measure, measures, remove };
});
