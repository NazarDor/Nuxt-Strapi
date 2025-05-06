<template>
  <div class="min-h-screen flex flex-col">
    <NuxtRouteAnnouncer />
    <Navbar />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import 'primeicons/primeicons.css'
</script>
