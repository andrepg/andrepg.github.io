<script lang="ts" setup>
import SectionWithHeader from '@/components/Layout/SectionWithHeader.vue'
import { nextTick, onMounted, ref } from 'vue'
import ListContainer from '@/components/Layout/ListContainer.vue'
import PostTimelineFeature from '../components/PostTimelineFeature.vue'

import { SitemapBridge } from '@/router/sitemap'

const isLoading = ref(true)
const posts = ref([])
const sitemapBridge = SitemapBridge.getInstance()

const fetchPosts = async () => {
  await sitemapBridge.load()
  posts.value = sitemapBridge.all()
  isLoading.value = false
}

onMounted(() => {
  nextTick(() => fetchPosts())
})
</script>

<template>
  <SectionWithHeader>
    <h1 class="text-2xl font-semibold flex flex-col md:w-3/4 max-w-[70w]">
      Olá! 👋 Bem-vindo ao meu blog!

      <small class="opacity-70 font-normal font-md w-full leading-snug flex-1">
        Aqui eu escrevo meus devaneios, registro minhas aventuras de trabalho e compartilho
        experiências da profissão.
      </small>
    </h1>
  </SectionWithHeader>

  <ListContainer v-if="isLoading">
    <p>We are loading our posts</p>
  </ListContainer>

  <!-- <ListContainer v-else> -->
  <ul v-else class="py-4 px-2 md:px-4 lg:w-5/6 mx-auto list">
    <PostTimelineFeature :posts="posts" />
  </ul>
</template>
