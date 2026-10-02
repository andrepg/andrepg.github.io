<script setup>
import { UserConfig } from '@data/website'
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col py-52">
      <h1 class="flex flex-col mt-0 gap-0 leading-tight uppercase text-4xl">
        {{ UserConfig.author.name }}
      </h1>

      <p class="prose max-w-4xl">{{ UserConfig.author.biography }}</p>
    </div>
  </div>
</template>
