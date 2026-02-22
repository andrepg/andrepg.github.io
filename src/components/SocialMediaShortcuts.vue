<script setup lang="ts">
import { SocialMediaLinks } from "@data/SocialMediaIcons";
import { Icon } from "@iconify/vue";
</script>

<template>
  <ul class="join join-horizontal justify-start gap-0">
    <li
      v-for="link in SocialMediaLinks"
      :key="link.label"
    >
      <a
        :href="link.target"
        :target="link.blank"
        :data-tip="link.label"
        class="join-item btn btn-ghost tooltip"
        rel="noopener noreferrer"
      >
        <Icon
          class="text-2xl"
          :icon="link.icon"
        />
      </a>
    </li>
  </ul>
</template>
