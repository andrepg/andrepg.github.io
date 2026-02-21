<script setup lang="ts">
import Transition from "vue"
import GlassCard from './GlassCard.vue';

defineProps({
	tag: {
		type: String,
		default: 'h1'
	},
})
</script>

<template>
<GlassCard class="pt-16! px-5 rounded-t-none pb-5">
  <Transition appear name="fade" >
	<component
		:is="tag"
		:class="[
			'flex',
			'flex-col',
			'gap-1',
			'text-2xl',
			'font-semibold',
			['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag) && 'font-semibold'
		]">



		<slot />

		<small class="opacity-70 font-md w-full leading-snug flex-1 font-normal!">
			<slot name="subtitle" />
		</small>
	</component>
  </Transition>
</GlassCard>
</template>