<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
	projects: {
		label: string;
		target: string;
		description?: string;
		icon: string;
		recommended: boolean;
	}[];
}>()
</script>

<template>
  <div class="flex flex-col gap-5">
    <h2
      id="projetos"
      class="text-xl font-semibold flex items-center gap-2 mb-0"
    >
      <Icon
        icon="hugeicons:computer-video-call"
        class="text-2xl"
      />
      Projetos
    </h2>

    <p class="opacity-70 font-normal font-md w-full leading-snug flex-1 md:max-w-[70ch]">
      A lista mais extensa de projetos pode ser encontrada no meu <a
        href="https://github.com/andrepg"
        target="_blank"
        rel="noopener noreferrer"
        class="link link-primary"
      >GitHub</a>.
      Aqui listo aqueles que considero mais ativos ou relevantes para meu portefólio.
    </p>

    <ul class="mx-auto w-full grid xl:grid-cols-2 gap-4">
      <li
        v-for="project in projects"
        :key="project.label"
      >
        <a
          target="blank"
          rel="noopener noreferrer"
          :href="project.target"
          :class="[
            'group/project-item',
            'flex',
            'flex-col',
            'h-full',
            'w-full',
            'justify-start',
            'btn',
            'btn-soft',
          ]"
        >
          <div
            :class="[
              'flex',
              'flex-col',
              'h-fit',
              'w-full',
              'gap-2',
              'justify-center',
              'md:justify-start',
              'items-start',
              'py-4',
              'px-2',
            ]"
          >
            <div
              :class="[
                'flex',
                'flex-row',
                'items-center',
                'md:justify-start',
                'gap-2',
                'text-lg',
                'pb-3',
                'mb-0',
                'border-b',
                'border-base-content/10',
              ]"
            >
              <Icon
                :icon="project.icon"
                :class="[
                  'text-2xl',
                  'group-hover/project-item:scale-110',
                  'transition-transform',
                  'duration-300',
                ]"
              />

              <span class="font-normal lg:text-start leading-none">{{ project.label }}</span>
            </div>

            <p
              :class="[
                'opacity-70',
                'font-normal',
                'text-start',
                'font-md',
                'w-full',
                'leading-snug',
                'flex-1',
              ]"
            >{{ project.description }}</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
