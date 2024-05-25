import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { SubCategory } from '../types';

export const StoreSubCategory = defineStore('sub_category', () => {
  const sub_category = ref<SubCategory>();

  const sub_categories = ref<SubCategory[]>([]);

  const create = (data: SubCategory) => {
    axios
      .post('/product/sub-category', data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'sub-category' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const find = () => {
    axios
      .get('/product/sub-category')
      .then((response) => {
        sub_categories.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/product/sub-category/${id}`)
      .then((response) => {
        sub_category.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const update = (data: SubCategory) => {
    axios
      .put(`/product/sub-category/${data.id}`, data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'sub-category' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const remove = (id: any) => {
    axios
      .delete(`/product/sub-category/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'sub-category' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  return { create, find, first, sub_category, sub_categories, update, remove };
});
