<template>
  <div class="overflow-hidden hover:shadow-lg transition flex flex-col items-center bg-white">
    <img :src="category.imageURL" alt="" class="h-68 object-cover" />
    <div class="p-4 text-center">
      <h2 class="text-lg font-semibold">{{ category.name }}</h2>
    </div>
  </div>
</template>
<!-- cannot read imageURL error -->
<script>
export default {
  name: 'CategoryCard',
  props: {
    category: Object,
  },
}
</script>
