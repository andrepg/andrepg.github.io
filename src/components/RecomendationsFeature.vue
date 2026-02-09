<script setup lang="ts">
import { Projects } from '@/data/Projects';
import ProjectsListFeature from './ProjectsListFeature.vue'

const projects = Projects.filter(project => project.recommended);
</script>

<template>
  <div class="card bg-base-300/85">
    <div class="card-body pt-0">
      <ProjectsListFeature :projects="projects" />
    </div>
  </div>
</template>
