<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
import { useAuth } from "~/composables/useAuth";
const { logout } = useAuth();
</script>

<template>
  <div>
    <h1>Админ панель</h1>
    <button @click="logout">Выйти</button>
  </div>
</template>
