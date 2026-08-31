<script setup lang="ts">
import { SocialMediaLinks } from "@data/social-media";
import { Icon } from "@iconify/vue";
</script>

<template>
  <ul class="join join-horizontal justify-start gap-0">
    <li
      v-for="link in SocialMediaLinks"
      :key="link.label"
      class="menu"
    >
      <a
        :href="link.target"
        :target="link.blank"
        :data-tip="link.label"
        class="join-item menu-item tooltip"
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
