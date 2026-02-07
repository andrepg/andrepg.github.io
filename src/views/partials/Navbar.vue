<template>
    <nav class="navbar z-50">
        <div class="navbar-start">
            <button class="btn btn-primary">Home</button>
        </div>

        <div class="flex-none">
            <button title="Menu" @click="scrollToTop" class="btn btn-neutral btn-square">
                <Icon icon="mdi:hamburger" />
            </button>
        </div>

        <div class="flex-1">
            <div class="text-xl">{{ title }}</div>
        </div>
        
        <div class="flex-none">
            <button title="Voltar ao topo" @click="scrollToTop" class="btn btn-neutral btn-square">
                <Icon icon="mdi:arrow-up" />
            </button>
        </div>
    </nav>
</template>

<script setup>
import { Icon } from '@iconify/vue';

let title = "";

if (window.location.pathname === "/sobre") {
    title = "Sobre";
}

if (window.location.pathname === "/projetos") {
    title = "Projetos";
}

if (window.location.pathname === "/contato") {
    title = "Contato";
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