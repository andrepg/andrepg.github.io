<script setup lang="ts">
import SectionWithHeader from '@/components/Layout/SectionWithHeader.vue';
import ProjectsListFeature from '@/components/ProjectsListFeature.vue';
import { Projects } from '@data/Projects';
import { Tecnologias } from '@data/Tecnologias';
import TechnologiesListFeature from '@/components/TechnologiesListFeature.vue';

const projects = Projects;
const tecnologias = Tecnologias;
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

  <div class="flex flex-col gap-10 px-4 w-full max-w-5/6 mx-auto">
    <TechnologiesListFeature :items="tecnologias" />
    <ProjectsListFeature :projects="projects" />
  </div>
</template>
