<template>
  <ul id="bubbles">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>

<style scoped>
#bubbles {
  @apply absolute bottom-0 left-0 w-full h-full overflow-hidden z-0 m-0 p-0 opacity-30;
}

#bubbles li {
  animation: 20s bubblesUp 0s linear infinite;
  @apply absolute list-none flex w-5 h-5 bg-purple-500 bottom-[-400px] !rounded-full overflow-clip;
}

#bubbles li:nth-child(1) { left: 25%; width: 80px; height: 80px; animation-delay: 0s; }
#bubbles li:nth-child(2) { left: 10%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
#bubbles li:nth-child(3) { left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
#bubbles li:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 18s; }
#bubbles li:nth-child(5) { left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
#bubbles li:nth-child(6) { left: 75%; width: 110px; height: 110px; animation-delay: 3s; }
#bubbles li:nth-child(7) { left: 35%; width: 150px; height: 150px; animation-delay: 7s; }
#bubbles li:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
#bubbles li:nth-child(9) { left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
#bubbles li:nth-child(10) { left: 85%; width: 150px; height: 150px; animation-delay: 0s; animation-duration: 12s; }

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