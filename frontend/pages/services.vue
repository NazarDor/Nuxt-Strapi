<template>
  <div class="max-w-6xl mx-auto mt-10 text-center">
    <h1 class="text-3xl font-bold mb-6">
      <label>{{ $t("services") }}</label>
    </h1>
    <div class="mb-6 flex flex-wrap gap-2 justify-center">
      <button
        class="px-4 py-2 rounded hover:bg-blue-500"
        :class="{ 'bg-blue-500 font-semibold': selectedCategory === null }"
        @click="selectCategory(null)"
      >
        {{ $t("all") }}
      </button>
      <button
        v-for="category in categories"
        :key="category.id"
        class="px-4 py-2 rounded hover:bg-blue-500"
        :class="{
          'bg-blue-500 font-semibold': selectedCategory === category.id,
        }"
        @click="selectCategory(category.id)"
      >
        {{ category.Name }}
      </button>
    </div>
    <div class="grid grid-cols-1 text-white sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ServiceCard
        v-for="service in filteredServices"
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

const { data: categoriesResponse } = await useFetch(
  `${config.public.apiBase}/categories`
);

const categories = categoriesResponse.value?.data || [];

const selectedCategory = ref(null);

function selectCategory(id) {
  selectedCategory.value = id;
}

const filteredServices = computed(() => {
  if (!selectedCategory.value) return services;
  return services.filter(
    (service) =>
      Array.isArray(service.categories) &&
      service.categories.some((cat) => cat.id === selectedCategory.value)
  );
});
</script>
  
  <style scoped>
</style>
  

