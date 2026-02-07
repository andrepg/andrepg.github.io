<script setup lang="ts">
import { Projects } from '@/data/Projects';
import { Icon } from '@iconify/vue';
import ProjectsListFeature from './ProjectsListFeature.vue'

const projects = Projects.filter(project => project.recommended);
</script>

<template>
    <div class="card bg-base-300/85">
        <div class="card-body">
            <h2 class="card-title m-0">Projetos Recomendados</h2>

            <ProjectsListFeature :projects="projects" />
        </div>
    </div>
</template>
