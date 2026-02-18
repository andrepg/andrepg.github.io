<script setup lang="ts">
import { Projects } from '@data/Projects';
import ProjectsListFeature from '@/components/ProjectsListFeature.vue'
import BubblesAnimation from '@/components/Layout/BubblesAnimation.vue';
import { useHead } from '@unhead/vue';
import { APP_CONFIG } from '@config/app';

const projects = Projects;

useHead({
  title: "Projetos | André Paul Grandsire",
  meta: [
    { name: 'description', content: 'Lista de projetos e portfólio de André Paul Grandsire' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: `${APP_CONFIG.BASE_URL}/projetos` }
  ],
});
</script>

<template>
  <div
    :class="[
      'flex',
      'flex-col',
      'pt-16',
      'px-5',
      'pb-20',
      'gap-5',
      'z-10',
      'max-w-5xl',
      'mx-auto'
    ]"
  >
    <ProjectsListFeature :projects="projects" />
  </div>

  <BubblesAnimation />
</template>
