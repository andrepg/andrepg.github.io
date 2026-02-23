<script setup lang="ts">
import { Projects } from '@data/projects';
import GlassCard from '@/components/GlassCard.vue';
import ProjectCardFeature from '@/components/Features/ProjectCardFeature.vue';
import AnimatedList from '@/components/AnimatedList.vue';
import SectionHeader from '@/components/SectionHeader.vue';

const projects = Projects.filter(project => project.recommended);
</script>

<template>
  <GlassCard class="flex flex-col gap-4">
    <SectionHeader icon="hugeicons:star">
      <template #title>
        Recomendações
      </template>
      <template #subtitle>
        Dentro os meus projetos, estes abaixo são os meus preferidos.
        A lista completa está disponível na página de
        <a href="/projetos" class="link link-primary">projetos</a>.
      </template>
    </SectionHeader>

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
