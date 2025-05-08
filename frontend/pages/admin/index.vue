<template>
  <div class="max-w-7xl mx-auto mt-16 px-4 text-center pb-16">
    <h1>Админ панель</h1>
    <StatCard :orders="orders" />
    <div class="col-span-12 xl:col-span-12 shadow-xl rounded-2xl">
      <RecentSales :orders="orders" />
    </div>
  </div>
</template>

<script setup>
import StatCard from "~/components/admin/StatCard.vue";
import RecentSales from "~/components/admin/RecentSales.vue";
const config = useRuntimeConfig();

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const { data: response } = await useFetch(
  `${config.public.apiBase}/orders?populate=*`
);
const orders = response.value?.data || [];

// const stats = [
//   {
//     label: "Orders",
//     value: 152,
//     icon: "pi-shopping-cart",
//     iconColor: "text-blue-500",
//     iconBg: "bg-blue-100 dark:bg-blue-400/10",
//     highlight: "24 new ",
//     subtext: "since last visit",
//   },
//   {
//     label: "Revenue",
//     value: "$2,100",
//     icon: "pi-dollar",
//     iconColor: "text-orange-500",
//     iconBg: "bg-orange-100 dark:bg-orange-400/10",
//     highlight: "%52+ ",
//     subtext: "since last week",
//   },
//   {
//     label: "Customers",
//     value: 28441,
//     icon: "pi-users",
//     iconColor: "text-cyan-500",
//     iconBg: "bg-cyan-100 dark:bg-cyan-400/10",
//     highlight: "520 ",
//     subtext: "newly registered",
//   },
//   {
//     label: "Comments",
//     value: "152 Unread",
//     icon: "pi-comment",
//     iconColor: "text-purple-500",
//     iconBg: "bg-purple-100 dark:bg-purple-400/10",
//     highlight: "85 ",
//     subtext: "responded",
//   },
// ];
</script>

