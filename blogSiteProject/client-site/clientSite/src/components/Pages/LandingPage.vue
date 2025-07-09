<template>
  <div class="bg-[#F3F4F6] flex flex-col items-center">
    <div class="flex justify-center bg-[#F3F4F6] container">
      <MainHeader></MainHeader>
    </div>
    <div class="flex justify-center bg-[#F3F4F6] container">
      <BlogSwiper></BlogSwiper>
    </div>
    <div class="flex justify-center bg-[#F3F4F6] container">
      <CategoryList></CategoryList>
    </div>
    <div class="flex justify-center bg-[#F3F4F6] container">
      <FooterComponent></FooterComponent>
    </div>
  </div>
</template>

<script>
import BlogSwiper from '../UI/BlogSwiper.vue'
import FooterComponent from '../UI/FooterComponent.vue'
import MainHeader from '../UI/MainHeader.vue'
import CategoryList from '../UI/CategoryList.vue'

export default {
  components: {
    BlogSwiper,
    FooterComponent,
    MainHeader,
    CategoryList,
  },
}
</script>
