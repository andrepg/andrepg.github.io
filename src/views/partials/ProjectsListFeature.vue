<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
	projects: {
		label: string;
		target: string;
		icon: string;
		recommended: boolean;
	}[];
}>()
</script>

<template>
	<ul class="w-full grid grid-cols-2 gap-4">
		<li v-for="project in projects" :key="project.label">
			<a class="group/project-item flex flex-col h-fit w-full gap-2 items-center py-4 btn btn-outline btn-primary"
				target="blank"
				rel="noopener noreferrer" :href="project.target">
				<Icon :icon="project.icon" class="size-8 group-hover/project-item:scale-110 transition-transform duration-300" />
				<span>{{ project.label }}</span>
			</a>
		</li>
	</ul>
</template>
