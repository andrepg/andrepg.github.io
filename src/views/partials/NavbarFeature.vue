<template>
    <nav class="navbar z-50 px-4 fixed top-0 w-full">
        <div class="flex-none">
            <div class="drawer">
                <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content">
                    <label for="my-drawer" class="drawer-button btn btn-primary btn-soft btn-square">
                        <Icon icon="mdi:hamburger" class="dark:text-neutral-content size-5" />
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
                    </section>
                </div>
            </div>
        </div>

        <div class="flex-1 px-4">
            <div class="text-xl">{{ title }}</div>
        </div>

        <div class="flex-none">
            <button title="Voltar ao topo" @click="scrollToTop" class="btn btn-secondary btn-soft btn-square">
                <Icon icon="mdi:arrow-up" class="dark:text-neutral-content text-primary size-5" />
            </button>
        </div>
    </nav>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { HomepageMenu } from '@/data/HomepageMenu';

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
</script>