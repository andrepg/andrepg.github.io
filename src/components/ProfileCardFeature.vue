<script setup>
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
          <AsyncImage src="https://github.com/andrepg.png" alt="A NFT of a programmer with a cup of coffee in hands and sitting, looking at the camera" />
        </div>
      </div>

      <h1 class="flex flex-col leading-none">
        André Paul Grandsire
        <small class="font-normal text-lg">Desenvolvedor Full Stack</small>
        <SocialMediaShortcuts />
      </h1>

      <p class="leading-tight font-light grow">
        Programador desde 2014, com experiência em desenvolvimento web, mobile e desktop.
        Auto em OpenSource e Corporativo.
      </p>
    </div>

  </GlassCard>
</template>