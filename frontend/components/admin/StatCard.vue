<template>
  <!-- Grid контейнер для карточек -->
  <div class="grid grid-cols-12 gap-6 p-4">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="col-span-12 lg:col-span-6 xl:col-span-3 transition-all duration-300 hover:scale-[1.02]"
    >
      <!-- Карточка с тенью и скруглением -->
      <div
        class="card bg-white dark:bg-surface-800 rounded-xl shadow-lg hover:shadow-xl p-6"
      >
        <div class="flex justify-between items-start mb-4">
          <!-- Текстовый блок -->
          <div>
            <span
              class="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2"
            >
              {{ stat.label }}
            </span>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ stat.value }}
            </div>
          </div>

          <!-- Иконка с фоном -->
          <div
            class="flex items-center justify-center rounded-xl p-3"
            :class="stat.iconBg"
          >
            <i :class="['pi', stat.icon, stat.iconColor, '!text-xl']"></i>
          </div>
        </div>

        <!-- Нижний текст -->
        <div class="mt-4">
          <span class="text-primary-500 dark:text-primary-400 font-medium">
            {{ stat.highlight }}
          </span>
          <span class="text-gray-500 dark:text-gray-400 text-sm">
            {{ stat.subtext }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: {
    type: Array,
    default: () => [],
  },
  orders: {
    type: Array,
    default: () => [],
  },
});

const ordersCount = computed(() => props.orders.length);
const totalRevenue = computed(() =>
  props.orders.reduce((sum, order) => sum + (order.amount || 0), 0)
);
const uniqueCustomers = computed(
  () => new Set(props.orders.map((order) => order.customer)).size
);

const stats = computed(() => [
  {
    label: "Orders",
    value: ordersCount.value,
    icon: "pi-shopping-cart",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100 dark:bg-blue-400/10",
    highlight: "",
    subtext: "Total orders",
  },
  {
    label: "Revenue",
    value: `$${totalRevenue.value}`,
    icon: "pi-dollar",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100 dark:bg-orange-400/10",
    highlight: "",
    subtext: "Total revenue",
  },
  {
    label: "Customers",
    value: uniqueCustomers.value,
    icon: "pi-users",
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-100 dark:bg-cyan-400/10",
    highlight: "",
    subtext: "Unique customers",
  },
  {
    label: "Comments",
    value: "",
    icon: "pi-comment",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100 dark:bg-purple-400/10",
    highlight: "85 ",
    subtext: "responded",
  },
]);
</script>

<style scoped>
/* Дополнительные кастомные стили если нужно */
.card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.dark .card {
  background: #1f2937; /* Темный фон для dark mode */
}
</style>
