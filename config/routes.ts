import { INavigationMenu } from '@/interfaces';

export const ApplicationRouter: INavigationMenu[] = [
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
    name: 'Projetos',
    menu: true,
    icon: 'hugeicons:computer-video-call',
    path: '/projetos',
    component: () => import('@/views/ProjectsView.vue')
  },
  {
    name: 'Blog',
    menu: true,
    icon: 'hugeicons:quill-write-02',
    path: '/blog',
    component: () => import('@/views/BlogListView.vue')
  },
  {
    menu: false,
    name: 'Posts - Single',
    icon: '',
    path: '/blog/:year/:article',
    component: () => import('@/views/BlogArticleView.vue')
  },
];
