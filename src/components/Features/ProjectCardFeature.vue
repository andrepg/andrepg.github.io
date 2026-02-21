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
        'bg-neutral/10',
        'relative',
        'flex',
        'flex-col',
        'gap-4',
        'backdrop-blur-lg',
        'p-4',
        'rounded-xl',
        'transition-colors',
        'duration-300',
        'hover:cursor-pointer',
        'hover:bg-primary/20',
    ]">
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
                    'font-normal',
                    'text-start',
                    'font-md',
                    'w-full',
                    'leading-snug',
                    'flex-1',
                ]"
            >{{ project.description }}</p>
    </a>
</template>
