<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { RoutePath } from '@config/routes'
import { usePageHead } from '@/composables/usePageHead'

import { Tecnologias } from '../../data/experience'

import BaseLayout from '@/layouts/BaseLayout.vue'
import CardHeaderFeature from '@/components/Features/CardHeaderFeature.vue'
import TechnologyCardFeature from '@/components/Features/TechnologyCardFeature.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { timeline } from '../../data/curriculum.ts'

const tecnologias = Tecnologias

usePageHead(RoutePath.CURRICULUM)
</script>

<template>
  <BaseLayout>
    <template #header>
      <CardHeaderFeature>
        <h1 class="text-2xl font-semibold flex flex-col md:w-3/4">
          Experiência & Tecnologias

          <small class="opacity-70 font-normal font-md w-full leading-snug flex-1">
            Minha trajetória e carreira resumida, projetos publicados e experiência de mercado real.
          </small>
        </h1>
      </CardHeaderFeature>
    </template>

    <TechnologyCardFeature :items="tecnologias" />

    <SectionHeader>
      <template #title>Trajetória</template>
      <template #subtitle>Por onde passei, o que fiz e com o que trabalhei</template>
    </SectionHeader>

    <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      <li v-for="item in timeline" :key="item.title">
        <div class="timeline-middle">
          <Icon icon="hugeicons:calendar-02" class="text-lg" />
        </div>

        <div
          :class="[
            'mb-10',
            item.position,
            item.position === 'timeline-start' && ' md:text-end',
            item.position === 'timeline-end' && ' md:text-start'
          ]"
        >
          <time class="font-mono text-sm font-bold">{{ item.date }}</time>
          <h3 class="text-lg">
            {{ item.title }}
            <small class="block text-sm font-light font-sans">{{ item.company }}</small>
          </h3>

          <p class="font-light">{{ item.description }}</p>

          <div
            :class="[
              'flex flex-row flex-wrap gap-2',
              item.position === 'timeline-start' && ' md:justify-end',
              item.position === 'timeline-end' && ' md:justify-start'
            ]"
          >
            <span v-for="tag in item.tags" :key="tag" class="badge badge-sm badge-neutral">
              {{ tag }}
            </span>
          </div>
        </div>
        <hr />
      </li>
    </ul>
  </BaseLayout>
</template>
