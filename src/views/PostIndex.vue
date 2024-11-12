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

const formatDate = (date: string) => new Date(Date.parse(date + ' 00:00:00'))
  .toLocaleDateString()

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

        <small class="text-purple-900 font-normal font-md w-full leading-snug flex-1">
          Aqui eu escrevo meus devaneios, registro minhas aventuras de trabalho e compartilho
          experiências da profissão.
        </small>
      </h1>
    </SectionWithHeader>

    <ListContainer v-if="isLoading">
      <p>We are loading our posts</p>
    </ListContainer>

    <ListContainer v-else>
      <PostListElement v-for="post in posts" :key="post.path" :post="post" />
<!--      <a v-for="post in posts" :key="post.path" class="group my-2 flex flex-col gap-0"
         href="/blog/2024/my-custom-article">
        <h2 class="transition leading-tight group-hover:text-purple-800 duration-500 text-gray-700">
          {{ post.title }}
        </h2>

        <small
          class="flex flex-row justify-center gap-2 items-center w-fit font-normal py-1 px-3 bg-purple-50 rounded">
            <span>
              <svg class="size-5" fill="none" stroke="currentColor" stroke-width="1.5"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" stroke-linecap="round"
                      stroke-linejoin="round" />
              </svg>
            </span>

          <span class="text-xs">{{ formatDate(post.published_at) }}</span>
        </small>

        <p class="transition leading-tight group-hover:text-purple-500 duration-500 text-gray-500">
          {{ post.excerpt || '' }}
        </p>
      </a>-->
    </ListContainer>
  </div>
</template>
