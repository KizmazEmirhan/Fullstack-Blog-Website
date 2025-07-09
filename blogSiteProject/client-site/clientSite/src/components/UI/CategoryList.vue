<template>
  <swiper
    :space-between="10"
    :breakpoints="{
      320: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="cat in categories" :key="cat._id">
      <CategoryCard :category="cat" />
    </swiper-slide>
  </swiper>
</template>

<script>
import CategoryCard from './CategoryCard.vue'

import { getCategories } from '@/api'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
export default {
  name: 'CategoryList',
  components: { CategoryCard, Swiper, SwiperSlide },
  data() {
    return {
      categories: [],
    }
  },
  async mounted() {
    try {
      const res = await getCategories()

      this.categories = res.data
      console.log("res.data=>",this.categories)
    } catch (err) {
      console.error('Veri çekme hatası:', err)
    }
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange,
    }
  },
}
</script>
