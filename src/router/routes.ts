const routes = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (Home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/home/views/ViewIndex.vue'),
    meta: {
      layout: 'LayoutAdmin'
    }
  },
  {
    path: '/post',
    name: 'post',
    // route level code-splitting
    // this generates a separate chunk (Home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/post/views/ViewIndex.vue'),
    meta: {
      layout: 'LayoutAdmin'
    },
    children: [
      {
        path: 'create',
        name: 'post-create',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/post/views/ViewCreate.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      },
      {
        path: 'update/:id',
        name: 'post-update',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/post/views/ViewUpdate.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      }
    ]
  },
  {
    path: '/service',
    name: 'service',
    // route level code-splitting
    // this generates a separate chunk (Home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/service/views/ViewIndex.vue'),
    meta: {
      layout: 'LayoutAdmin'
    },
    children: [
      {
        path: 'create',
        name: 'service-create',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/service/views/ViewCreate.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      },
      {
        path: 'update/:id',
        name: 'service-update',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/service/views/ViewUpdate.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      }
    ]
  },
  {
    path: '/user/account',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (User.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/user/views/ViewIndex.vue'),
    meta: {
      layout: 'LayoutBase'
    }
  }
];

export { routes };
