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
          <label>{{ $t("home-page") }}</label>
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="text-gray-700 hover:text-blue-600 transition-colors"
        >
        <label>{{ $t("products") }}</label>
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="text-gray-700 hover:text-blue-600 transition-colors"
        >
        <label>{{ $t("about") }}</label>
        </NuxtLink>
        <NuxtLink
          to="/services"
          class="text-gray-700 hover:text-blue-600 transition-colors"
        >
        <label>{{ $t("services") }}</label>
        </NuxtLink>
      </nav>
      <form class="language-form">
        <select
          id="locale-select"
          v-model="$i18n.locale"
          class="language-select"
        >
          <option value="en">English</option>
          <option value="ua">Українська</option>
        </select>
      </form>
    </div>
  </header>
</template>
  

<style scoped>
.language-label {
  font-weight: 500;
  color: #374151; /* темно-серый цвет текста */
  margin-right: 0.75rem;
}

.language-select {
  appearance: none; /* убираем стандартные стили */
  background-color: #fff; /* белый фон */
  border: 1px solid #d1d5db; /* светло-серая рамка */
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #4b5563; /* серый цвет текста */
  transition: border-color 0.2s, box-shadow 0.2s; /* плавный переход */
  cursor: pointer;

  /* Добавляем стрелку (иконку) */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em;
  padding-right: 2.5rem; /* место для стрелки */
}

/* При наведении фокуса */
.language-select:focus {
  outline: none;
  border-color: #6366f1; /* синий цвет рамки при фокусе */
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3); /* мягкая тень при фокусе */
}
</style>