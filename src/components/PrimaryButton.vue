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
  flex flex-row py-5 px-6 group gap-3
  bg-purple-100 hover:bg-purple-800 
        ">

    <Icon class="text-3xl group-hover:animate-pulse text-purple-900 group-hover:text-purple-100"
      :icon="buttonProp.icon" />

    <span class="w-fit text-center text-md text-purple-900 group-hover:text-purple-200">
      <slot />
    </span>
  </a>
</template>