<!-- components/ScrollToTop.vue -->
<template>
  <button
    v-show="showScrollTop"
    @click="scrollToTop"
    class="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none"
    aria-label="Scroll to top"
  >
    <svg
      class="w-6 h-6 mx-auto"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5 15l7-7 7 7"
      ></path>
    </svg>
  </button>
</template>
  
  <script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const showScrollTop = ref(false);

function handleScroll() {
  showScrollTop.value = window.scrollY > 200;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
  