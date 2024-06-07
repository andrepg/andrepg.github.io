<template>
  <article class="w-full min-h-screen">
    <div id="pattern" class="mt-3 py-12
          flex flex-col justify-center items-start px-2 sm:px-10
          text-purple-900">
      <h1 class="text-2xl font-semibold flex flex-col md:w-3/4 max-w-[70w]">
        Slug:  {{ year }} - {{ article }}

        <small class="text-purple-700 font-normal font-md w-full leading-snug flex-1">
          <!-- Aqui eu escrevo meus devaneios, registro minhas aventuras de trabalho e compartilho experiências da profissão. -->
        </small>
      </h1>
    </div>

    <!-- <section :html="singleArticle.html" /> -->
  </article>
</template>

<script setup>
import { useRoute } from 'vue-router';

const { year, article } = useRoute().params;

// import(`@blog/${year}/${article}.md`)
// metadata.title = markdown.attributes.titulo;
// metadata.categories = markdown.attributes.categorias;
// metadata.tags = markdown.attributes.tags;
// metadata.serie = markdown.attributes.serie;
// metadata.content = markdown.html;

</script>
