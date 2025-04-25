<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-600">Магазин</h1>
      <nav class="space-x-4">
        <NuxtLink to="/" class="hover:underline">Главная</NuxtLink>
        <NuxtLink to="/about" class="hover:underline">О нас</NuxtLink>
        <NuxtLink to="/products" class="hover:underline">Продукты</NuxtLink>
      </nav>
    </header>

    <main class="p-6 max-w-6xl mx-auto">
      <slot />
    </main>
  </div>
</template>
  