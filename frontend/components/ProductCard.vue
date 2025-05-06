<template>
  <div
    class="card p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col h-full"
  >
    <Toast />
    <div>
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="altText"
        class="w-full h-48 object-cover rounded mb-4"
      />
      <h2 class="text-xl font-semibold">{{ product.title }}</h2>
      <p class="mt-2 text-sm min-h-[2rem]">
        {{ product.description[0]?.children[0]?.text }}
      </p>
    </div>
    <div class="mt-auto flex flex-col gap-2">
      <p class="text-lg font-bold">{{ product.price }} $</p>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        @click="buyProduct"
      >
        <label>{{ $t("order-in-one-click") }}</label>
      </button>
      <button
        class="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        @click="addToCart"
      >
        {{ $t("add-to-cart") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "~/stores/cart";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";

const toast = useToast();
const cartStore = useCartStore();
const { t } = useI18n();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const addToCart = () => {
  cartStore.addItem(props.product);
  toast.add({
    severity: "success",
    summary: "Added",
    detail: t("cart.added", { title: props.product.title }),
    life: 3000,
  });
};

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
.btn-secondary {
  background-color: #f3f4f6;
  color: #1f2937;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border: 1px solid #e5e5e5;
}
</style>
  