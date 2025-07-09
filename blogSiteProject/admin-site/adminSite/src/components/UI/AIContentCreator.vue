<template>
  <div
    id="ai-content-creator"
    class="flex flex-col justify-between p-4 w-full rounded-xl bg-linear-to-t from-[#6528E0] to-[#9066e4] text-white"
  >
    <h2 class="text-center">AI ile içeriğini hızlıca hazırla ... ✍️</h2>
    <hr class="h-[1px] my-1" />
    <div id="ai-section" class="flex flex-col justify-between h-full">
      <div id="output" class="h-full pt-2">
        <p class="font-light p-2">
          {{ errorMessage ? errorMessage : aiContent || 'Henüz bir içerik oluşturulmadı' }}
        </p>
        <div v-if="loading" id="loading_animation" class="animate-spin text-center text-2xl">
          <i class="bi bi-arrow-repeat"></i>
        </div>
      </div>
      <div id="input-section" class="relative flex items-center rounded-lg">
        <input
          type="text"
          v-model="promptText"
          class="text-xs w-full border border-white rounded-lg p-2 focus:outline-none"
          placeholder="Yapay zeka ile içeriğini oluşturmak için hemen yaz 🚀✨"
          @keyup.enter="generateBlogContent"
        />
        <button
          @click="generateBlogContent"
          :disabled="loading"
          class="absolute right-4 cursor-pointer"
        >
          <i class="bi bi-send"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'AIContentCreator',
  setup() {
    const promptText = ref('')
    const aiContent = ref('')
    const loading = ref(false)
    const errorMessage = ref(null)
    const COHERE_API_KEY = '0I56Sr4d2VSq1o7RX8I5LQkO1EG0kvXXf1S0PS94'
    const generateBlogContent = async () => {
      if (!promptText.value.trim()) {
        errorMessage.value = 'Yapay zekaya bir komut vermelisin !'
        return
      }
      loading.value = true

      aiContent.value = ''
      try {
        const response = await fetch('https://api.cohere.ai/v1/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${COHERE_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'command',
            prompt: `"Aşağıdaki konuda bir blog yazısı yaz:\n${promptText.value}"`,
            max_tokens: 300,
            temperature: 0.5,
          }),
        })
        const data = await response.json()
        aiContent.value = data.generations?.[0]?.text.trim() || 'İçerik oluşturulamadı'
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
        errorMessage.value = ''
      }
    }
    return {
      promptText,
      aiContent,
      loading,
      errorMessage,
      generateBlogContent,
    }
  },
}
</script>


