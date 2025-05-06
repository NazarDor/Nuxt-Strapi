<script setup lang="ts">
// Здесь можно добавить логику, если потребуется
</script>

<template>
  <footer class="border-t mt-12">
    <div
      class="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8"
    >
      <div>
        <NuxtLink
          to="/"
          class="text-2xl font-extrabold hover:text-blue-800 transition-colors"
        >
          MyShop
        </NuxtLink>
        <p class="mt-3">
          Your one-stop shop for quality products and services.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">
          {{ $t("navigation") || "Navigation" }}
        </h3>
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/" class="hover:text-blue-600 transition-colors">{{
              $t("home-page")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/products"
              class="hover:text-blue-600 transition-colors"
              >{{ $t("products") }}</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/services"
              class="hover:text-blue-600 transition-colors"
              >{{ $t("services") }}</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/about"
              class="hover:text-blue-600 transition-colors"
              >{{ $t("about") }}</NuxtLink
            >
          </li>
        </ul>
      </div>

      <!-- Контакты -->
      <div>
        <h3 class="text-lg font-semibold mb-4">
          {{ $t("contact-us") || "Contact Us" }}
        </h3>
        <address class="not-italic space-y-2">
          <p>123 Main Street, City, Country</p>
          <p>
            Phone:
            <a
              href="tel:+1234567890"
              class="hover:text-blue-600 transition-colors"
              >+1 (234) 567-890</a
            >
          </p>
          <p>
            Email:
            <a
              href="mailto:info@myshop.com"
              class="hover:text-blue-600 transition-colors"
              >info@myshop.com</a
            >
          </p>
        </address>
      </div>

      <!-- Социальные сети -->
      <div>
        <h3 class="text-lg font-semibold mb-4">
          {{ $t("follow-us") || "Follow Us" }}
        </h3>
        <div class="flex space-x-4">
          <a
            href="#"
            aria-label="Facebook"
            class="hover:text-blue-600 transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M22 12a10 10 0 10-11.5 9.87v-6.99h-2.2v-2.88h2.2v-2.2c0-2.17 1.3-3.37 3.3-3.37.96 0 1.96.17 1.96.17v2.15h-1.1c-1.08 0-1.42.67-1.42 1.36v1.9h2.42l-.39 2.88h-2.03v6.99A10 10 0 0022 12z"
              />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Twitter"
            class="hover:text-blue-600 transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.96-2.48 9.14 9.14 0 01-2.9 1.1 4.52 4.52 0 00-7.7 4.12A12.86 12.86 0 013 4.6a4.52 4.52 0 001.4 6.04 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.5 4.5 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.05 9.05 0 012 19.54a12.75 12.75 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.42-.02-.63A9.18 9.18 0 0023 3z"
              />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            class="hover:text-blue-600 transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37a4 4 0 11-4.73-4.73 4 4 0 014.73 4.73z" />
              <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div
      class="border-t mt-8 py-4 text-center text-sm select-none"
    >
      &copy; {{ new Date().getFullYear() }} MyShop. All rights reserved.
    </div>
  </footer>
</template>
