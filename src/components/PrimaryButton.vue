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
  <a :href="buttonProp.target" target="_blank" rel="nofollow" class="btn btn-neutral btn-soft h-fit">
    <div class="flex flex-row gap-3 items-center w-full my-4">
      <Icon class="text-3xl group-hover:animate-pulse " :icon="buttonProp.icon" />
      <span class="w-fit text-center text-md"><slot /></span>
    </div>
  </a>
</template>