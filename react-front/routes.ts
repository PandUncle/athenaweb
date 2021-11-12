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
        title: '首页',
      },
    ],
  },
];
