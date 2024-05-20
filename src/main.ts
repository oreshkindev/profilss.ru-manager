import './assets/scss/reset.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { router } from './router';

import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$axios = this;

app.use(createPinia());
app.use(router);

app.mount('#app');
