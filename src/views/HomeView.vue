<script setup>
import PrimaryButton from "@/components/PrimaryButton.vue";
import HomepageLinks from "@/data/homepageLinks.js";
</script>

<template>
  <div class="w-full">
    <div class="text-white w-fit mx-auto py-10 text-center">
      <img
          class="rounded-full align-center mx-auto mb-4 border-pink-900 shadow-lg h-40"
          src="https://github.com/andrepg.png"
          alt="My personal profile photo">

      <h1 class="text-3xl font-bold">André Paul Grandsire</h1>
      <h1 class="text-md">Programador & Consultor</h1>
    </div>

    <div class="flex flex-col md:grid md:grid-cols-2 md:w-2/4 gap-5 md:gap-10 mx-auto w-72">
      <PrimaryButton v-for="button in HomepageLinks"
                     :key="button.target"
                     :icon="button.icon"
                     :target="button.target"
        >{{ button.label }}</PrimaryButton>
    </div>
  </div>
</template>
