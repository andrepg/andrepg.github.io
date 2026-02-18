<script setup lang="ts">
import { Projects } from '@data/Projects';
import ProjectsListFeature from './ProjectsListFeature.vue'

const projects = Projects.filter(project => project.recommended);
</script>

<template>
  <div class="card glass bg-neutral/40 backdrop-blur-lg text-neutral">
    <div class="card-body pt-0">
      <ProjectsListFeature :projects="projects" />
      <div class="card-actions">
        <a
          href="/projetos"
          class="btn btn-primary w-full btn-soft my-4"
        >
          Ver todos os projetos
        </a>
      </div>
    </div>

  </div>
</template>
