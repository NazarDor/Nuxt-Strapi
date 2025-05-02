<template>
  <div class="max-w-6xl mx-auto mt-10 text-center">
    <label>{{ $t("products") }}</label>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import ProductCard from "@/components/ProductCard.vue";
const config = useRuntimeConfig();

const { data: response } = await useFetch(
  `${config.public.apiBase}/products?populate=*`
);
const products = response.value?.data || [];
</script>

<style scoped>
</style>
