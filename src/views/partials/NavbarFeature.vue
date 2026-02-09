<script setup>
import { name, version } from "@/../package.json";

import { Icon } from '@iconify/vue';
import { HomepageMenu } from '@/data/NavigationMenu';
import { onMounted, ref } from 'vue';

const opaqueNavbar = ref(false);

let title = "";

if (window.location.pathname === "/curriculo") {
    title = "Currículo";
}

if (window.location.pathname.includes('blog')) {
    title = "Blog";
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

onMounted(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            opaqueNavbar.value = true;
        } else {
            opaqueNavbar.value = false;
        }
    });
})
</script>

<template>
    <nav :class="[
        'navbar',
        'fixed',
        'top-0',
        'z-50',
        'py-2',
        'px-4',
        'w-full',
        'transition-all',
        'ease-in-out',
        'delay-500',
        'bg-primary/90',
        'dark:bg-neutral-900/90',
        !opaqueNavbar && 'bg-transparent dark:bg-transparent',
    ]">

        <div class="flex-none">
            <div class="drawer">
                <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content">
                    <label for="my-drawer" :class="[
                        'duration-1000 ease',
                        'drawer-button',
                        'btn',
                        'btn-primary',
                        'btn-square',
                        'not-dark:btn-soft',
                        'dark:btn-primary',
                    ]">
                        <Icon icon="mdi:hamburger" class="size-5" />
                    </label>
                </div>

                <div class="drawer-side">
                    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

                    <section class="bg-base-200 min-h-full w-80 p-4">
                        <ul class="menu menu-vertical w-full">
                            <li class="menu-title w-full text-left">Navegação</li>

                            <li v-for="link in HomepageMenu.filter(link => link.menu)" :key="link.name" class="my-2">
                                <a :href="link.path">
                                    <span class="w-full text-left flex items-center gap-2">
                                        <Icon :icon="link.icon" />
                                        {{ link.name }}
                                    </span>
                                </a>
                            </li>
                        </ul>

                        <p class="text-center text-xs opacity-50">versão {{ version }}</p>
                    </section>
                </div>
            </div>
        </div>

        <div class="flex-1 px-4">
            <h1 :class="[
                'w-1/2',
                'm-0',
                'text-xl',
                'font-medium',
                'transition-all',
                'duration-300',
                'delay-200',
                'ease-in-out',
                opaqueNavbar ? 'text-neutral-content' : 'text-primary',
                opaqueNavbar ? 'translate-x-0' : 'translate-x-[90%]'
            ]">{{ title }}</h1>
        </div>

        <div class="flex-none">
            <button title="Voltar ao topo" @click="scrollToTop" :class="[
                'btn',
                'btn-secondary',
                'btn-soft',
                'btn-square',
                'duration-1000 ease transition-all',
                'delay-250',
                opaqueNavbar ? 'opacity-100' : 'opacity-0'
            ]">
                <Icon icon="mdi:arrow-up" class="dark:text-neutral-content text-primary size-5" />
            </button>
        </div>
    </nav>
</template>
