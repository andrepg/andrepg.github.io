<script setup lang="ts">
import { Projects } from '@data/Projects';
import ProjectsListFeature from '@/components/Skills/ProjectsListFeature.vue'

const projects = Projects.filter(project => project.recommended);
</script>

<template>
  <div class="card">
    <div class="card-body px-0">
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
