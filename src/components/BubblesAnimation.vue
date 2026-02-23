<template>
  <div
    id="liquid-background"
    class="fixed inset-0 pointer-events-none overflow-hidden z-0"
  >
    <div
      v-for="i in 6"
      :key="i"
      :class="['blob', `blob-${i}`]"
    ></div>
  </div>
</template>

<style scoped>
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  will-change: transform;
  animation: move linear infinite;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary, #570df8);
  top: -100px;
  left: -100px;
  animation-duration: 25s;
}

.blob-2 {
  width: 500px;
  height: 500px;
  background: var(--color-secondary, #f000b8);
  top: 40%;
  right: -150px;
  animation-duration: 30s;
  animation-direction: reverse;
}

.blob-3 {
  width: 350px;
  height: 350px;
  background: var(--color-accent, #37cdbe);
  bottom: -50px;
  left: 20%;
  animation-duration: 22s;
}

.blob-4 {
  width: 300px;
  height: 300px;
  background: var(--color-primary, #570df8);
  bottom: 20%;
  right: 15%;
  animation-duration: 28s;
  opacity: 0.3;
}

.blob-5 {
  width: 450px;
  height: 450px;
  background: var(--color-secondary, #f000b8);
  top: 10%;
  left: 30%;
  animation-duration: 35s;
  opacity: 0.2;
}

.blob-6 {
  width: 250px;
  height: 250px;
  background: var(--color-accent, #37cdbe);
  top: 60%;
  left: -50px;
  animation-duration: 20s;
  opacity: 0.3;
}

@keyframes move {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

/* Base DaisyUI color fallbacks if CSS variables aren't injected directly */
:root {
  --color-primary: oklch(var(--p));
  --color-secondary: oklch(var(--s));
  --color-accent: oklch(var(--a));
}
</style>