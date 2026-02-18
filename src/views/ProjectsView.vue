<script setup lang="ts">
import { Projects } from '@data/Projects';
import SectionWithHeader from '@/components/SectionWithHeader.vue';
import BasePageLayout from '@/components/Layout/BasePageLayout.vue';
import { useHead } from '@unhead/vue';
import APP_CONFIG from '@config/app';
import ProjectsListFeature from '@/components/Skills/ProjectsListFeature.vue';

const projects = Projects;


useHead({
  title: "Projetos | André Paul Grandsire",
  meta: [
    { name: 'description', content: 'Lista de projetos e portfólio de André Paul Grandsire' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: "Projetos | André Paul Grandsire" },
    { property: 'og:description', content: 'Lista de projetos e portfólio de André Paul Grandsire' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: "Projetos | André Paul Grandsire" },
    { name: 'twitter:description', content: 'Lista de projetos e portfólio de André Paul Grandsire' },
  ],
  link: [
    { rel: 'canonical', href: `${APP_CONFIG.BASE_URL}/projetos` }
  ],
});

</script>

<template>
  <BasePageLayout>
    <template #header>
      <SectionWithHeader>
        <h1 class="text-2xl font-semibold flex flex-col">
          Projetos
          <small class="opacity-70 font-normal font-md w-full leading-snug flex-1">
            Lista de projetos e portfólio. Aqui listo aqueles que considero mais ativos ou relevantes.
          </small>
        </h1>
      </SectionWithHeader>
    </template>

    <ProjectsListFeature :projects="projects" />
  </BasePageLayout>
</template>

