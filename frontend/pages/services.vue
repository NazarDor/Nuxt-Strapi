<template>
  <div class="max-w-6xl mx-auto mt-10 text-center">
    <h1 class="text-3xl font-bold mb-6">Наши услуги</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ServiceCard
        v-for="service in services"
        :key="service.id"
        :service="service"
      />
    </div>
  </div>
</template>
  
<script setup>
import ServiceCard from "@/components/ServiceCard.vue";

const config = useRuntimeConfig();

const { data: response } = await useFetch(
  `${config.public.apiBase}/services?populate=*`
);
const services = response.value?.data || [];
</script>
  
  <style scoped>
</style>
  

