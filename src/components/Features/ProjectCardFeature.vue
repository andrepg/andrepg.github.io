<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { IProject } from '@/interfaces'

defineProps<{
  project: IProject
}>()
</script>

<template>
  <a
    target="blank"
    rel="noopener noreferrer"
    :href="project.target"
    :class="[
      'group/project-item',
      'items-start',
    ]"
  >
    <span class="pt-3">
      <Icon
        :icon="project.icon"
        :class="[
          'text-3xl'
        ]"
      />
    </span>

    <h3 class="flex flex-col m-0">
      {{ project.label }}

      <small class="text-sm font-sans font-light">
        {{ project.description }}
      </small>
    </h3>
  </a>
</template>
