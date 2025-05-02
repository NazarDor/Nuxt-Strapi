<template>
  <div class="card bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="altText"
      class="w-full h-48 object-cover rounded mb-4"
    />
    <h2 class="text-xl font-semibold">{{ product.title }}</h2>
    <p class="text-gray-600 mt-2 text-sm">
      {{ product.description[0]?.children[0]?.text }}
    </p>
    <p class="text-gray-500 text-sm mt-2 italic">{{ product.slug }}</p>
    <p class="text-lg font-bold mt-2">{{ product.price }} $</p>

    <button
      class="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 w-full"
      @click="buyProduct"
    >
      <label>{{ $t("order-in-one-click") }}</label>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { loadStripe } from "@stripe/stripe-js";

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

const buyProduct = async () => {
  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: props.product.id,
      title: props.product.title,
      price: props.product.price,
    }),
  });

  const data = await response.json();
  await stripe.redirectToCheckout({ sessionId: data.id });
};
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
  