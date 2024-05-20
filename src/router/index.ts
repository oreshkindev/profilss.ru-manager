import { tokenIsValid } from '@/composables';
import { createRouter, createWebHistory } from 'vue-router';
import { loadLayoutMiddleware } from './middleware';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Before each route changing the loadLayoutMiddleware middleware is executing.
router.beforeEach(loadLayoutMiddleware);

router.beforeEach((to, from, next) => {
  const isAuthenticated = tokenIsValid();

  if (!isAuthenticated && !(to.path === '/user/account')) {
    next({ path: '/user/account' });
  } else if (isAuthenticated && to.path === '/user/account') {
    next({ path: '/' });
  } else {
    next();
  }
});

export { router };
