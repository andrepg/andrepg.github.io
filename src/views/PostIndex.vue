<script lang="ts" setup>
import SectionWithHeader from '@/components/Layout/SectionWithHeader.vue'
import { nextTick, onMounted, ref } from 'vue'
import ListContainer from '@/components/Layout/ListContainer.vue'
import PostListElement from '@/components/PostListElement.vue'

const isLoading = ref(true)

const posts = ref([])

const fetchPosts = () => fetch('/sitemap.json')
  .then(response => processPosts(response))

const processPosts = (response: Response) => response.json()
  .then(sitemap => posts.value = sitemap)
  .then(() => isLoading.value = false)



onMounted(() => {
  console.log('Fetching user posts')
  nextTick(() => fetchPosts())
})
</script>

<template>
  <div class="w-full min-h-screen">
    <SectionWithHeader :showPattern="true">

      <h1 class="text-2xl font-semibold flex flex-col md:w-3/4 max-w-[70w]">
        Olá! 👋 Bem-vindo ao meu blog!

        <small class="text-purple-900 dark:text-gray-400 font-normal font-md w-full leading-snug flex-1">
          Aqui eu escrevo meus devaneios, registro minhas aventuras de trabalho e compartilho
          experiências da profissão.
        </small>
      </h1>
    </SectionWithHeader>

    <ListContainer v-if="isLoading">
      <p>We are loading our posts</p>
    </ListContainer>

    <ListContainer v-else>
      <PostListElement v-for="post in posts"
                       :key="post.path"
                       :post="post" />
    </ListContainer>
  </div>
</template>
