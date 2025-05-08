<template>
  <div class="col-span-12 xl:col-span-6 shadow-xl rounded-2xl">
    <div class="card">
      <div class="font-semibold text-xl mb-4">Recent Sales</div>
      <div class="overflow-auto">
        <table class="min-w-full text-left">

          <thead class="bg-gray-100 sticky top-0">
            <tr>
              <th class="py-2 px-4">Id</th>
              <th class="py-2 px-4">Produt</th>
              <th class="py-2 px-4">Price</th>
              <th class="py-2 px-4">Customer</th>
              <th class="py-2 px-4 w-8">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="py-2 px-4">{{ order.id }}</td>
              <td class="py-2 px-4 font-medium">{{ order.productTitle }}</td>
              <td class="py-2 px-4">{{ order.amount }}$</td>
              <td class="py-2 px-4">{{ order.customer }}</td>
              <td class="py-2 px-4">{{ order.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  

<script setup>
defineProps({
  orders: Array,
});
</script>

<style scoped>
.card {
  background: var(--surface-card);
  padding: 2rem;
}
</style>