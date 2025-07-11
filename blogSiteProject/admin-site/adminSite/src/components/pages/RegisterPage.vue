<template>
  <div class="w-full container">
    <div class="flex justify-center bg-[#F3F4F6]">
      <AdminPageHeader></AdminPageHeader>
    </div>
    <div class="min-h-screen flex justify-center bg-[#F3F4F6] w-full container">
      <div class="container items-center justify-center flex flex-col bg-white">
        <form @submit.prevent="onSubmit" class="flex flex-col gap-6 p-4 w-full max-w-max">
          <div class="flex gap-4 flex-col md:flex-row">
            <div class="flex flex-col gap-2 justify-center relative w-full">
              <input type="text" id="name" v-model="name" required :class="inputClass" />
              <label for="username" :class="labelClass">İsim</label>
            </div>
            <div class="flex flex-col gap-2 justify-center relative w-full">
              <input type="text" id="surname" v-model="surname" required :class="inputClass" />
              <label for="username" :class="labelClass">Soyisim</label>
            </div>
          </div>

          <div class="flex flex-col gap-2 justify-center relative w-full">
            <input type="text" id="username" v-model="username" required :class="inputClass" />
            <label for="username" :class="labelClass">Kullanıcı Adı</label>
          </div>
          <div class="flex flex-col gap-2 justify-center relative w-full">
            <input type="text" id="email" v-model="email" required :class="inputClass" />
            <label for="email" :class="labelClass">Email</label>
          </div>
          <div class="flex flex-col gap-2 justify-center relative w-full">
            <input type="password" id="password" v-model="password" required :class="inputClass" />
            <label for="password" :class="labelClass">Şifre</label>
          </div>

          <button
            @click="onSubmit"
            type="submit"
            class="bg-[#6528E0] rounded text-white font-semibold p-2 hover:scale-95 transition"
          >
            Register
          </button>

          <div class="flex flex-col items-center justify-center gap-5">
            <div class="w-full flex flex-col items-center justify-center relative">
              <hr class="w-full opacity-25" />
              <p class="bg-white absolute text-center p-1.5">Giriş yapma seçenekleri</p>
            </div>
            <div class="w-fit flex gap-4">
              <i class="bi bi-google text-2xl text-[#6528e0] hover:scale-110 transition-all"></i>
              <router-link to="/login">
                <i
                  class="bi bi-person-plus-fill text-2xl text-[#6528e0] hover:scale-110 transition-all"
                ></i>
              </router-link>
            </div>
          </div>
          <div>
            <p v-if="errorMessage" class="text-red-500 text-center">
              {{ errorMessage }}
            </p>
          </div>
        </form>
      </div>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import AdminPageHeader from '../UI/AdminPageHeader.vue'
import axios from 'axios'
import FooterComponent from '../UI/FooterComponent.vue'
export default {
  components: {
    FooterComponent,
    AdminPageHeader,
  },
  data() {
    return {
      labelClass:
        'absolute left-7 top-4 text-[#6528E0] bg-white transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6528E0] peer-focus:left-5 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#6528E0] peer-valid:top-[-10px] peer-valid:text-sm peer-valid:text-[#6528E0]',
      inputClass:
        'peer border p-4 focus:outline-none focus:border-[#6528E0] text-[#6528E0] transition-all',
      errorMessage: '',
      name: '',
      surname: '',
      username: '',
      password: '',
      email: '',
    }
  },
  methods: {
    async onSubmit() {
      console.log(
        `Gelen bilgiler:${this.name},${this.surname},${this.username},${this.email},${this.password}`,
      )
      try {
        await axios.post('https://blogistanbul-api-production.up.railway.app/api/register', {
          name: this.name,
          surname: this.surname,
          username: this.username,
          password: this.password,
          email: this.email,
        })
        this.$router.push('/admin')
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Kayıt başarısız'
      }
    },
  },
}
</script>
