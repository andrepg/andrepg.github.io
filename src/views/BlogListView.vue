<script lang="ts" setup>
import PageLayout from '@/components/Layout/PageLayout.vue';
import { PageLayoutType } from '@/enumerators';


import PostTimelineFeature from '@/components/Blog/PostTimelineFeature.vue';

import { getPublished } from '@/utils/blog-reader';
import { useHead } from '@unhead/vue';
import CardHeaderFeature from '@/components/CardHeaderFeature.vue';
import GlassCard from '@/components/GlassCard.vue';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { getBlogIndexTags } from '@/utils/blog-metadata';
import { useRoute } from 'vue-router';
import { slugify } from '@/utils/slugify';

const route = useRoute();

const posts = getPublished().sort(
  (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
);

const filteredPosts = computed(() => {
  const { series, category, tag } = route.query;

  if (!series && !category && !tag) {
    return posts;
  }

  return posts.filter(post => {
    const matchesSeries = !series || slugify(post.serie || '') === series;
    const matchesCategory = !category || slugify(post.category || '') === category;
    const matchesTag = !tag || (post.tags && post.tags.some(t => slugify(t) === tag));

    return matchesSeries && matchesCategory && matchesTag;
  });
});

const displayMode = ref<'grid' | 'list'>('list');

const toggleDisplayMode = () => {
  displayMode.value = displayMode.value === 'grid' ? 'list' : 'grid';
};

const isCompactMode = computed(() => displayMode.value === 'list');

useHead(getBlogIndexTags(posts));
</script>

<template>
  <PageLayout :type="PageLayoutType.BLOG">
    <template #header>
      <CardHeaderFeature tag="h1">
        <template #default>
          Todas as minhas publicações
        </template>
        <template #subtitle>
          Os registros do meu trabalho, notas relevantes e devaneios sobre a tecnologia.
        </template>
      </CardHeaderFeature>
    </template>

    <GlassCard class="flex flex-col px-5">
      <div class="flex flex-row flex-wrap gap-3 justify-between items-center">
        <button
          class="btn btn-soft btn-primary not-md:btn-block transition-all duration-300 min-w-40"
          @click="toggleDisplayMode"
        >
          <Transition name="fade" mode="out-in">
            <div :key="displayMode" class="flex items-center justify-center gap-2 whitespace-nowrap w-full">
              <Icon
                :icon="isCompactMode ? 'hugeicons:grid-view' : 'hugeicons:list-view'"
                class="text-lg"
              />
              <span>
                {{ isCompactMode ? 'Ver completo' : 'Ver simplificado' }}
              </span>
            </div>
          </Transition>
        </button>
      </div>

      <PostTimelineFeature
        :posts="filteredPosts"
        :is-loading="false"
        :compact-mode="displayMode === 'list'" />
    </GlassCard>
  </PageLayout>
</template>



