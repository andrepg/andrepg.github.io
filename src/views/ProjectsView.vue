<script setup lang="ts">
import { RoutePath, getRouteSeo } from '@config/routes'
import { usePageHead } from '@/composables/usePageHead'
import { Projects } from '@data/projects'

import CardHeaderFeature from '@/components/Features/CardHeaderFeature.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import ProjectCardFeature from '@/components/Features/ProjectCardFeature.vue'
import AnimatedList from '@/components/Shell/AnimatedList.vue'

const projects = Projects

/** Single source of truth: the same copy is used for SEO and for the subtitle. */
const description = getRouteSeo(RoutePath.PROJECTS).description ?? ''

usePageHead(RoutePath.PROJECTS)
</script>

<template>
  <BaseLayout>
    <template #header>
      <CardHeaderFeature tag="h1">
        <template #default>Projetos</template>
        <template #subtitle>
          {{ description }}
        </template>
      </CardHeaderFeature>
    </template>

    <AnimatedList :items="projects" list-class="list" item-class="break-inside-avoid-column">
      <template #default="{ item }">
        <ProjectCardFeature :project="item" class="list-row" />
      </template>
    </AnimatedList>
  </BaseLayout>
</template>
