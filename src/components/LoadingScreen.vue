<script setup lang="ts">
</script>

<template>
  <div 
    class="absolute inset-0 z-100 flex items-center justify-center backdrop-blur-3xl"
  >
    <div class="flex flex-col items-center gap-8">
      <!-- DaisyUI Spinner -->
      <span class="loading loading-spinner loading-lg text-primary scale-125"></span>
      
      <span class="text-xs font-bold uppercase text-base-100 animate-pulse">
        Carregando
      </span>
    </div>
  </div>
</template>
