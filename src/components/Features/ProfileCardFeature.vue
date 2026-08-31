<script setup>
import { UserConfig } from '@data/website'
import SocialMediaShortcuts from '@/components/SocialMediaShortcuts.vue'
import AsyncImage from '@/components/AsyncImage.vue'
</script>

<template>
  <div class="mockup-code w-full">
    <div class="mx-4 flex flex-row gap-10 lg:px-4">
      <div class="avatar avatar-placeholder size-32 rounded-2xl overflow-clip">
        <AsyncImage :src="UserConfig.author.avatar" :alt="UserConfig.author.name" />
      </div>

      <div class="flex flex-col">
        <h1 class="flex flex-col mt-0 gap-0 leading-tight">
          {{ UserConfig.author.name }}
        </h1>

        <p class="prose">{{ UserConfig.author.biography }}</p>
      </div>
    </div>
  </div>
</template>
