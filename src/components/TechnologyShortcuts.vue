<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { getRecommendedTecnologias } from '@data/experience'
import { RoutePath } from '@config/routes.ts'
import { useLocaleRouting } from '@/composables/useLocaleRouting'

const tecnologias = getRecommendedTecnologias()

const { localize } = useLocaleRouting()
</script>

<template>
  <div>
    <span v-if="tecnologias.length" class="uppercase text-xs">{{ $t('profile.experience') }}</span>

    <div class="flex flex-row gap-5 items-center flex-wrap">
      <span
        v-for="tecnologia in tecnologias"
        :key="tecnologia.id"
        class="tooltip"
        :data-tip="tecnologia.label"
      >
        <Icon class="text-xl" :icon="tecnologia.icon" />
      </span>

      <a class="btn btn-sm btn-soft" :href="localize(RoutePath.CURRICULUM)">
        <Icon icon="hugeicons:add-01" class="text-base" />
        {{ $t('profile.seeMore') }}
      </a>
    </div>
  </div>
</template>
