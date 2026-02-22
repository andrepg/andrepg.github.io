<script setup>
import { ref } from "vue";
import GlassCard from "./GlassCard.vue";
import SocialMediaShortcuts from "./SocialMediaShortcuts.vue";

const isImageLoaded = ref(false);
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
          'min-h-24 max-h-36',
          'rounded-xl',
          'shadow-lg',
          'relative',
          'overflow-hidden',
          'ring-0',
          'ring-neutral-content',
          isImageLoaded && 'ring-2',
          !isImageLoaded && 'skeleton',
        ]">
          <div
            v-show="!isImageLoaded"
            class="skeleton absolute inset-0 size-full z-0"
          ></div>
          <img
            src="https://github.com/andrepg.png"
            alt="A NFT of a programmer with a cup of coffee in hands and sitting, looking at the camera"
            class="relative z-10 transition-opacity duration-500"
            :class="isImageLoaded ? 'opacity-100' : 'opacity-0'"
            @load="isImageLoaded = true"
          >
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