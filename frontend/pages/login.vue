<template>
  <div
    class="min-h-screen flex items-center justify-center from-blue-50 to-blue-200"
  >
    <div
      class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md bg-gradient-to-br"
    >
      <h1 class="text-2xl font-bold text-blue-700 mb-6 text-center">
        Вход в систему
      </h1>
      <form @submit.prevent="submit" class="space-y-5">
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            autocomplete="email"
            required
          />
        </div>
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Пароль</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            autocomplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg shadow transition"
        >
          Войти
        </button>
      </form>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";
const email = ref("");
const password = ref("");
const { login } = useAuth();

const submit = async () => {
  await login(email.value, password.value);
  navigateTo("/admin");
};
</script>
  