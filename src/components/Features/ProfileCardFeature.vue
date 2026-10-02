<script setup>
import { UserConfig } from '@data/website'
import SocialMediaShortcuts from '@/components/SocialMediaShortcuts.vue'
import TechnologyShortcuts from '@/components/TechnologyShortcuts.vue'
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col">
      <h1 class="flex flex-col mt-0 gap-0 leading-tight uppercase text-4xl">
        {{ UserConfig.author.name }}
      </h1>

      <small class="prose max-w-4xl mb-10">{{ UserConfig.author.biography }}</small>

      <div class="flex flex-col">
        <SocialMediaShortcuts />
        <span class="divider" />
        <TechnologyShortcuts />
      </div>
    </div>
  </div>
</template>
