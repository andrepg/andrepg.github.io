<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { RoutePath } from '@config/routes'
import { usePageHead } from '@/composables/usePageHead'
import { getProjects } from '@data/projects'

import CardHeaderFeature from '@/components/Features/CardHeaderFeature.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import ProjectCardFeature from '@/components/Features/ProjectCardFeature.vue'
import AnimatedList from '@/components/Shell/AnimatedList.vue'

const { t } = useI18n()

const projects = getProjects(t)

/** Single source of truth: the same copy is used for SEO and for the subtitle. */
const seo = usePageHead(RoutePath.PROJECTS)
</script>

<template>
  <BaseLayout>
    <template #header>
      <CardHeaderFeature tag="h1">
        <template #default>{{ $t('projects.title') }}</template>
        <template #subtitle>
          {{ seo.description }}
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
