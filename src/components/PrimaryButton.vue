<script setup>
import {defineProps} from "vue";
import {Icon} from "@iconify/vue";

const buttonProp = defineProps({
  icon: String,
  btnLabel: String,
  target: String,
})
</script>

<template>
  <a :href="buttonProp.target"
     target="_blank"
     rel="nofollow"
     class="flex flex-row py-3 px-5 shadow-lg 
     outline-purple-300 outline outline-1
     bg-purple-100 text-purple-900 
     gap-3 justify-start
        rounded-sm cursor-pointer group
        transition duration-500 hover:scale-105"
  >

    <Icon class="text-3xl group-hover:animate-pulse"
          :icon="buttonProp.icon"/>

    <span class="w-full text-center text-md">
      <slot/>
    </span>
  </a>
</template>