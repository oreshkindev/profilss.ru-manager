import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Category } from '../types';

export const StoreCategory = defineStore('category', () => {
  const category = ref<Category>();

  const categories = ref<Category[]>([]);

  const create = (data: Category) => {
    axios
      .post('/product/category', data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'category' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const find = () => {
    axios
      .get('/product/category')
      .then((response) => {
        categories.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/product/category/${id}`)
      .then((response) => {
        category.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const remove = (id: any) => {
    axios
      .delete(`/product/category/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'category' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  return { create, find, first, category, categories, remove };
});
