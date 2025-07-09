<template>
  <div
    class="ai-wrapper relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800"
  >
    <button
      class="absolute left-[1px] top-[1px] h-[calc(100%-2px)] w-[calc(100%-2px)] rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 text-white cursor-pointer z-10"
    >
      Blog Oluştur
    </button>
  </div>
</template>

<script setup>
// script yok ama burada butona tıklanınca işlem yapılabilir
</script>

<style scoped>


.button-wrapper:hover::before {
  animation-play-state: paused;
  background: rgb(128, 0, 255);
  animation: border-ping 2s linear infinite;
}

@keyframes border-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes border-ping {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
