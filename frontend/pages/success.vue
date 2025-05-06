<template>
  <div class="success-page">
    <div class="card">
      <h1 class="title">🎉 Спасибо за покупку!</h1>
      <p class="subtitle">Ваш заказ успешно оформлен.</p>
      <NuxtLink to="/" class="home-link"> Вернуться на главную </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { NuxtLink } from "#components";
const cartStore = useCartStore();

onMounted(() => {
  cartStore.clearCart();
});
</script>

<style scoped>
.success-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
}

.card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 24px;
}

.home-link {
  display: inline-block;
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #2563eb;
}
</style>
