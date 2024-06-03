<script setup>
import PrimaryButton from "@/components/PrimaryButton.vue";
import BubblesAnimation from "@/components/Layout/BubblesAnimation.vue";
import HomepageLinks from "@/data/homepageLinks.js";
</script>

<template>
  <div id="container" class="flex flex-col gap-5 lg:w-9/12 self-center z-10">

    <div class="text-purple-900 w-fit mx-auto py-10 text-center 
        md:w-2/4 md:text-left md:px-5 md:py-3 md:my-4 md:rounded-lg md:bg-purple-100 md:outline md:outline-2 md:outline-purple-100 md:shadow-md">
        <img
            class="rounded-full align-center mx-auto mb-4 shadow-lg h-36"
            src="https://github.com/andrepg.png"
            alt="My personal profile photo">
  
        <h1 class="text-2xl font-bold">👋 Olá, eu sou André Paul</h1>
        <small class="text-lg leading-none">Posso te ajudar com aplicativos, websites, consultorias e processos.</small>
    </div>
  
    <div class="flex flex-col md:grid md:grid-cols-2 md:w-2/4 gap-0 mx-auto w-72 md:rounded-lg overflow-clip md:shadow-md">
      <PrimaryButton v-for="button in HomepageLinks"
                      :key="button.target"
                      :icon="button.icon"
                      :target="button.target"
        >{{ button.label }}</PrimaryButton>
    </div>
  </div>

  <BubblesAnimation></BubblesAnimation>
</template>