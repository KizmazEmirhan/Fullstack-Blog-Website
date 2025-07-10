<template>
  <header class="flex container bg-white pt-4">
    <div id="imageWLogo" class="">
      <img :src="logoImage" class="w-1/2" alt="" />
    </div>
    <nav id="nav" class="w-full flex justify-end items-center pr-4 mr-4">
      <ul id="nav-list" class="flex gap-4 text-lg text-[#2c0fae] font-semibold">
        <li class="nav-item"><a href="/newOnes">Yeniler</a></li>
        <li class="nav-item"><a href="/about">Popüler</a></li>
        <li class="nav-item"><a href="/contact">Gündemdekiler</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return { logoImage: new URL('@/assets/blogIstanbulSvg.svg', import.meta.url).href }
  },
}
</script>

<!-- renk kodu = #6528E0 -->
