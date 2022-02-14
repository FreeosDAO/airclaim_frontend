const routes = [
  {
    path: '/',
    component: () => import('layouts/IntroLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/claim', component: () => import('pages/Claim.vue') },
      { path: '/stake', component: () => import('pages/StakeAndUnstake.vue') },
      { path: '/re-register', component: () => import('pages/Re-register.vue') },
      { path: '/transfer', component: () => import('pages/Transfer.vue') }, 
      { path: '/mint', component: () => import('pages/ConvertOptions.vue') },
      { path: '/debug', component: () => import('pages/Debug.vue') },
      { path: '/info', component: () => import('pages/Info.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]


export default routes
