<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <NuxtLink
        to="/"
        class="text-2xl font-bold text-blue-600 hover:text-blue-800"
      >
        MyShop
      </NuxtLink>
      <nav class="space-x-6">
        <NuxtLink
          to="/"
          class="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Главная
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Продукты
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Про нас
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
  