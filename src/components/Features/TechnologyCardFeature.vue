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
      list-class="mx-auto w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl"
    >
      <template #default="{ item }">
        <GlassCard
          tag="div"
          solid
          :data-tip="item.label"
          class="group/tech-item tech-item"
        >
          <Icon
            :icon="item.icon"
            :class="[
              'tech-item-icon',
              'size-13',
              'translate-y-3',
              'opacity-90',
              'group-hover/tech-item:opacity-20',
              'group-hover/tech-item:text-primary-content',
              'group-hover/tech-item:-translate-y-2/3',
              'group-hover/tech-item:translate-x-2/3',
              'group-hover/tech-item:rotate-12',
              'group-hover/tech-item:scale-120',
            ]"
          />

          <span 
          :class="[
            'tech-item-label',
            'translate-y-10',
            'group-hover/tech-item:-translate-y-3',
            'group-hover/tech-item:opacity-100',
            'group-hover/tech-item:block'
          ]">{{ item.label }}</span>
        </GlassCard>
      </template>
    </AnimatedList>

  </GlassCard>
</template>

<style scoped>
@import "@/assets/main.css";

.tech-item {
  @apply tooltip tooltip-primary tooltip-top;
  @apply flex flex-col items-center py-4;
  @apply w-full h-fit py-4 backdrop-blur-lg shadow-none;
  @apply transition-all duration-300;
  @apply hover:cursor-pointer hover:bg-primary/80 hover:shadow-lg;
}

.tech-item-icon {
  @apply duration-500 transition-all will-change-transform;
}

.tech-item-label {
  @apply text-center text-primary-content text-xl;
  @apply duration-500 transition-all transform-gpu will-change-transform;
}
</style>