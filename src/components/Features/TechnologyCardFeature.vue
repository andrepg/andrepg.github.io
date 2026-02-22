<script setup lang="ts">
import { Icon } from "@iconify/vue";
import GlassCard from "@/components/GlassCard.vue";
import AnimatedList from "@/components/AnimatedList.vue";
import SectionHeader from "@/components/SectionHeader.vue";

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
    <SectionHeader icon="hugeicons:3rd-bracket-square">
      <template #title>
        Tecnologias trabalhadas
      </template>
      <template #subtitle>
        Bibliotecas, ferramentas, linguagens e frameworks com os quais já trabalhei
        <i class="opacity-70">- algumas delas, claro</i>.
      </template>
    </SectionHeader>

    <AnimatedList
      :items="items"
      list-class="mx-auto w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      <template #default="{ item }">
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
      </template>
    </AnimatedList>

  </GlassCard>
</template>
