<script setup>
import AnalyticsScripts from "@/components/Layout/AnalyticsScripts.vue"
import SocialMediaShortcuts from "@/components/SocialMediaShortcuts.vue"
import { ApplicationRouter } from "@config/routes";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useIntersectionObserver } from "@vueuse/core";
import { UserConfig } from "@data/website";
import AsyncImage from "../AsyncImage.vue";

const showFooter = ref(false);
const footerRef = ref<HTMLElement | null>(null);

const menu = ApplicationRouter.filter(o => o.menu === true);

// Informações de build (em um projeto real poderiam vir de variáveis de ambiente do Vite)
const appVersion = "0.0.2";
const buildDate = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

useIntersectionObserver(
  footerRef,
  (entries) => {
    // if (showFooter.value) return;
    showFooter.value = entries[0].isIntersecting;
  },
  { threshold: 0.1 }
);
</script>

<template>
<footer
  ref="footerRef"
  class="relative mt-20"
>
  <div
    :class="[
      'py-12 px-6 md:px-12 lg:px-24',
      'z-10',
      'transition-all duration-1000',
      'bg-primary text-primary-content',
      'border-t border-primary/10',
    ]">
    <div class="footer sm:footer-horizontal gap-10">
    
    <Transition name="fade">
      <aside v-if="showFooter" class="flex flex-col gap-4">
        <div class="flex items-start gap-4">
          <div class="size-14 rounded-lg shadow overflow-hidden outline-2 mt-1">
            <AsyncImage 
              :src="UserConfig.author.avatar"
              :alt="UserConfig.author.name"
            />
          </div>

          <div class="flex flex-col gap-0">
            <h5 class="text-xl font-light tracking-tight">{{ UserConfig.author.name }}</h5>

            <p class="max-w-xs opacity-70 leading-relaxed text-sm">
              {{ UserConfig.author.shortBiography }}
            </p>
        </div>
      </div>
    </aside>
    </Transition>

    <Transition name="fade">
      <nav v-if="showFooter" style="transition-delay: 250ms">
        <h6 class="footer-title opacity-100 mb-4">Navegação</h6>
        <div class="grid grid-cols-1 gap-2">
          <a
            v-for="link in menu"
            :key="link.path"
            :href="link.path"
            class="link link-hover flex items-center gap-2 transition-colors opacity-80 hover:opacity-100"
          >
            <Icon :icon="link.icon" class="text-xs" />
            {{ link.name }}
          </a>
        </div>
      </nav>
    </Transition>

    <Transition name="fade">
      <nav v-if="showFooter" style="transition-delay: 500ms">
        <h6 class="footer-title opacity-100 mb-4">Conecte-se</h6>
        <SocialMediaShortcuts class="scale-110 origin-left" />
      </nav>
    </Transition>
    </div>

    <Transition name="fade">
      <div v-if="showFooter" class="mt-12 pt-8 border-t border-primary-content/25 flex flex-wrap gap-x-8 gap-y-3 opacity-60 text-xs tracking-wide transition-all duration-1000" style="transition-delay: 750ms">
        <div class="flex items-center gap-2">
          <Icon icon="lucide:git-branch" class="size-3.5" />
          <span>Versão {{ appVersion }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="lucide:calendar" class="size-3.5" />
          <span>Atualizado em {{ buildDate }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="simple-icons:github" class="size-3.5" /> 
          <span>Hospedado no GitHub Pages</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="hugeicons:heart-check" class="size-3.5" /> 
          <span>Feito com VueJS</span>
        </div>
      </div>
    </Transition>
  </div>

  <AnalyticsScripts />
</footer>
</template>

