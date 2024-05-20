import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Service } from '../types';

export const StoreService = defineStore('service', () => {
  const service = ref<Service>();

  const services = ref<Service[]>([]);

  const create = (data: Service) => {
    axios
      .post('/service', data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'service' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const find = () => {
    axios
      .get('/service')
      .then((response) => {
        services.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/service/${id}`)
      .then((response) => {
        service.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const remove = (id: any) => {
    axios
      .delete(`/service/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'service' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const update = (data: Service) => {
    axios
      .put(`/service/${data.id}`, data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'service' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  return { create, find, first, service, services, remove, update };
});
