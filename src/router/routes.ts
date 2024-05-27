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
    path: '/bid',
    name: 'bid',
    // route level code-splitting
    // this generates a separate chunk (Home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/bid/views/ViewIndex.vue'),
    meta: {
      layout: 'LayoutAdmin'
    },
    children: [
      {
        path: 'view/:id',
        name: 'bid-view',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/bid/views/ViewRead.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      }
    ]
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
    path: '/setting',
    name: 'setting',
    // route level code-splitting
    // this generates a separate chunk (Home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/setting/views/ViewIndex.vue'),
    meta: {
      layout: 'LayoutAdmin'
    },
    children: [
      {
        path: 'create',
        name: 'setting-create',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/setting/views/ViewCreate.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      },
      {
        path: 'update/:id',
        name: 'setting-update',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/setting/views/ViewUpdate.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    // route level code-splitting
    // this generates a separate chunk (Home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/product/views/ViewIndex.vue'),
    meta: {
      layout: 'LayoutAdmin'
    },
    children: [
      {
        path: 'create',
        name: 'product-create',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/product/views/ViewCreate.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      },
      {
        path: 'update/:id',
        name: 'product-update',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/product/views/ViewUpdate.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      },
      {
        path: '/category',
        name: 'category',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/product/category/views/ViewIndex.vue'),
        meta: {
          layout: 'LayoutAdmin'
        },
        children: [
          {
            path: 'create',
            name: 'category-create',
            // route level code-splitting
            // this generates a separate chunk (Home.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/pages/product/category/views/ViewCreate.vue'),
            meta: {
              layout: 'LayoutAdmin'
            }
          },
          {
            path: 'update/:id',
            name: 'category-update',
            // route level code-splitting
            // this generates a separate chunk (Home.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/pages/product/category/views/ViewUpdate.vue'),
            meta: {
              layout: 'LayoutAdmin'
            }
          },
          {
            path: '/sub-category',
            name: 'sub-category',
            // route level code-splitting
            // this generates a separate chunk (Home.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/pages/product/category/subcategory/views/ViewIndex.vue'),
            meta: {
              layout: 'LayoutAdmin'
            },
            children: [
              {
                path: 'create',
                name: 'sub-category-create',
                // route level code-splitting
                // this generates a separate chunk (Home.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('@/pages/product/category/subcategory/views/ViewCreate.vue'),
                meta: {
                  layout: 'LayoutAdmin'
                }
              },
              {
                path: 'update/:id',
                name: 'sub-category-update',
                // route level code-splitting
                // this generates a separate chunk (Home.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('@/pages/product/category/subcategory/views/ViewUpdate.vue'),
                meta: {
                  layout: 'LayoutAdmin'
                }
              }
            ]
          }
        ]
      },
      {
        path: '/iso',
        name: 'iso',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/product/iso/views/ViewIndex.vue'),
        meta: {
          layout: 'LayoutAdmin'
        },
        children: [
          {
            path: 'create',
            name: 'iso-create',
            // route level code-splitting
            // this generates a separate chunk (Home.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/pages/product/iso/views/ViewCreate.vue'),
            meta: {
              layout: 'LayoutAdmin'
            }
          },
          {
            path: 'update/:id',
            name: 'iso-update',
            // route level code-splitting
            // this generates a separate chunk (Home.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/pages/product/iso/views/ViewUpdate.vue'),
            meta: {
              layout: 'LayoutAdmin'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (Home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/user/views/ViewIndex.vue'),
    meta: {
      layout: 'LayoutAdmin'
    },
    children: [
      {
        path: 'create',
        name: 'user-create',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/user/views/ViewCreate.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      },
      {
        path: 'update/:id',
        name: 'user-update',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/user/views/ViewUpdate.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      },
      {
        path: 'account',
        name: 'user-account',
        // route level code-splitting
        // this generates a separate chunk (User.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/user/views/ViewAccount.vue'),
        meta: {
          layout: 'LayoutBase'
        }
      },
      {
        path: '/hr',
        name: 'hr',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/hr/views/ViewIndex.vue'),
        meta: {
          layout: 'LayoutAdmin'
        },
        children: [
          {
            path: 'create',
            name: 'hr-create',
            // route level code-splitting
            // this generates a separate chunk (Home.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/pages/hr/views/ViewCreate.vue'),
            meta: {
              layout: 'LayoutAdmin'
            }
          },
          {
            path: 'update/:id',
            name: 'hr-update',
            // route level code-splitting
            // this generates a separate chunk (Home.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/pages/hr/views/ViewUpdate.vue'),
            meta: {
              layout: 'LayoutAdmin'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/support',
    name: 'support',
    // route level code-splitting
    // this generates a separate chunk (Home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/support/views/ViewIndex.vue'),
    meta: {
      layout: 'LayoutAdmin'
    },
    children: [
      {
        path: 'view/:id',
        name: 'support-view',
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/support/views/ViewRead.vue'),
        meta: {
          layout: 'LayoutAdmin'
        }
      }
    ]
  }
];

export { routes };
