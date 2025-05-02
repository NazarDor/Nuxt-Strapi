<template>
  <div>
    <div class="card">
      <img v-if="imageUrl" :src="imageUrl" :alt="altText" class="card-image" />
      <h2 class="card-title">{{ service.title }}</h2>
      <p class="card-description">
        {{ service.description[0]?.children[0]?.text }}
      </p>
      <p class="card-price">{{ service.price }} $</p>

      <button class="btn-primary" @click="openModal">Замовити в один клік</button>
    </div>

    <!-- Модальное окно -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <header class="modal-header">
          <h3>Замовлення послуги: {{ service.title }}</h3>
          <button
            class="modal-close-btn"
            @click="closeModal"
            :disabled="isPending"
            aria-label="Закрити"
          >
            &times;
          </button>
        </header>

        <div class="modal-body">
          <p>Оберіть дату та час для послуги:</p>

          <div class="form-group">
            <label for="date-picker">Дата</label>
            <input
              id="date-picker"
              type="date"
              v-model="selectedDate"
              :min="minDate"
              :disabled="isPending"
              class="input"
            />
          </div>
          <div class="form-group">
            <label for="time-select">Час</label>
            <select
              id="time-select"
              v-model="selectedTime"
              :disabled="isPending"
              class="input"
            >
              <option value="" disabled>Оберіть час</option>
              <option v-for="time in availableTimes" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>
        </div>

        <footer class="modal-footer">
          <p class="price">Ціна: {{ service.price }} $</p>
          <button
            class="btn-primary"
            @click="bookService"
            :disabled="!selectedDate || !selectedTime || isPending"
          >
            {{ isPending ? "Зачекайте..." : "Підтвердити замовлення" }}
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";

const isModalOpen = ref(false);
const selectedDate = ref(null);
const selectedTime = ref("");
const isPending = ref(false);

const availableTimes = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});

const BASE_URL = "http://localhost:1337";

const imageUrl = computed(() => {
  const img = props.service.image?.[0]?.url;
  if (!img) return null;
  return BASE_URL + img;
});

const altText = computed(() => {
  return (
    props.service.image?.[0]?.alternativeText || props.service.title || "Image"
  );
});

const openModal = () => {
  isModalOpen.value = true;
  selectedDate.value = null;
  selectedTime.value = "";
};

const closeModal = () => {
  if (!isPending.value) {
    isModalOpen.value = false;
  }
};

const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

const bookService = async () => {
  if (!selectedDate.value || !selectedTime.value) return;

  try {
    isPending.value = true;
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

    const appointmentDate = new Date(selectedDate.value);
    const [hours, minutes] = selectedTime.value.split(":").map(Number);
    appointmentDate.setHours(hours, minutes, 0, 0);

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: props.service.id,
        title: props.service.title,
        price: props.service.price,
        appointmentDate: appointmentDate.toISOString(),
      }),
    });

    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  } catch (error) {
    console.error("Ошибка при оформлении заказа:", error);
    alert("Сталася помилка при оформленні замовлення. Спробуйте пізніше.");
  } finally {
    isPending.value = false;
  }
};
</script>

<style scoped>
.card {
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
  transition: box-shadow 0.3s ease;
}
.card:hover {
  box-shadow: 0 8px 16px rgb(0 0 0 / 0.15);
}
.card-image {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
}
.card-description {
  color: #4a5568; /* gray-600 */
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
.card-price {
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 0.5rem;
}
.btn-primary {
  background-color: #2563eb; /* blue-600 */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.btn-primary:hover:not(:disabled) {
  background-color: #1e40af; /* blue-700 */
}
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: white;
  border-radius: 12px;
  max-width: 480px;
  width: 90%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
}
.modal-close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: #4a5568;
  padding: 0 0.25rem;
  transition: color 0.3s ease;
}
.modal-close-btn:hover:not(:disabled) {
  color: #1e40af;
}
.modal-close-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.modal-body p {
  margin-bottom: 1rem;
  color: #4a5568;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #2d3748;
}
.input {
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}
.input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}
.price {
  font-weight: 700;
  font-size: 1.125rem;
}
</style>
