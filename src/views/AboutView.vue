<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { RoutePath } from '@config/routes'
import { usePageHead } from '@/composables/usePageHead'

import type { IResolvedTimelineItem } from '@/interfaces'
import type { TimelinePosition } from '@/types'

import { getTecnologias, Technologies } from '@data/experience'
import { timeline } from '@data/curriculum'

import BaseLayout from '@/layouts/BaseLayout.vue'
import CardHeaderFeature from '@/components/Features/CardHeaderFeature.vue'
import TechnologyBadge from '@/components/TechnologyBadge.vue'
import TechnologyCardFeature from '@/components/Features/TechnologyCardFeature.vue'
import SectionHeader from '@/components/SectionHeader.vue'

const tecnologias = Technologies

/** Timeline entries reference technologies by id, resolved here for display. */
const timelineComTecnologias: IResolvedTimelineItem[] = timeline.map((item) => ({
  ...item,
  stack: getTecnologias(item.stack)
}))

usePageHead(RoutePath.CURRICULUM)

const calculatePosition = (index: number): TimelinePosition =>
  (index % 2 > 0) ? 'timeline-end' : 'timeline-start'
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
      <li v-for="(item, index) in timelineComTecnologias" :key="item.title">
        <div class="timeline-middle">
          <Icon icon="hugeicons:calendar-02" class="text-lg" />
        </div>

        <div
          :class="[
            'mb-10',
            calculatePosition(index),
            calculatePosition(index) == 'timeline-start' && ' md:text-end',
            calculatePosition(index) === 'timeline-end' && ' md:text-start'
          ]"
        >
          <time class="font-mono text-sm font-bold">{{ item.date }}</time>

          <h3 class="text-lg text-primary leading-snug">
            {{ item.title }}
            <small class="block text-sm font-light font-sans">{{ item.company }}</small>
          </h3>

          <p class="prose leading-tight font-light my-6">{{ item.description }}</p>

          <div
            :class="[
              'flex flex-row flex-wrap gap-2',
              calculatePosition(index) === 'timeline-start' && ' md:justify-end',
              calculatePosition(index) === 'timeline-end' && ' md:justify-start'
            ]"
          >
            <TechnologyBadge
              v-for="tecnologia in item.stack"
              :key="tecnologia.id"
              :tecnologia="tecnologia"
            />
          </div>
        </div>
        <hr />
      </li>
    </ul>
  </BaseLayout>
</template>
