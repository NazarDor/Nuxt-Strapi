<template>
  <div class="text-center">
    <div
      class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-[50vw] min-w-[100vw] overflow-hidden"
    >
      <div class="flex flex-col items-center justify-center">
        <div
          style="
            border-radius: 56px;
            padding: 0.3rem;
            background: linear-gradient(
              rgba(233, 30, 99, 0.4) 10%,
              rgba(33, 150, 243, 0) 30%
            );
          "
        >
          <div
            class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center"
            style="border-radius: 53px"
          >
            <div class="gap-4 flex flex-col items-center">
              <div
                class="flex justify-center items-center border-2 border-pink-500 rounded-full"
                style="height: 3.2rem; width: 3.2rem"
              >
                <i
                  class="pi pi-fw pi-exclamation-circle !text-2xl text-pink-500"
                ></i>
              </div>
              <h1
                class="text-surface-900 dark:text-surface-0 font-bold text-5xl mb-2"
              >
                404
              </h1>
              <span class="text-muted-color mb-8"
                >Requested resource is not available.</span
              >
              <div class="col-span-12 mt-8 text-center">
                <a
                  href="/"
                  class="p-button p-component p-button-danger"
                  aria-label="Go to Dashboard"
                  data-pc-name="button"
                  data-p-disabled="false"
                  data-p-severity="danger"
                  pc7130=""
                  data-pc-section="root"
                  ><span class="p-button-label" data-pc-section="label"
                    >Go to Dashboard</span
                  ></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NuxtLink to="/" class="text-blue-600 underline">Go back to Home</NuxtLink>
  </div>
</template>
  
  <script setup>
</script>
  