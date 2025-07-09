<template>
  <swiper
    :slides-per-view="1"
    :space-between="0"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    @mouseenter="pauseAutoplay"
    @mouseleave="resumeAutoplay"
    :modules="modules"
    :autoplay="autoplayConfig"
    pagination
    navigation
  >
    <swiper-slide v-for="post in blogPosts" :key="post._id">
      <BlogContent :post="post" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { getPosts } from '@/api'
import BlogContent from './BlogContent.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { ref } from 'vue'
import 'swiper/css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    BlogContent,
  },
  setup() {
    const blogPosts = ref([])
    const swiperInstance = ref(null)

    const onSwiper = (swiper) => {
      console.log(swiper)
      swiperInstance.value = swiper // `ref` kullanarak değeri atıyoruz
    }

    const onSlideChange = () => {
      console.log('slide change')
    }

    const pauseAutoplay = () => {
      if (swiperInstance.value) {
        swiperInstance.value.autoplay.stop()
      }
    }

    const resumeAutoplay = () => {
      if (swiperInstance.value) {
        swiperInstance.value.autoplay.start()
      }
    }

    const fetchPosts = async () => {
      try {
        const response = await getPosts()
        blogPosts.value = response.data
        console.log('Bloglar:', blogPosts.value)
      } catch (error) {
        console.error('Bloglar alınamadı:', error)
      }
    }

    fetchPosts()

    return {
      blogPosts,
      swiperInstance,
      onSwiper,
      onSlideChange,
      pauseAutoplay,
      resumeAutoplay,
      modules: [Autoplay, Pagination, Navigation],
      autoplayConfig: {
        delay: 3000,
        disableOnInteraction: false,
      },
    }
  },
}
</script>
