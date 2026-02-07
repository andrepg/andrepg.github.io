<script setup>
import HomepageLinks from "@/data/homepageLinks";
import { Icon } from "@iconify/vue";
</script>

<template>
    <div class="card bg-base-300 shadow-xl w-fit lg:max-w-1/4">
        <div class="card-body p-6">
            <div class="flex flex-row gap-5 items-center mb-4">
                <div class="avatar">
                    <div class="size-24 rounded-xl ring-2 ring-neutral-content">
                        <img src="https://github.com/andrepg.png"
                            alt="A NFT of a programmer with a cup of coffee in hands and sitting, looking at the camera" />
                    </div>
                </div>

                <div class="">
                    <h2 class="mt-0 card-title flex flex-col items-start gap-0">
                        <span class="font-serif text-2xl">André Paul Grandsire</span>
                        <span class="text-sm font-medium opacity-70">Programador & Consultor</span>
                    </h2>

                    <div class="join">
                        <a v-for="link in HomepageLinks"
                        :key="link.label"
                        :href="link.target"
                        :target="link.blank"
                        :title="link.label"
                        class="btn btn-ghost btn-primary btn-sm"
                        rel="noopener noreferrer">
                            <Icon class="text-2xl" :icon="link.icon" />
                        </a>
                    </div>
                </div>
            </div>

            <div class="text-sm opacity-90">
                <p>
                    Sou desenvolvedor há mais de 10 anos. Tenho experiência do Open Source ao Enterprise.
                </p>
                <p>
                    Atuo como consultor e desenvolvedor para empresas de diversos tamanhos.
                    Sou especialista em te ajudar a organizar sua propriedade digital.
                </p>
            </div>
        </div>
    </div>
</template>