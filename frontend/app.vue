<template>
  <div class="min-h-screen flex flex-col">
    <NuxtRouteAnnouncer />
    <Navbar />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";
import "primeicons/primeicons.css";
import { onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

onMounted(async () => {
  const { fetchUser } = useAuth()
  await fetchUser()
})
</script>
