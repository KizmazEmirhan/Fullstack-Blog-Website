<template>
  <div class="bg-white flex container pt-4">
    <div id="brand_name" class="">
      <img :src="logoImage " class="w-1/2" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoImage: new URL('@/assets/BlogIstanbulSvg.svg', import.meta.url).href,
    }
  },
}
</script>
