<template>
  <div class="card">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="altText"
      width="300"
      class="rounded shadow"
    />
    <h2 class="text-xl font-bold mt-4">{{ product.title }}</h2>
    <p class="text-gray-500 text-sm mt-2">{{ product.slug }}</p>
  </div>
</template>
  
<script setup>
import { computed } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const BASE_URL = "http://localhost:1337";

const imageUrl = computed(() => {
  const img = props.product.image[0].url;
  if (!img) return null;

  return BASE_URL + img;
});

const altText = computed(() => {
  return (
    props.product.image?.data?.alternativeText || props.product.title || "Image"
  );
});
</script>
  
  <style scoped>
.card {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  max-width: 400px;
}
</style>
  