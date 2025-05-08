<template>
  <div
    class="max-w-4xl mx-auto mt-16 px-4 text-center rounded-2xl shadow-xl pb-16"
  >
    <h1
      class="text-4xl font-extrabold mb-8 tracking-tight drop-shadow"
    >
      {{ aboutData.data?.title }}
    </h1>
    <div v-for="block in aboutData.data?.blocks" :key="block.id">
      <!-- Rich Text Block -->
      <div
        v-if="block.__component === 'shared.rich-text'"
        class="prose prose-lg mx-auto mb-12 text-left leading-relaxed"
      >
        <p
          v-for="(paragraph, index) in block.body.split('\n\n')"
          :key="index"
          class="mb-6"
        >
          {{ paragraph }}
        </p>
      </div>

      <div
        v-if="block.__component === 'shared.slider'"
        class="relative mb-12 m-2 p-2"
      >
        <div
          class="flex gap-2 px-2 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          <div
            v-for="file in block.files"
            :key="file.id"
            class="flex-shrink-0 snap-center bg-gray-50 rounded-xl shadow-md p-4 m-5 transition hover:scale-105 duration-200"
            style="min-width: 320px; max-width: 400px"
          >
            <img
              :src="`http://localhost:1337${file.url}`"
              :alt="file.alternativeText"
              class="w-full h-56 object-cover rounded-lg shadow"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: aboutData } = await useFetch(
  "http://localhost:1337/api/about?populate[blocks][populate]=*"
);
</script>

<style scoped>
.snap-x {
  scroll-snap-type: x mandatory;
}
.snap-center {
  scroll-snap-align: center;
}
.scrollbar-thin {
  scrollbar-width: thin;
}
.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 8px;
}
.scrollbar-track-gray-100::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 8px;
}
::-webkit-scrollbar {
  height: 10px;
  background: #f3f4f6;
  border-radius: 8px;
}
</style>
