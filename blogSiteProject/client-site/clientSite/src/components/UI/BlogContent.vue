<template>
  <div class="py-10 px-4 bg-white">
    <div class="flex gap-4 items-center mb-6">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-800">
        {{ post.title }}
      </h1>

      <p class="text-sm text-white inline-block text-center bg-indigo-600 rounded-full px-2 py-1">
        {{ category || 'Kategori Yok' }}
      </p>
    </div>
    <div v-if="post" class="mb-8 flex flex-col">
      <div class="inset-0 flex items-center overflow-hidden bg-black">
        <p
          class="animate-marquee text-white text-sm font-bold w-full bg-opacity-50 px-4 py-2 rounded-md"
        >
          Her gün eklenen yeni blogları kaçırma ! &nbsp; &nbsp; • &nbsp; &nbsp; Her gün eklenen yeni
          blogları kaçırma ! &nbsp; &nbsp; • &nbsp; &nbsp; Her gün eklenen yeni blogları kaçırma !
          &nbsp; &nbsp; • &nbsp; &nbsp; Her gün eklenen yeni blogları kaçırma ! &nbsp; &nbsp; •
          &nbsp; &nbsp; Her gün eklenen yeni blogları kaçırma ! &nbsp; &nbsp; • &nbsp; &nbsp; Her
          gün eklenen yeni blogları kaçırma !
        </p>
      </div>
      <img
        :src="post.imageUrl[0]"
        alt="post görseli"
        class="shadow-md w-full object-cover h-[500px]"
      />
      <div class="inset-0 flex items-center overflow-hidden bg-black">
        <p
          class="animate-marquee text-white text-sm font-bold w-full bg-opacity-50 px-4 py-2 rounded-md"
        >
          Her gün eklenen yeni blogları kaçırma ! &nbsp; &nbsp; • &nbsp; &nbsp; Her gün eklenen yeni
          blogları kaçırma ! &nbsp; &nbsp; • &nbsp; &nbsp; Her gün eklenen yeni blogları kaçırma !
          &nbsp; &nbsp; • &nbsp; &nbsp; Her gün eklenen yeni blogları kaçırma ! &nbsp; &nbsp; •
          &nbsp; &nbsp; Her gün eklenen yeni blogları kaçırma ! &nbsp; &nbsp; • &nbsp; &nbsp; Her
          gün eklenen yeni blogları kaçırma !
        </p>
      </div>
    </div>

    <div class="prose max-w-none prose-lg text-gray-700">
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { category: this.post.category.name || 'Kategori Yok' }
  },
}
</script>
<style>
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
<style scoped>
.animate-marquee {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 15s linear infinite;
}
</style>
