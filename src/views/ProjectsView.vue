<script setup lang="ts">
import { Projects } from '@data/Projects';
import CardHeaderFeature from '@/components/CardHeaderFeature.vue';
import BasePageLayout from '@/components/Layout/BasePageLayout.vue';
import { useHead } from '@unhead/vue';
import APP_CONFIG from '@config/app';
import ProjectCardFeature from '@/components/Features/ProjectCardFeature.vue';
import GlassCard from '@/components/GlassCard.vue';

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
      <CardHeaderFeature tag="h1">
        <template #default>
          Projetos
        </template>
        <template #subtitle>
          Lista de projetos e portfólio. Aqui listo aqueles que considero mais ativos ou relevantes.
        </template>
      </CardHeaderFeature>
    </template>

    <GlassCard class="px-4 py-8">
      <TransitionGroup appear tag="ul" class="mx-auto w-full columns-1 md:columns-2 gap-4" name="fade">
        <li
          v-for="(project, index) in projects"
          :key="project.label"
          class="break-inside-avoid-column mb-4"
          :style="{ transitionDelay: `${index * 150}ms` }">
          <ProjectCardFeature :project="project" />
        </li>
      </TransitionGroup>



      <p class="text-sm mt-3 mx-auto text-center">
        A lista mais extensa de projetos pode ser encontrada no meu <a
          href="https://github.com/andrepg"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-primary"
        >GitHub</a>.
        Aqui listo aqueles que considero mais ativos ou relevantes para meu portefólio.
      </p>
    </GlassCard>
  </BasePageLayout>
</template>

