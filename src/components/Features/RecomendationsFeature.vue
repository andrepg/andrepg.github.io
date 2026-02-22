<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Projects } from '@data/Projects';
import GlassCard from '@/components/GlassCard.vue';
import ProjectCardFeature from '@/components/Features/ProjectCardFeature.vue';
import AnimatedList from '@/components/AnimatedList.vue';

const projects = Projects.filter(project => project.recommended);
</script>

<template>
  <GlassCard class="flex flex-col gap-4 dark:text-neutral">
      <h2
        id="recomendacoes"
        class="text-xl font-semibold flex items-center gap-2 mb-0"
      >
        <Icon icon="hugeicons:star" class="text-2xl" />
        Recomendações
      </h2>

      <p class="opacity-70 font-normal font-md w-full leading-snug">
        Dentro os meus projetos, estes abaixo são os meus preferidos.
        A lista completa está disponível na página de
        <a href="/projetos" class="link link-primary dark:link-neutral">projetos</a>.
      </p>

    <AnimatedList
      :items="projects"
      list-class="columns-1 md:columns-2 gap-4 lg:gap-8"
      item-class="break-inside-avoid-column mb-4 lg:mb-8"
    >
      <template #default="{ item }">
        <ProjectCardFeature :project="item" />
      </template>
    </AnimatedList>

    <div class="card-actions">
      <a href="/projetos" class="btn btn-primary btn-block lg:btn-wide mx-auto btn-soft my-4">
        Ver todos os projetos
      </a>
    </div>
  </GlassCard>
</template>
