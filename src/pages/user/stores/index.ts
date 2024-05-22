import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types';

import { axios } from '@/common/axios';

export const StoreUser = defineStore('user', () => {
  const user = ref<User>();

  const users = ref<User[]>([]);

  const create = (data: User) => {
    axios
      .post('/user', data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'user' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const find = () => {
    axios
      .get('/user')
      .then((response) => {
        users.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/user/${id}`)
      .then((response) => {
        user.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const remove = (id: any) => {
    axios
      .delete(`/user/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'user' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const update = (data: User) => {
    axios
      .put(`/user/${data.id}`, data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'user' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const signin = (data: User) => {
    axios
      .post('/user/account', data)
      .then((response) => {
        // get access token from response data
        const { access_token } = response.data;

        // set token to local storage
        localStorage.setItem('ssoID', JSON.stringify(access_token));

        // redirect to dashboard
        router.push({ name: 'home' });
      })
      .catch((error) => setErrors({ error: error }));
  };

  const signout = () => {
    localStorage.removeItem('ssoID');
  };

  return { user, users, create, find, first, remove, update, signin, signout };
});
