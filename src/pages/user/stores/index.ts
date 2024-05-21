import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

import { axios } from '@/common/axios';

export const StoreUser = defineStore('user', () => {
  const data = reactive({
    email: '',
    password: ''
  });

  const signin = () => {
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

  return { data, signin, signout };
});
