<script setup lang="ts">
import { Projects } from '@data/projects'
import ProjectCardFeature from '@/components/ProjectCardFeature.vue'
import AnimatedList from '@/components/AnimatedList.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { Icon } from '@iconify/vue'

const projects = Projects.filter((project) => project.recommended)
</script>

<template>
  <section class="flex flex-col gap-4">
    <SectionHeader>
      <template #title> Recomendações </template>
      <template #subtitle>
        Dentro os meus projetos, estes abaixo são os meus preferidos. A lista completa está
        disponível na página de
        <a href="/projetos" class="link link-primary">projetos</a>.
      </template>
    </SectionHeader>

    <AnimatedList
      :items="projects"
      list-class="columns-1 gap-4"
      item-class="break-inside-avoid-column mb-4"
    >
      <template #default="{ item }">
        <ProjectCardFeature :project="item" />
      </template>
    </AnimatedList>

    <a href="/projetos" class="btn btn-primary btn-block lg:btn-wide mx-auto btn-soft">
      <Icon icon="hugeicons:briefcase-01" />
      Ver todos os projetos
    </a>
  </section>
</template>
