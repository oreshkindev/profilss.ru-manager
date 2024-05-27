import { getToken } from '@/composables';
import { router } from '@/router';
import { state } from '@/stores';
import axios from 'axios';
// import axiosCacheAdapter from "axios-cache-adapter";
const baseURL = import.meta.env.VITE_HTTP + '/v1';

const instance = axios.create({
  baseURL
  //   adapter: axiosCacheAdapter.setupCache({
  //     maxAge: 15 * 60 * 1000, // Cache responses for 15 minutes
  //   }).adapter,
});

// set loading state before each request
instance.interceptors.request.use(
  (config) => {
    revokePending();

    // set token to request header
    config.headers.Authorization = `Bearer ${getToken() || ''}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// set loading state after each response
instance.interceptors.response.use(
  (response) => {
    revokePending();

    return response;
  },
  (error) => {
    revokePending();

    if (error.response.status == 401) {
      localStorage.removeItem('ssoID');

      router.push({ name: 'user' });

      // let token = await refreshToken();
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    return Promise.reject(error);
  }
);

const revokePending = () => {
  if (state.pending) {
    setTimeout(() => (state.pending = false), 1000);
  }
  return (state.pending = true);
};

export { instance as axios };
