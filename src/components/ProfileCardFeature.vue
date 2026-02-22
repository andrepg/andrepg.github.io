<script setup>
import { UserConfig } from "@data/website";
import GlassCard from "./GlassCard.vue";
import SocialMediaShortcuts from "./SocialMediaShortcuts.vue";
import AsyncImage from "@/components/AsyncImage.vue";
</script>

<template>
  <GlassCard
    tag="section"
    class=""
  >
    <div class="flex flex-col md:flex-row flex-wrap gap-0 md:gap-4">
      <div class="avatar transition-all duration-500 md:self-center">
        <div 
          :class="[
          'min-w-24 max-w-36',
          'min-h-24 max-h-36',
          'aspect-square',
          'rounded-xl',
          'shadow-lg',
          'ring-0',
          'ring-neutral-content',
          'hover:ring-2',
          'transition-all'
        ]">
          <AsyncImage 
            :src="UserConfig.author.avatar" 
            :alt="UserConfig.author.name" />
        </div>
      </div>

      <h1 class="flex flex-col leading-none">
        {{ UserConfig.author.name }}
        <small class="font-normal text-lg">{{ UserConfig.author.role }}</small>
        <SocialMediaShortcuts />
      </h1>

      <p class="leading-tight font-light grow">
        {{ UserConfig.author.biography }}
      </p>
    </div>

  </GlassCard>
</template>