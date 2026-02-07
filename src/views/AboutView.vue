<script setup lang="ts">
import SectionWithHeader from '@/components/Layout/SectionWithHeader.vue';
import ProjectsListFeature from '@/views/partials/ProjectsListFeature.vue';
import { Projects } from '@/data/Projects';
import { Icon } from '@iconify/vue';

const projects = Projects;
</script>

<template>
  <SectionWithHeader>
    <h1 class="text-2xl font-semibold flex flex-col md:w-3/4 max-w-[70w]">
      Experiência & Projetos

      <small class="opacity-70 font-normal font-md w-full leading-snug flex-1">
        Minha trajetória e carreira resumida, projetos publicados e
        experiência de mercado real.
      </small>
    </h1>
  </SectionWithHeader>

  <div class="px-4">
    
    <div class="w-full flex flex-col items-start justify-center gap-3">
      <h2 class="text-xl font-semibold flex items-center gap-2 mb-0" id="projetos">
        <Icon icon="hugeicons:computer-video-call" />
        Projetos
      </h2>

      <p class="opacity-70 font-normal font-md w-full leading-snug flex-1 md:max-w-[70ch]">
        A list mais extensa de projetos pode ser encontrada no meu <a href="https://github.com/andrepg" target="_blank" rel="noopener noreferrer" class="link link-primary">GitHub</a>.
        Aqui listo aqueles que considero mais ativos ou relevantes para meu portefólio.
      </p>

      <ProjectsListFeature :projects="projects" />
    </div>


  </div>

</template>
