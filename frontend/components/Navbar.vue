<template>
  <header class="shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold hover:text-blue-800">
        MyShop
      </NuxtLink>
      <nav class="space-x-6">
        <NuxtLink to="/" class="hover:text-blue-600 transition-colors">
          <label>{{ $t("home-page") }}</label>
        </NuxtLink>
        <NuxtLink to="/products" class="hover:text-blue-600 transition-colors">
          <label>{{ $t("products") }}</label>
        </NuxtLink>
        <NuxtLink to="/services" class="hover:text-blue-600 transition-colors">
          <label>{{ $t("services") }}</label>
        </NuxtLink>
        <NuxtLink to="/about" class="hover:text-blue-600 transition-colors">
          <label>{{ $t("about") }}</label>
        </NuxtLink>
        <NuxtLink
          v-if="user"
          to="/admin"
          class="hover:text-blue-600 transition-colors"
        >
          <label>Admin</label>
        </NuxtLink>
        <NuxtLink
          v-if="!user"
          to="/login"
          class="hover:text-blue-600 transition-colors"
        >
          <label>Login</label>
        </NuxtLink>

        <button
          v-else
          @click="logoutAndRedirect"
          class="hover:text-blue-600 transition-colors"
        >
          <label>Logout</label>
        </button>
      </nav>
      <div class="px-4 py-3 flex gap-3 items-center">
        <CartWidget />
        <form>
          <select
            id="locale-select"
            v-model="$i18n.locale"
            class="language-select"
          >
            <option value="en">EN</option>
            <option value="ua">UA</option>
          </select>
        </form>
        <button
          @click="toggleTheme"
          class="flex items-center px-2 py-2 rounded hover:text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          :aria-label="
            theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
          "
        >
          <span v-if="theme === 'dark'">
            <i class="pi pi-sun text-xl"></i>
          </span>
          <span v-else>
            <i class="pi pi-moon text-xl"></i>
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import { useAuth } from "~/composables/useAuth";
import CartWidget from "./CartWidget.vue";
import { ref, onMounted } from "vue";

const { theme, toggleTheme } = useTheme();
const authReady = ref(false);
const { user, fetchUser, logout } = useAuth();

const logoutAndRedirect = () => {
  logout();
  navigateTo("/login");
};

onMounted(async () => {
  await fetchUser();
  authReady.value = true;
});
</script>

<style scoped>
.language-label {
  font-weight: 500;
  color: #374151;
  margin-right: 0.75rem;
}

.language-select {
  appearance: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.language-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(110, 110, 110, 0.3);
}
</style>