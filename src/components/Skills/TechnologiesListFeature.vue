<script setup lang="ts">
import { Icon } from "@iconify/vue";
import GlassCard from "@/components/GlassCard.vue";

defineProps<{
	items: {
		label: string;
		target: string;
		icon: string;
		recommended: boolean;
	}[];
}>()
</script>

<template>
  <GlassCard class="flex flex-col gap-5 p-6">
    <h2
      id="experiencia"
      class="text-xl font-semibold flex items-center gap-2 mb-0"
    >
      <Icon icon="hugeicons:3rd-bracket-square" />
      Experiência
    </h2>

    <p class="opacity-70 font-normal font-md w-full leading-snug flex-1 md:max-w-[70ch]">
      Tecnologias com as quais eu trabalho ou já trabalhei. Línguas, sistemas, frameworks e bibliotecas.
    </p>

    <TransitionGroup appear tag="ul" class="mx-auto w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" name="fade">
      <li
        v-for="(item, index) in items"
        :key="item.label"
        :style="{ transitionDelay: `${index * 50}ms` }"
      >
        <div
          :data-tip="item.label"
          :class="[
            'group/project-item',
            'flex',
            'flex-col',
            'h-fit',
            'w-full',
            'items-center',
            'py-4',
            'tooltip',
          ]"
        >
          <Icon
            :icon="item.icon"
            :class="[
              'size-16',
              'max-h-12',
              'will-change-transform',
              'transition-all',
              'duration-100',
              'saturate-0',
              'group-hover/project-item:scale-110',
              'group-hover/project-item:saturate-100',
              item.icon.includes('next') && 'opacity-50 group-hover/project-item:opacity-100',
            ]"
          />
        </div>
      </li>
    </TransitionGroup>

  </GlassCard>
</template>
