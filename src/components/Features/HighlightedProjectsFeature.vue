<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { getProjects } from '@data/projects'
import AnimatedListFeature from '@/components/Features/AnimatedListFeature.vue'
import AnimatedList from '@/components/Shell/AnimatedList.vue'
import ProjectCardFeature from '@/components/Features/ProjectCardFeature.vue'

const { t } = useI18n()

const projects = getProjects(t).filter((project) => project.highlight)
</script>

<template>
  <AnimatedListFeature
    :title="$t('projects.highlighted.title')"
    see-more-target="/projetos"
    :see-more-text="$t('projects.highlighted.seeMore')"
  >
    <AnimatedList :items="projects" list-class="list" item-class="break-inside-avoid-column">
      <template #default="{ item }">
        <ProjectCardFeature :project="item" class="list-row" />
      </template>
    </AnimatedList>
  </AnimatedListFeature>
</template>
