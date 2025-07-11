<template>
  <div v-if="usersPosts.length === 0">Henüz bir gönderiniz yok</div>

  <swiper
    v-if="usersPosts"
    :space-between="10"
    :breakpoints="{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }"
  >
    <swiper-slide v-for="post in usersPosts" :key="post.title">
      <div id="post_card" class="w-full">
        <div id="card_content" class="flex flex-col items-center bg-white">
          <div>
            <img :src="post.imageUrl" alt="postImage" class="h-64 object-cover" />
          </div>
          <div>
            <h2>{{ post.title }}</h2>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      usersPosts: [
        {
          image: null,
          title: null,
        },
      ],
    }
  },
  mounted() {
    const token = localStorage.getItem('authToken')
    const payload = this.parseJwt(token)
    this.userId = payload ? payload.userId : null
    this.fetchUserPosts()
    this.listenForNewPosts()
    console.log('User Posts =>', this.usersPosts)
  },
  methods: {
    parseJwt(token) {
      try {
        return JSON.parse(atob(token.split('.')[1]))
      } catch (e) {
        console.log(e)
      }
    },

    async fetchUserPosts() {
      const token = localStorage.getItem('authToken')
      console.log("Postcard'dan gelen userId:", this.userId)
      const response = await axios.get('https://blogistanbul-api-production.up.railway.app//api/blogposts/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('response-data=>', response.data)
      this.usersPosts = response.data
    },

    listenForNewPosts() {
      const eventSource = new EventSource('https://blogistanbul-api-production.up.railway.app//api/blogposts/stream')
      eventSource.onmessage = (event) => {
        const newPost = JSON.parse(event.data)
        // Eğer bu kullanıcıya aitse ekle
        if (newPost.createdBy === this.userId) {
          this.usersPosts.unshift(newPost)
        }
      }
    },
  },
}
</script>
