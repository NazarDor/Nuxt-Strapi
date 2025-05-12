<template>
  <div class="col-span-12 xl:col-span-6 shadow-xl rounded-2xl">
    <div class="card">
      <div class="font-semibold text-xl mb-4">Recent Service</div>
      <div class="overflow-auto">
        <table class="min-w-full text-left">
          <thead class="sticky top-0">
            <tr>
              <th class="py-2 px-4">Id</th>
              <th class="py-2 px-4">Produt</th>
              <th class="py-2 px-4">Price</th>
              <th class="py-2 px-4">Customer</th>
              <th class="py-2 px-4 w-8">Email</th>
              <th class="py-2 px-4">Date</th>
              <th class="py-2 px-4">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="subscription in subscriptions"
              :key="subscription.id"
              class="border-b hover:bg-gray-50 hover:text-black transition"
            >
              <td class="py-2 px-4">{{ subscription.id }}</td>
              <td class="py-2 px-4 font-medium">
                {{ subscription.serviceTitle }}
              </td>
              <td class="py-2 px-4">{{ subscription.amount }}$</td>
              <td class="py-2 px-4">{{ subscription.customer }}</td>
              <td class="py-2 px-4">{{ subscription.email }}</td>
              <td class="py-2 px-4">{{ formattedDateTime(subscription.date) }}</td>
              <td class="py-2 px-4">{{ formattedTime(subscription.date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
    
  
  <script setup>
defineProps({
  subscriptions: Array,
});

function formattedDateTime(date) {
  const d = new Date(date);
  return (
    d.toLocaleDateString("uk-UA")
  );
}

function formattedTime(date) {
  const d = new Date(date);
  return (
    d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })
  );
}
</script>
  
  <style scoped>
.card {
  background: var(--surface-card);
  padding: 2rem;
}
</style>