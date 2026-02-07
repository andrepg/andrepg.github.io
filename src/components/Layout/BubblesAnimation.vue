<template>
  <ul id="bubbles" class="absolute w-full h-full overflow-hidden opacity-30 bottom-0 left-0">
    <li v-for="bubble in Array.from({ length: 12})"
      :key="'bubble-' + bubble"
      class="absolute list-none flex rounded-full! overflow-clip will-change-transform transforom-gpu bg-purple-500 -bottom-1/3 left-0 z-0 m-0 p-0">
    </li>
  </ul>
</template>

<style scoped>
#bubbles li {
  animation: 80s bubblesUp 0s linear infinite;
}

#bubbles li:nth-child(1) { left: 25%; width: 80px; height: 80px; animation-delay: 0s; }
#bubbles li:nth-child(2) { left: 10%; width: 20px; height: 20px; animation-delay: 2s; }
#bubbles li:nth-child(3) { left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
#bubbles li:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 6s; }
#bubbles li:nth-child(5) { left: 65%; width: 20px; height: 20px; animation-delay: 8s; }
#bubbles li:nth-child(6) { left: 75%; width: 110px; height: 110px; animation-delay: 10s; }
#bubbles li:nth-child(7) { left: 35%; width: 150px; height: 150px; animation-delay: 12s; }
#bubbles li:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-delay: 14s; }
#bubbles li:nth-child(9) { left: 20%; width: 15px; height: 15px; animation-delay: 16s; }
#bubbles li:nth-child(10) { left: 85%; width: 150px; height: 150px; animation-delay: 0s; }

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