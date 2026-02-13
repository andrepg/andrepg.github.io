import { NavigationMenu } from '@/interfaces';

export const HomepageMenu: NavigationMenu[] = [
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
    icon: '',
    component: () => import('@/views/PostListView.vue')
  },
  {
    menu: false,
    name: 'Posts - Single',
    icon: '',
    path: '/blog/:year/:article',
    component: () => import('@/views/PostSingleView.vue')
  },
];
