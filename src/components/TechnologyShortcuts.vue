<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { getRecommendedTecnologias } from '../../data/experience'

const tecnologias = getRecommendedTecnologias()
</script>

<template>
  <div>
    <span v-if="tecnologias.length" class="uppercase text-xs">Experiência</span>

    <div class="flex flex-row gap-5 items-center flex-wrap">
      <span
        v-for="tecnologia in tecnologias"
        :key="tecnologia.id"
        class="tooltip"
        :data-tip="tecnologia.label"
      >
        <Icon class="text-xl" :icon="tecnologia.icon" />
      </span>

      <button class="btn btn-sm btn-soft">
        <Icon icon="hugeicons:add-01" class="text-base" />
        Ver mais
      </button>
    </div>
  </div>
</template>
