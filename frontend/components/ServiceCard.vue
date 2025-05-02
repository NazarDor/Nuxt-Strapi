<template>
  <div class="">
    <div class="card bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="altText"
        class="w-full h-48 object-cover rounded mb-4"
      />
      <h2 class="text-xl font-semibold">{{ service.title }}</h2>
      <p class="text-gray-600 mt-2 text-sm">
        {{ service.description[0]?.children[0]?.text }}
      </p>
      <p class="text-lg font-bold mt-2">{{ service.price }} $</p>

      <button
        class="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 w-full"
        @click="bookService(service.id)"
      >
        Замовити
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { loadStripe } from "@stripe/stripe-js";

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});

const BASE_URL = "http://localhost:1337";

const imageUrl = computed(() => {
  const img = props.service.image[0].url;
  if (!img) return null;

  return BASE_URL + img;
});

const altText = computed(() => {
  return (
    props.service.image?.data?.alternativeText || props.service.title || "Image"
  );
});

const bookService = async () => {
  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: props.service.id,
      title: props.service.title,
      price: props.service.price,
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.service-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.book-btn {
  margin-top: 10px;
  background: #3b82f6;
  color: #fff;
  padding: 10px 20px;
  border-radius: 6px;
}
.booking-form {
  margin-top: 30px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
}
.booking-form input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}

.booking-form {
  margin-top: 30px;
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.booking-form h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
}

.booking-form input {
  width: 100%;
  margin-bottom: 15px;
  padding: 12px 15px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.booking-form input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  outline: none;
}

.booking-form button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.booking-form button:first-of-type {
  background-color: #3b82f6;
  color: white;
  margin-bottom: 10px;
}

.booking-form button:first-of-type:hover {
  background-color: #2563eb;
}

.booking-form button:last-of-type {
  background-color: #f3f4f6;
  color: #374151;
}

.booking-form button:last-of-type:hover {
  background-color: #e5e7eb;
}
</style>
  