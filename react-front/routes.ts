export default [
  {
    path: '/',
    redirect: '/s/home',
  },
  {
    path: '/s',
    component: '@/layouts',
    routes: [
      {
        path: '/s/home',
        component: '@/pages/home',
      },
      {
        path: '/s/tag',
        component: '@/pages/tag',
      },
      {
        path: '/s/article',
        component: '@/pages/article',
      },
      {
        path: '/s/post',
        component: '@/pages/post',
      },
    ],
  },
];
