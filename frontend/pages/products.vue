<template>
  <div>
    <h1>Products</h1>
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue';
import { loadStripe } from "@stripe/stripe-js";
const config = useRuntimeConfig();

const { data: response } = await useFetch(
  `${config.public.apiBase}/products?populate=*`
);
const products = response.value?.data || [];
console.log(products, "products");
</script>

<style scoped>
</style>
