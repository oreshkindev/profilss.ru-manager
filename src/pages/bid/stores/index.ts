import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Bid } from '../types';

export const StoreBid = defineStore('bid', () => {
  const bid = ref<Bid>();

  const bids = ref<Bid[]>([]);

  const find = () => {
    axios
      .get('/bid')
      .then((response) => {
        bids.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/bid/${id}`)
      .then((response) => {
        bid.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const remove = (id: any) => {
    axios
      .delete(`/bid/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'bid' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const update = (data: Bid) => {
    axios
      .put(`/bid/${data.id}`, data)
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  return { find, first, bid, bids, remove, update };
});
