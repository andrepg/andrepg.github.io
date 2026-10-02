<script setup lang="ts">
import { Projects } from '../../../data/projects'
import AnimatedListFeature from '@/components/Features/AnimatedListFeature.vue'
import AnimatedList from '@/components/Shell/AnimatedList.vue'
import ProjectCardFeature from '@/components/Features/ProjectCardFeature.vue'

const projects = Projects.filter((project) => project.highlight)
</script>

<template>
  <AnimatedListFeature
    title="Projetos destacados"
    see-more-target="/projetos"
    see-more-text="Ver todos os projetos"
  >
    <AnimatedList :items="projects" list-class="list" item-class="break-inside-avoid-column">
      <template #default="{ item }">
        <ProjectCardFeature :project="item" class="list-row" />
      </template>
    </AnimatedList>
  </AnimatedListFeature>
</template>
