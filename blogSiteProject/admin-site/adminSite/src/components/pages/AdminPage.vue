<template>
  <div class="flex flex-col items-center w-full bg-[#F3F4F6]">
    <div class="flex justify-center bg-[#F3F4F6] container">
      <AdminPageHeader></AdminPageHeader>
    </div>
    <div class="flex justify-center bg-[#F3F4F6] w-full h-full">
      <UploadForm></UploadForm>
    </div>
    <div class="flex justify-center bg-[#F3F4F6] container">
      <UsersPosts></UsersPosts>
    </div>
    <div class="flex justify-center bg-[#F3F4F6] container">
      <FooterComponent></FooterComponent>
    </div>
  </div>
</template>

<script>
import UploadForm from '../UI/UploadForm.vue'
import AdminPageHeader from '../UI/AdminPageHeader.vue'
import FooterComponent from '../UI/FooterComponent.vue'
import UsersPosts from '../UI/UsersPosts.vue'

export default {
  name: 'MainPage',
  data() {
    return { isLoggedIn: false }
  },
  components: {
    AdminPageHeader,
    UploadForm,
    FooterComponent,
    UsersPosts,
  },
}
</script>
