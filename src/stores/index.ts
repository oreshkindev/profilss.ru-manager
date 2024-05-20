import { axios } from '@/common/axios';
import { setErrors } from '@/composables/errors';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const state = reactive({
  pending: false
});

export const useApp = defineStore('app', () => {
  const subSidebar = ref<boolean>(true);

  const upload = (data: any) => {
    axios
      .post('/doc', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {})
      .catch((error) => setErrors({ error: error }));
  };

  return { subSidebar, upload };
});
