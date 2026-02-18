<script setup lang="ts">
import SectionWithHeader from '@/components/Layout/SectionWithHeader.vue';
import BasePageLayout from '@/components/Layout/BasePageLayout.vue';

import ProjectsListFeature from '@/components/ProjectsListFeature.vue';
import { Projects } from '@data/Projects';
import { Tecnologias } from '@data/Tecnologias';
import TechnologiesListFeature from '@/components/TechnologiesListFeature.vue';
import { useHead } from '@unhead/vue';
import APP_CONFIG from '@config/app';

const projects = Projects;
const tecnologias = Tecnologias;

useHead({
  title: 'Experiência & Projetos | André Paul Grandsire',
  meta: [
    { name: 'description', content: 'Minha trajetória e carreira resumida, projetos publicados e experiência de mercado real.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Experiência & Projetos | André Paul Grandsire' },
    { property: 'og:description', content: 'Minha trajetória e carreira resumida, projetos publicados e experiência de mercado real.' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Experiência & Projetos | André Paul Grandsire' },
    { name: 'twitter:description', content: 'Minha trajetória e carreira resumida, projetos publicados e experiência de mercado real.' },
  ],
  link: [
    { rel: 'canonical', href: `${APP_CONFIG.BASE_URL}/curriculo` }
  ]
})
</script>


<template>
  <BasePageLayout>
    <template #header>
      <SectionWithHeader>
        <h1 class="text-2xl font-semibold flex flex-col md:w-3/4 max-w-[70w]">
          Experiência & Projetos

          <small class="opacity-70 font-normal font-md w-full leading-snug flex-1">
            Minha trajetória e carreira resumida, projetos publicados e
            experiência de mercado real.
          </small>
        </h1>
      </SectionWithHeader>
    </template>

    <TechnologiesListFeature :items="tecnologias" />
    <ProjectsListFeature :projects="projects" />
  </BasePageLayout>
</template>

