import { ref } from 'vue';

const errors = ref<any>({});

const setErrors = (error: any) => {
  clearTimeout(setErrors.timer);
  errors.value = error;
  setErrors.timer = setTimeout(() => (errors.value = {}), 3000);
};
setErrors.timer = 0;

export { errors, setErrors };
