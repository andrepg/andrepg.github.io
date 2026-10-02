<script setup lang="ts">
import { Icon } from '@iconify/vue'

import type { ITechnology } from '@/interfaces'

defineProps<{
  tecnologia: ITechnology
}>()
</script>

<template>
  <span class="badge badge-sm badge-outline badge-neutral gap-1">
    <Icon :icon="tecnologia.icon" class="size-3.5 shrink-0" />

    {{ tecnologia.label }}
  </span>
</template>