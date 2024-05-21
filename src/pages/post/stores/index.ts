import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { router } from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Post } from '../types';

export const StorePost = defineStore('post', () => {
  const post = ref<Post>();

  const posts = ref<Post[]>([]);

  const create = (data: Post) => {
    axios
      .post('/post', data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'post' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const find = () => {
    axios
      .get('/post')
      .then((response) => {
        posts.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const first = (id: any) => {
    axios
      .get(`/post/${id}`)
      .then((response) => {
        post.value = response.data;
      })
      .catch((error) => setErrors({ error: error }));
  };

  const remove = (id: any) => {
    axios
      .delete(`/post/${id}`)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'post' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  const update = (data: Post) => {
    axios
      .put(`/post/${data.id}`, data)
      .then(() => {
        // redirect to dashboard
        router.push({ name: 'post' });
      })
      .catch((error) => setErrors({ error: error }))
      .finally(() => {
        find();
      });
  };

  return { create, find, first, post, posts, remove, update };
});
