<template>
  <section
    :class="[
      'relative',
      'py-16',
      'flex',
      'flex-col',
      'justify-center',
      'items-start',
      'px-2',
      'sm:px-10',
      'w-full', 
      $attrs.class
    ]"
  >
    <slot />
  </section>
</template>