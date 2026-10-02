<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import { Icon } from '@iconify/vue'
import { APP_ICONS } from '@config/icons.ts'

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
      <Icon :icon="APP_ICONS.projects.viewMore" />
      {{ seeMoreText }}
    </a>
  </section>
</template>
