<template>
  <ul
    id="bubbles"
    :class="[
      'fixed',
      'bg-primary/4',
      'w-full',
      'h-full',
      'overflow-clip'
    ]"
  >
    <li
      v-for="bubble in Array.from({ length: 12 })"
      :key="'bubble-' + bubble"
      :class="[
        'absolute',
        'list-none',
        'rounded-full!',
        'will-change-transform',
        'transforom-gpu',
        'bg-primary/5',
        'bottom-0',
        'z-0',
        'm-0',
        'p-0',
      ]"
    />
  </ul>
</template>

<style scoped>
#bubbles li {
  animation: 30s bubblesUp 0s ease-out infinite;
}

#bubbles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

#bubbles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
}

#bubbles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

#bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 6s;
}

#bubbles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 8s;
}

#bubbles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 8s;
}

#bubbles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 6s;
}

#bubbles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 14s;
}

#bubbles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 16s;
}

#bubbles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
}

@keyframes bubblesUp {
  0% {
    transform: translateY(0);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-3000px);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>