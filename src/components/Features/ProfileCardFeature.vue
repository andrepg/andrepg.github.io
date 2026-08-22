<script setup>
import { UserConfig } from '@data/website'

import GlassCard from '@/components/GlassCard.vue'
import SocialMediaShortcuts from '@/components/SocialMediaShortcuts.vue'
import AsyncImage from '@/components/AsyncImage.vue'
</script>

<template>
  <div class="mockup-code bg-primary text-primary-content w-full">
    <div class="mx-4 flex flex-row gap-5">
      <div class="avatar avatar-placeholder ring-primary ring-2 size-24 rounded-2xl overflow-clip">
        <div class="bg-primary text-primary-content text-2xl font-light absolute">AP</div>
        <AsyncImage :src="UserConfig.author.avatar" :alt="UserConfig.author.name" />
      </div>

      <div class="flex flex-col">
        <h1 class="flex flex-col mt-0 gap-0 leading-tight">
          {{ UserConfig.author.name }}
          <small class="font-sans font-extralight text-lg">{{ UserConfig.author.role }}</small>
        </h1>

        <p class="prose">{{ UserConfig.author.biography }}</p>
      </div>
    </div>

    <div class="mx-4 pt-4">
      <SocialMediaShortcuts />
    </div>
  </div>
</template>
