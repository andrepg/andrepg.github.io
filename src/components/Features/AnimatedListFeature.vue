<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import { Icon } from '@iconify/vue'

defineProps<{
  title: string
  seeMoreTarget: string
  seeMoreText: string
}>()
</script>

<template>
  <section class="flex flex-col gap-4">
    <SectionHeader>
      <template #title>{{ $props.title }}</template>
    </SectionHeader>

    <section>
      <slot />
    </section>

    <a :href="$props.seeMoreTarget" class="btn btn-primary btn-outline mx-auto">
      <Icon icon="hugeicons:briefcase-01" />
      {{ seeMoreText }}
    </a>
  </section>
</template>
