<script setup>
import HomepageLinks from "@/data/homepageLinks";
import { Icon } from "@iconify/vue";
</script>

<template>
    <section class="bg-gray-800/85 p-4 rounded-lg w-fit lg:max-w-1/4">
        <div class="flex flex-row gap-5 py-4 items-center shadow-lg">
            <img src="https://github.com/andrepg.png"
                alt="A NFT of a programmer with a cup of coffee in hands and sitting, looking at the camera"
                class="rounded-xl shadow-gray-900 self-center shadow-lg outline outline-1 outline-gray-700 size-28">

            <div class="flex flex-col">
                <h1 class="flex flex-col text-left mt-0">
                    <span class="font-serif">André Paul Grandsire</span>
                    <small class="text-lg">Programador & Consultor</small>
                </h1>

                <div class="flex flex-row gap-4">
                    <a v-for="link in HomepageLinks"
                    :key="link.label"
                    :href="link.target"
                    :target="link.blank"
                    :title="link.label"
                    rel="noopener noreferrer"
                    class="text-gray-200 hover:text-gray-400 transition-colors duration-200">
                        <Icon class="text-xl" :icon="link.icon" />
                    </a>
                </div>
            </div>
        </div>

        <p>Sou desenvolvedor há mais de 10 anos. Tenho experiência do Open Source ao Enterprise.</p>
        <p>Atuo como consultor e desenvolvedor para empresas de diversos tamanhos.</p>
        <p>Posso te ajudar a organizar sua propriedade digital.</p>
    </section>
</template>