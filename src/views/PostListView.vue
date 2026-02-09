<script lang="ts" setup>
import SectionWithHeader from '@/components/Layout/SectionWithHeader.vue'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PostTimelineFeature from '@/components/Blog/PostTimelineFeature.vue'

import { SitemapBridge } from '@/router/sitemap'

const route = useRoute()
const isLoading = ref(true)
const posts = ref([])
const sitemapBridge = SitemapBridge.getInstance()

const seriesFilter = computed((): string => route.params.series.toString())

const pageTitle = computed(() => {
  if (seriesFilter.value) {
    const seriesName = posts.value[0]?.serie || 'Série'
    return `Série: ${seriesName}`
  }
  return 'Olá! 👋 Bem-vindo ao meu blog!'
})

const fetchPosts = async () => {
  await sitemapBridge.load()
  
  if (seriesFilter.value) {
    posts.value = sitemapBridge.bySeriesSlug(seriesFilter.value)
  } else {
    posts.value = sitemapBridge.published()
  }

  isLoading.value = false
}

onMounted(() => {
  nextTick(() => fetchPosts())
})
</script>

<template>
  <SectionWithHeader>
    <h1 class="text-2xl font-semibold flex flex-col md:w-3/4 max-w-[70w]">
      {{ pageTitle }}

      <small v-if="!seriesFilter" class="opacity-70 font-normal font-md w-full leading-snug flex-1">
        Aqui eu escrevo meus devaneios, registro minhas aventuras de trabalho e compartilho
        experiências da profissão.
      </small>
      <small v-else class="opacity-70 font-normal font-md w-full leading-snug flex-1">
        Listando todos os artigos desta série.
      </small>
    </h1>
  </SectionWithHeader>

  <div v-if="isLoading" class="w-full px-6 max-w-5xl mx-auto py-12 flex flex-col items-center">
    <span class="loading loading-dots"></span>
    <p>Carregando posts...</p>
  </div>

  <ul v-else class="py-4 px-2 md:px-4 lg:w-5/6 mx-auto list">
    <PostTimelineFeature :posts="posts" />
  </ul>
</template>
