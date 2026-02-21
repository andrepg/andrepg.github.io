<script setup lang="ts">
import { Icon } from "@iconify/vue";

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

    <a
        target="blank"
        rel="noopener noreferrer"
        :href="project.target"
        :class="[
        'group/project-item',
        'relative',
        'flex',
        'flex-col',
        'gap-4',
        'p-4',
        'glass',
        'shadow-lg',
        'rounded-xl',
        'transition-all',
        'transform transform-gpu',
        'duration-300',
        'hover:shadow-xl',
        'hover:cursor-pointer',
    ]">
            <div
                :class="[
                    'flex',
                    'flex-row',
                    'items-center',
                    'md:justify-start',
                    'gap-2',
                    'text-lg',
                    'w-full'
            ]">
                <Icon
:icon="project.icon" :class="[
                    'text-2xl',
                    'transition-transform',
                    'duration-300',
                    'group-hover/project-item:scale-110',
                ]" />

                <span class="font-normal lg:text-start leading-none">{{ project.label }}</span>
            </div>

            <p
                :class="[
                    'opacity-70',
                    'text-start',
                    'font-md',
                    'w-full',
                    'leading-snug',
                    'font-light',
                    'flex-1',
                ]"
            >{{ project.description }}</p>
    </a>
</template>
