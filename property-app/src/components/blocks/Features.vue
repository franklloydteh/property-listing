<script setup lang="ts">
const props = defineProps(['data'])

</script>

<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">

    <div class="mb-3 font-bold text-3xl mb-6">
      <span class="text-900">{{ data.header }}</span>
    </div>

    <div class="grid">

      <div v-for="feature in data.features" class="col-12 md:col-4 mb-4 px-5">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                <i class="pi text-4xl text-blue-500" :class="['pi-'+feature.icon]"></i>
            </span>
        <div class="text-900 text-xl mb-3 font-medium">
          {{ feature.header }}
        </div>
        <span class="text-700 line-height-3">
          {{ feature.description }}
        </span>
      </div>

    </div>
  </div>
</template>
