<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { Projects } from '@data/projects';
import APP_CONFIG from '@config/app';
import { UserConfig } from "@data/website";
 
import CardHeaderFeature from '@/components/CardHeaderFeature.vue';
import PageLayout from '@/components/Layout/PageLayout.vue';
import ProjectCardFeature from '@/components/ProjectCardFeature.vue';
import GlassCard from '@/components/GlassCard.vue';
import AnimatedList from '@/components/AnimatedList.vue';

const projects = Projects;


useHead({
  title: "Projetos | André Paul Grandsire",
  meta: [
  { name: 'description', content: 'Lista de projetos e portfólio de André Paul Grandsire' },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: "Projetos | André Paul Grandsire" },
  { property: 'og:description', content: 'Lista de projetos e portfólio de André Paul Grandsire' },
  { property: 'og:image', content: UserConfig.website.image },
  { name: 'twitter:card', content: 'summary' },
  { name: 'twitter:title', content: "Projetos | André Paul Grandsire" },
  { name: 'twitter:description', content: 'Lista de projetos e portfólio de André Paul Grandsire' },
  { name: 'twitter:image', content: UserConfig.website.image },
  ],
  link: [
  { rel: 'canonical', href: `${APP_CONFIG.BASE_URL}/projetos` }
  ],
});

</script>

<template>
  <PageLayout>
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
      <AnimatedList
        :items="projects"
        list-class="mx-auto w-full columns-1 md:columns-2 gap-4"
        item-class="break-inside-avoid-column mb-4"
        :delay="150"
      >
        <template #default="{ item }">
          <ProjectCardFeature :project="item" />
        </template>
      </AnimatedList>



      <p class="text-sm mt-3 mx-auto text-center max-w-prose">
        A lista mais extensa de projetos pode ser encontrada no meu <a
          href="https://github.com/andrepg"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-primary"
        >GitHub</a>.
        Aqui listo aqueles que considero mais ativos ou relevantes para meu portefólio.
      </p>
    </GlassCard>
  </PageLayout>
</template>

