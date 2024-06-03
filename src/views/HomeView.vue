<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import BubblesAnimation from '@/components/Layout/BubblesAnimation.vue'
import HomepageLinks from '@/data/homepageLinks.js'
</script>

<template>
  <div class="flex flex-col flex-1 md:justify-center gap-5 lg:w-9/12 self-center z-10">
    <div
      class="text-purple-900 lg:text-purple-100 w-fit mx-auto py-10 text-center 
      md:w-3/4 md:text-left md:px-5 md:py-3 md:my-4 md:rounded-lg 
      lg:bg-purple-800 lg:flex lg:flex-row lg:p-0 lg:my-0 lg:overflow-clip"
    >
      <img
        class="rounded-full align-center mx-auto mb-4 shadow-md h-36 lg:rounded-none
        lg:mb-0 lg:flex-0 lg:h-auto lg:w-52 lg:shadow-lg"
        src="https://github.com/andrepg.png"
        alt="My personal profile photo"
      />

      <div class="flex flex-col lg:py-4 lg:px-10 lg:gap-2 lg:justify-center">
        <h1 class="text-2xl lg:text-3xl font-bold">👋 Olá, eu sou André Paul</h1>
        <small class="text-lg leading-none lg:text-lg lg:leading-tight"
          >Posso te ajudar com aplicativos, websites, consultorias e processos.</small
        >
      </div>
    </div>

    <div
      class="flex flex-col md:grid md:grid-cols-2 md:w-3/4 gap-0 mx-auto w-72 md:rounded-lg overflow-clip"
    >
      <PrimaryButton
        v-for="button in HomepageLinks"
        :key="button.target"
        :icon="button.icon"
        :target="button.target"
        >{{ button.label }}</PrimaryButton
      >
    </div>
  </div>

  <BubblesAnimation></BubblesAnimation>
</template>
