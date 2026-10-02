<!--
  Shell for regular content pages: blog index, blog articles and any other
  page built around a `header`, a content body and an optional `footer`.

  The body is wrapped so pages can rely on `h-fit` + bottom padding without
  repeating those classes on every view.
-->
<script setup lang="ts">
import BaseLayout from './BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <template #header>
      <slot name="header" />
    </template>

    <div class="flex flex-col w-full gap-10 h-fit pb-20">
      <slot />
    </div>

    <template #footer>
      <slot name="footer" />
    </template>
  </BaseLayout>
</template>
