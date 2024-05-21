import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '../types';

export const StoreProduct = defineStore('product', () => {
  const product = ref<Product>();

  const products = ref<Product[]>([]);

  const create = (data: Product) => {
    axios
      .post('/product', data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'product' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const find = () => {
    axios
      .get('/product')
      .then((response) => {
        products.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/product/${id}`)
      .then((response) => {
        product.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const remove = (id: any) => {
    axios
      .delete(`/product/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'product' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const update = (data: Product) => {
    axios
      .put(`/product/${data.id}`, data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'product' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  return { create, find, first, product, products, remove, update };
});
