<script setup>
import AnalyticsScripts from "@/components/AnalyticsScripts.vue"
import SocialMediaShortcuts from "@/components/SocialMediaShortcuts.vue"
import { ApplicationRouter } from "@data/ApplicationRouter";
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const showFooter = ref(false);
const footerRef = ref(null);

const menu = ApplicationRouter.filter(o => o.menu === true);

// Informações de build (em um projeto real poderiam vir de variáveis de ambiente do Vite)
const appVersion = "0.0.2";
const buildDate = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

useIntersectionObserver(
  footerRef,
  ([{ isIntersecting }]) => {
    if (showFooter.value) return;

    showFooter.value = isIntersecting
  },
  { threshold: 0.1 }
)
</script>

<template>
<footer
  ref="footerRef"
  class="relative mt-20"
>
  <div
    :class="[
      'footer sm:footer-horizontal',
      'py-12 px-6 md:px-12 lg:px-24',
      'z-10',
      'transition-all duration-1000',
      'bg-base-300/40 backdrop-blur-2xl',
      'border-t border-primary/10',
      'text-base-content',
      'gap-10',
      showFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
    ]">
    
    <aside class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <div class="size-10 bg-primary rounded-lg flex items-center justify-center text-primary-content font-bold shadow-lg shadow-primary/20">
          AP
        </div>
        <span class="text-xl font-bold tracking-tight">André Paul</span>
      </div>
      <p class="max-w-xs opacity-70 leading-relaxed text-sm">
        Desenvolvedor Full Stack apaixonado por criar soluções elegantes e interfaces que encantam.
      </p>
      
      <div class="flex flex-col gap-1 mt-2 text-[10px] uppercase tracking-widest font-semibold opacity-40">
        <div class="flex items-center gap-2">
          <Icon icon="lucide:git-branch" class="text-primary" />
          <span>Versão {{ appVersion }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="lucide:calendar" class="text-primary" />
          <span>Atualizado em {{ buildDate }}</span>
        </div>
      </div>
    </aside>

    <nav>
      <h6 class="footer-title text-primary opacity-100 mb-4">Navegação</h6>
      <div class="grid grid-cols-1 gap-2">
        <a
          v-for="link in menu"
          :key="link.path"
          :href="link.path"
          class="link link-hover flex items-center gap-2 transition-colors hover:text-primary opacity-80 hover:opacity-100"
        >
          <Icon :icon="link.icon" class="text-xs" />
          {{ link.name }}
        </a>
      </div>
    </nav>

    <nav>
      <h6 class="footer-title text-primary opacity-100 mb-4">Conecte-se</h6>
      <SocialMediaShortcuts class="scale-110 origin-left" />
      <div class="mt-6 flex flex-col gap-2">
        <p class="text-xs opacity-60 flex items-center gap-1">
          <Icon icon="simple-icons:github" /> Hosted on GitHub Pages
        </p>
        <p class="text-xs opacity-60">Made with 🤍 and VueJS</p>
      </div>
    </nav>
  </div>

  <!-- Decorative blur behind footer -->
  <div class="absolute inset-0 -z-10 bg-linear-to-t from-primary/5 to-transparent pointer-events-none"></div>

  <AnalyticsScripts />
</footer>
</template>

