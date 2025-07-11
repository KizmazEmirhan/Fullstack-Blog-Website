<template>
  <div class="w-full container">
    <div class="flex justify-center bg-[#F3F4F6]">
      <AdminPageHeader></AdminPageHeader>
    </div>
    <div class="min-h-screen flex justify-center bg-[#F3F4F6] w-full container">
      <div class="container items-center justify-center flex flex-col bg-white">
        <form @submit.prevent="onSubmit" class="flex flex-col gap-6 p-4 w-full max-w-md">
          <div class="flex flex-col gap-2 justify-center relative w-full">
            <input type="text" id="email" v-model="email" required :class="inputClass" />
            <label for="username" :class="labelClass">Email</label>
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
            Login
          </button>

          <div class="flex flex-col items-center justify-center gap-5">
            <div class="w-full flex flex-col items-center justify-center relative">
              <hr class="w-full opacity-25" />
              <p class="bg-white absolute text-center p-1.5">Ya da Google ile giriş yap</p>
            </div>
            <div class="w-fit">
              <i class="bi bi-google text-2xl text-[#6528e0]"></i>
            </div>
          </div>
          <div>
            <p v-if="errorMessage" class="text-red-500 text-center">
              {{ errorMessage }}
            </p>
          </div>
        </form>
        <div class="flex flex-col items-center justify-center w-full max-w-md p-4">
          <div class="w-full flex flex-col items-center justify-center relative">
            <hr class="opacity-25 w-full" />
            <p class="bg-white text-center p-1.5 absolute">Hesabın yok mu ?</p>
          </div>
          <div class="pt-4">
            <router-link
              to="/register"
              class="text-[#6528E0] font-semibold text-lg hover:scale-95 transition cursor-pointer"
              >Kayıt Ol</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPageHeader from '../UI/AdminPageHeader.vue'
import FooterComponent from '../UI/FooterComponent.vue'
export default {
  components: {
    FooterComponent,
    AdminPageHeader,
  },
  data() {
    return {
      errorMessage: '',
      email: '',
      password: '',

      labelClass:
        'absolute left-7 top-4 text-[#6528E0] bg-white transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6528E0] peer-focus:left-5 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#6528E0] peer-valid:top-[-10px] peer-valid:text-sm peer-valid:text-[#6528E0]',
      inputClass:
        'peer border p-4 focus:outline-none focus:border-[#6528E0] text-[#6528E0] transition-all',
    }
  },
  methods: {
    async onSubmit() {
      try {
        const response = await axios.post('https://blogistanbul-api-production.up.railway.app//api/login', {
          email: this.email,
          password: this.password,
        })
        console.log('Login successful:', response.data)
        localStorage.setItem('authToken', response.data.token)
        this.$router.push('/admin')
      } catch (error) {
        console.error('Login failed:', error)
        this.errorMessage = error.response?.data?.message || 'Invalid username or password'
      }
    },
  },
}
</script>
