<script setup lang="ts">
import { Icon } from "@iconify/vue";
import GlassCard from "@/components/GlassCard.vue";

defineProps<{
    project: {
        label: string;
        target: string;
        description?: string;
        icon: string;
        recommended: boolean;
    };
}>()
</script>

<template>
  <GlassCard
    tag="a"
    target="blank"
    rel="noopener noreferrer"
    solid
    hoverable
    :href="project.target"
    :class="[
    'group/project-item',
    'relative',
    'flex',
    'flex-col',
    'gap-2',
    'transition-all',
    'transform transform-gpu',
    'duration-300',
  ]">
    <div
      :class="[
        'flex',
        'flex-row',
        'items-center',
        'md:justify-start',
        'gap-2',
        'text-base',
        'w-full'
    ]">
      <Icon
        :icon="project.icon"
        :class="[
        'size-7',
        'transition-transform',
        'duration-300',
        'group-hover/project-item:scale-125',
      ]"/>

      <h3 class="lg:text-start  text-md font-semibold leading-none tracking-tight">{{ project.label }}</h3>
    </div>

    <p
      :class="[
      'text-start',
      'font-md',
      'w-full',
      'leading-snug',
      'flex-1',
      'opacity-80',
      'group-hover/project-item:opacity-100',
    ]"
    >{{ project.description }}</p>
  </GlassCard>
</template>
