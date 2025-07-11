<template>
  <div class="container justify-around flex flex-col lg:flex-row gap-8 bg-white p-4 w-full h-full">
    <form action="" class="flex flex-col gap-4 w-full h-full">
      <div class="flex gap-4 flex-col md:flex-row h-full">
        <div class="flex flex-col gap-4 w-full h-full" id="form_wrapper">
          <div
            id="image-upload"
            class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 hover:border-[#6528E0] transition duration-200"
          >
            <label
              for="images"
              class="cursor-pointer flex flex-col items-center gap-2 text-[#6528E0] hover:text-[#6528E0] transition duration-200"
            >
              <i class="bi bi-plus-square text-3xl"></i>
              <span class="text-sm font-medium">Görseller Yükle</span>
            </label>
            <!-- Çoklu dosya seçme özelliği -->
            <input
              type="file"
              id="images"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload"
              multiple
            />

            <!-- Önizleme -->
            <div v-if="waitingDatas.images.length" class="mt-4 grid grid-cols-3 gap-2">
              <div v-for="image in waitingDatas.images" :key="image.id" class="relative group">
                <img :src="image.src" :alt="image.name" class="w-32 h-32 object-cover rounded-md" />
                <!-- Silme butonu -->
                <button
                  @click="removeImage(image.id)"
                  class="cursor-pointer absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          </div>
          <div
            id="title"
            class="flex items-center justify-between border-2 border-gray-300 hover:border-[#6528E0] transition duration-200"
          >
            <label class="p-2 text-sm text-center" for="title">Başlık</label>
            <input
              v-model="waitingDatas.title"
              type="text"
              id="title"
              class="p-2 w-full focus:border-none focus:outline-0 font-light"
            />
          </div>
          <div
            id="desc"
            class="flex items-center justify-between border-2 border-gray-300 hover:border-[#6528E0] transition duration-200"
          >
            <label class="p-2 text-sm text-center" for="description">Açıklama</label>
            <textarea
              v-model="waitingDatas.description"
              id="description"
              class="p-2 w-full focus:border-none focus:outline-0 font-light"
            ></textarea>
          </div>
          <div
            id="category"
            class="flex items-center justify-between border-2 border-gray-300 hover:border-[#6528E0] transition duration-200"
          >
            <select
              v-model="waitingDatas.category"
              class="p-2 w-full focus:border-none focus:outline-0 font-light"
            >
              <option :value="null" selected>Kategori seçin</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.title }}
              </option>
            </select>
          </div>
          <div class="mt-auto" id="submit_button_container">
            <button
              @click.prevent="postTheBlog"
              class="w-full bg-[#6528E0] text-white font-semibold p-2 rounded-md hover:scale-95 transition duration-200"
            >
              Paylaş
            </button>
          </div>
          <!-- Hata Mesajı -->
          <p
            v-if="messages[1].failed"
            class="text-red-700 bg-red-200 font-semibold p-2 rounded-md text-sm mt-2 text-center relative"
          >
            {{ messages[1].failed }}
          </p>
          <div
            v-if="messages[0].state"
            class="text-green-700 font-semibold bg-green-200 text-center p-2 rounded-md"
          >
            {{ messages[0].success }}
          </div>
        </div>
      </div>
    </form>
    <AIContentCreator></AIContentCreator>
  </div>
</template>
<script>
import axios from 'axios'
import AIContentCreator from './AIContentCreator.vue'
export default {
  name: 'UploadForm',
  components: {
    AIContentCreator,
  },
  data() {
    return {
      dummyImages: [
        '/dummy_images/4.png',
        '/dummy_images/5.png',
        '/dummy_images/6.png',
        '/dummy_images/7.png',
        '/dummy_images/8.png',
        '/dummy_images/9.png',
        '/dummy_images/10.png',
        '/dummy_images/11.png',
        '/dummy_images/12.png',
        '/dummy_images/13.png',
      ],
      messages: [
        {
          state: false,
          success: 'Blog başarıyla oluşturuldu.',
        },
        {
          failed: null,
        },
      ],
      waitingDatas: {
        title: '',
        category: '',
        description: '',
        images: [], // Çoklu resim tutacak dizi
      },

      categories: [],
    }
  },
  methods: {
    resetForm() {
      setTimeout(() => {
        this.messages[0].state = false
      }, 2000)

      this.waitingDatas = {
        title: '',
        category: '',
        description: '',
        images: [], // Çoklu resim tutacak dizi
      }
    },
    validateImageMimeType(file) {
      // İzin verilen MIME türleri
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
      return allowedMimeTypes.includes(file.type)
    },
    handleImageUpload(event) {
      const files = Array.from(event.target.files) // Dosyaları diziye dönüştür

      files.forEach((file) => {
        // MIME türünü doğrula
        if (!this.validateImageMimeType(file)) {
          this.messages[1].failed = `Geçersiz dosya türü: ${file.name}`
          return
        }

        // Resmi okuma işlemi
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageObject = {
            id: Date.now() + Math.random(), // Benzersiz bir ID oluştur
            name: file.name,
            src: e.target.result, // Base64 formatında veri
            file: file,
          }
          this.waitingDatas.images.push(imageObject) // Resmi dizinin sonuna ekle
          this.messages[1].failed = null // Hata mesajını sıfırla
        }
        reader.readAsDataURL(file)
      })
    },

    removeImage(id) {
      this.waitingDatas.images = this.waitingDatas.images.filter((image) => image.id !== id) // Resmi diziden kaldır
    },
    async getCategories() {
      try {
        const response = await axios.get('https://blogistanbul-api-production.up.railway.app/api/categories')

        for (const index in response.data) {
          this.categories.push({
            id: response.data[index]._id,
            title: response.data[index].name,
          })
        }
      } catch (error) {
        console.error('Kategori alma hatası:', error.response?.data || error)
        this.messages[1].failed = 'Kategoriler alınamadı!'
      }
    },
    async postTheBlog() {
      try {
        const formData = new FormData()
        if (this.waitingDatas.category === null) {
          this.messages[1].failed = 'Bir kategori seçin'
          return
        }
        if (
          !this.waitingDatas.title ||
          !this.waitingDatas.description ||
          !this.waitingDatas.category
        ) {
          this.messages[1].failed = 'Tüm alanlar doldurulmalıdır !'
          return
        }

        formData.append('title', this.waitingDatas.title)
        formData.append('content', this.waitingDatas.description)
        formData.append('category', this.waitingDatas.category) // Kategori ID'si gönderiliyor

        this.waitingDatas.images.forEach((image) => {
          formData.append(`images`, image.file)
        })
        const token = localStorage.getItem('authToken')

        const response = await axios.post('https://blogistanbul-api-production.up.railway.app/api/blogposts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('Gönderi başarılı:', response.data)
        this.messages[0].state = true
        this.resetForm()
      } catch (error) {
        console.error('Gönderi hatası:', error.response?.data || error)
        this.messages[1].failed = 'Gönderi başarısız!'
      }
    },
  },
  mounted() {
    this.getCategories()
  },
}
</script>

<style scoped>
.ai-wrapper-outer::before {
  content: '';
  position: absolute;
  top: -25%;
  left: -25%;
  width: 150%;
  height: 150%;
  background: conic-gradient(rgb(255, 0, 132) 0deg, rgb(128, 0, 255) 90deg, transparent 180deg);
  animation: border-spin 6s linear infinite;
  z-index: 0;
  border-radius: 0; /* Dörtgen şekil */
}

@keyframes border-spin {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
