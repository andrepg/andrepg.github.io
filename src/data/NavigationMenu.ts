export const HomepageMenu = [
  {
    name: 'Homepage',
    menu: true,
    path: '/',
    icon: 'hugeicons:home-01',
    component: () => import('@/views/HomeView.vue')
  },
  {
    name: 'Curriculum',
    menu: true,
    icon: 'hugeicons:profile-02',
    path: '/curriculo',
    component: () => import('@/views/AboutView.vue')
  },
  {
    name: 'Blog',
    menu: true,
    icon: 'hugeicons:quill-write-02',
    path: '/blog',
    component: () => import('@/views/PostListView.vue')
  },
  {
    menu: false,
    name: 'Posts - Series',
    path: '/blog/series/:series',
    component: () => import('@/views/PostListView.vue')
  },
  {
    menu: false,
    name: 'Posts - Single',
    path: '/blog/:year/:article',
    component: () => import('@/views/PostSingleView.vue')
  },
  {
    menu: false,
    name: 'Catch All',
    path: '/:catchAll(.*)',
    component: () => {
      console.log('Redirecting to 404');
      sessionStorage.removeItem('redirect');
      window.location.replace('/404.html');
    }
  }
];
