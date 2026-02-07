<script setup>
import { defineProps } from "vue";
import { Icon } from "@iconify/vue";

const buttonProp = defineProps({
  icon: String,
  btnLabel: String,
  target: String,
})
</script>

<template>
  <a :href="buttonProp.target" target="_blank" rel="nofollow" class="
  flex flex-row py-5 px-6 group gap-3 items-center transition duration-300 group
  bg-gray-800 hover:bg-gray-700">

    <Icon class="text-3xl group-hover:animate-pulse text-gray-200 group-hover:text-gray-100"
      :icon="buttonProp.icon" />

    <span
      class="w-fit text-center text-md text-gray-200 group-hover:text-gray-100 group-hover:scale-105 transition transform-gpu md:group-hover:translate-x-8">
      <slot />
    </span>
  </a>
</template>