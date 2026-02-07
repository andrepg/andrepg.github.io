<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import BubblesAnimation from '@/components/Layout/BubblesAnimation.vue'
import { HomepageLinks, HomepageProjects, AffiliateLinks } from '@/data/homepageLinks.js'
import FlexGridContainer from '@/components/Layout/FlexGridContainer.vue';
import MyProfile from './partials/MyProfile.vue';

const lastGridItemClass = 'odd:last-of-type:text-center odd:last-of-type:col-span-full';
</script>

<template>
  <div class="p-4 z-10">
    <!-- Profile -->
    <MyProfile />

    <!-- Menu -->

    <!-- Content -->

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

    <div class="flex flex-col gap-1 py-4">
      <h2 class="font-serif flex flex-row gap-4 md:justify-center">
        <span>🔗</span> Recomendações e Afiliados
      </h2>

      <FlexGridContainer>
        <PrimaryButton :class="lastGridItemClass" v-for="button in AffiliateLinks" :key="button.target"
          icon="hugeicons:briefcase-06" :target="button.target">
          {{ button.label }}
        </PrimaryButton>
      </FlexGridContainer>
    </div>
  </div>

  <BubblesAnimation></BubblesAnimation>
</template>
