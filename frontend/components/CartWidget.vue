<template>
  <div class="relative">
    <button @click="toggleCart" class="flex items-center">
      <Icon name="mdi:cart" class="w-6 h-6" />
      <span
        class="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
      >
        {{ cartStore.totalItems }}
      </span>
    </button>

    <div
      v-if="isCartOpen"
      class="absolute right-0 top-12 bg-white shadow-lg rounded-lg p-4 w-64 z-50"
    >
      <div v-if="cartStore.items.length === 0" class="text-gray-500">
        {{ $t("cart.empty") }}
      </div>

      <div v-else>
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="py-2 border-b"
        >
          <div class="flex justify-between items-center">
            <div>
              <h3 class="font-medium text-gray-900">{{ item.title }}</h3>
              <p class="text-sm text-gray-500">
                {{ item.quantity }} × ${{ item.price }}
              </p>
            </div>
            <button
              @click="removeItem(item)"
              class="text-red-500 hover:text-red-700"
            >
              <Icon name="mdi:trash" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <div class="mt-4">
          <p class="font-bold text-gray-900">Total: ${{ cartStore.totalPrice }}</p>
          <button @click="buyCart" class="bg-blue-400 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 w-full">
            {{ $t("cart.checkout") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { loadStripe } from "@stripe/stripe-js";
import { ref } from "vue";
import { useCartStore } from "~/stores/cart";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";

const toast = useToast();
const { t } = useI18n();
const cartStore = useCartStore();
const isCartOpen = ref(false);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const buyCart = async () => {
  if (cartStore.items.length === 0) {
    alert("Корзина пуста");
    return;
  }

  try {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartStore.items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: 1,
        })),
      }),
    });

    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  } catch (error) {
    console.error("Ошибка при оформлении заказа:", error);
  }
};

const removeItem = async (item) => {
  console.log(item, "item");
  try {
    toast.add({
      severity: "error",
      summary: "Remove",
      detail: t("cart.removed", { title: item.title }),
      life: 3000,
    });
    cartStore.removeItem(item.id);
  } catch (error) {
    console.error("Ошибка при оформлении заказа:", error);
  }
};
</script>
  