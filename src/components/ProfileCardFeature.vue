<script setup>
import { ref } from "vue";
import { HomepageLinks } from "@data/ProfileIcons";
import { Icon } from "@iconify/vue";
import GlassCard from "./GlassCard.vue";

const isImageLoaded = ref(false);
</script>

<template>
  <GlassCard
    :class="[
      'bg-base-100/30',
      'backdrop-blur-2xl',
      'border',
      'border-white/10',
      'shadow-2xl',
      'transition-all',
      'duration-500',
      'hover:shadow-primary/20',
      'hover:border-white/20'
    ]">

      <div class="flex flex-col items-start md:flex-row gap-5 md:items-center">
        <div class="avatar transition-all duration-500">
          <div 
            :class="[
            'size-24',
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

        <div class="flex flex-col justify-center">
          <h2 class="mt-0 card-title flex flex-col items-start gap-0">
            <span class="font-serif text-2xl">André Paul Grandsire</span>
            <span class="text-sm font-medium opacity-70">
              Desenvolvedor há mais de 10 anos. Experiência do Open Source ao Enterprise.
            </span>
          </h2>

          <ul class="join join-horizontal justify-start gap-2">
            <li
              v-for="link in HomepageLinks"
              :key="link.label"
            >
              <a
                :href="link.target"
                :target="link.blank"
                :data-tip="link.label"
                class="join-item btn btn-ghost btn-primary btn-sm btn-square tooltip"
                rel="noopener noreferrer"
              >
                <Icon
                  class="text-2xl"
                  :icon="link.icon"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
  </GlassCard>
</template>