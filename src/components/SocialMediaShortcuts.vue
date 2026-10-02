<script setup lang="ts">
import { SocialMediaLinks } from '@data/social-media'
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="flex flex-row gap-5">
    <a
      v-for="link in SocialMediaLinks"
      :key="link.target"
      :href="link.target"
      :data-tip="link.label"
      class="tooltip"
      rel="noreferrer"
    >
      <Icon class="text-2xl" :icon="link.icon" />
    </a>
  </div>
</template>
