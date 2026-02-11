<script setup>
import { HomepageLinks } from "@data/ProfileIcons";
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="card bg-base-300/85">
    <div class="card-body p-6">
      <div class="flex flex-col items-start md:flex-row gap-5 md:items-center">
        <div class="avatar">
          <div class="size-24 rounded-xl ring-2 ring-neutral-content">
            <img
              src="https://github.com/andrepg.png"
              alt="A NFT of a programmer with a cup of coffee in hands and sitting, looking at the camera"
            >
          </div>
        </div>

        <div class="flex flex-col justify-center">
          <h2 class="mt-0 card-title flex flex-col items-start gap-0">
            <span class="font-serif text-2xl">André Paul Grandsire</span>
            <span class="text-sm font-medium opacity-70">
              Desenvolvedor há mais de 10 anos. Experiência do Open Source ao Enterprise.
            </span>
          </h2>

          <ul class="join join-horizontal justify-start gap-2">
            <li
              v-for="link in HomepageLinks"
              :key="link.label"
            >
              <a
                :href="link.target"
                :target="link.blank"
                :data-tip="link.label"
                class="join-item btn btn-ghost btn-primary btn-sm btn-square tooltip"
                rel="noopener noreferrer"
              >
                <Icon
                  class="text-2xl"
                  :icon="link.icon"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>