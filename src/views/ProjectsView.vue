<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { Projects } from '../../data/projects'
import APP_CONFIG from '@config/app'
import { UserConfig } from '../../data/website'

import CardHeaderFeature from '@/components/Features/CardHeaderFeature.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import ProjectCardFeature from '@/components/Features/ProjectCardFeature.vue'
import AnimatedList from '@/components/Shell/AnimatedList.vue'

const projects = Projects

const title = ['Projetos', UserConfig.author.name].join(' | ')
const description = 'Meus projetos publicados mais relevantes.'

const twitterOg = [
  { name: 'twitter:card', content: 'summary' },
  { name: 'twitter:title', content: title },
  { name: 'twitter:description', content: description },
  { name: 'twitter:image', content: UserConfig.website.image }
]

const generalOg = [
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: title },
  { property: 'og:description', content: description },
  { property: 'og:image', content: UserConfig.website.image }
]

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    ...generalOg,
    ...twitterOg
  ],
  link: [{ rel: 'canonical', href: `${APP_CONFIG.BASE_URL}/projetos` }]
})
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
