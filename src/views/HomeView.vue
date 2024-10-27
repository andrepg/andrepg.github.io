<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import BubblesAnimation from '@/components/Layout/BubblesAnimation.vue'
import { HomepageLinks, HomepageProjects } from '@/data/homepageLinks.js'
import FlexGridContainer from '@/components/Layout/FlexGridContainer.vue';

const lastGridItemClass = 'odd:last-of-type:text-center odd:last-of-type:col-span-full';
</script>

<template>
  <div class="flex flex-col py-12 px-4 gap-2 justify-center z-10 max-w-screen-md w-full self-center">
    <div class="flex flex-col md:flex-row items-center justify-center md:gap-5 lg:gap-10">
      <img src="https://github.com/andrepg.png"
        alt="A NFT of a programmer with a cup of coffee in hands and sitting, looking at the camera"
        class="rounded-full self-center outline shadow-md h-36 w-36">

      <h1 class="flex flex-col text-center md:text-left">
        <span class="font-serif">André Paul Grandsire</span>
        <small class="text-lg">Programador & Consultor</small>
      </h1>
    </div>

    <div class="flex flex-col gap-1 py-4">
      <h2 class="font-serif flex flex-row gap-4 md:justify-center">
        <span>📥️</span> Redes & Contatos
      </h2>

      <FlexGridContainer>
        <PrimaryButton :class="lastGridItemClass" v-for="button in HomepageLinks" :key="button.target"
          :icon="button.icon" :target="button.target">
          {{ button.label }}
        </PrimaryButton>
      </FlexGridContainer>
    </div>

    <div class="flex flex-col gap-1 py-4">
      <h2 class="font-serif flex flex-row gap-4 md:justify-center">
        <span>💼</span> Projetos & Trabalhos
      </h2>

      <FlexGridContainer>
        <PrimaryButton :class="lastGridItemClass" v-for="button in HomepageProjects" :key="button.target"
          icon="hugeicons:briefcase-06" :target="button.target">
          {{ button.label }}
        </PrimaryButton>
      </FlexGridContainer>
    </div>
  </div>

  <BubblesAnimation></BubblesAnimation>
</template>
