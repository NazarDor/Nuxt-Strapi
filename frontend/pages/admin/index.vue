<template>
  <div>
    <Sidebar />
    <div class="layout-main-container">
      <div class="max-w-7xl w-full mx-auto mt-16 px-6 text-center pb-16">
        <StatCard :orders="orders" />
        <div class="col-span-12 xl:col-span-12 shadow-xl rounded-2xl">
          <RecentSales :orders="orders" />
        </div>
        <div class="col-span-12 xl:col-span-12 shadow-xl rounded-2xl">
          <RecentServices :subscriptions="subscriptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatCard from "~/components/admin/StatCard.vue";
import RecentSales from "~/components/admin/RecentSales.vue";
import Sidebar from "~/components/admin/Sidebar.vue";
import RecentServices from "~/components/admin/RecentServices.vue";
const config = useRuntimeConfig();

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const { data: responseOrders } = await useFetch(
  `${config.public.apiBase}/orders?populate=*`
);
const orders = responseOrders.value?.data || [];

const { data: responseSubscriptions } = await useFetch(
  `${config.public.apiBase}/subscriptions?populate=*`
);
const subscriptions = responseSubscriptions.value?.data || [];
</script>

<style scoped>
.layout-main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  margin-left: 300px;
  padding: 1rem 2rem 0;
  transition: margin-left var(--layout-section-transition-duration);
}
</style>