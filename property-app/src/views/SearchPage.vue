<script setup>
import { ref, watch } from 'vue';
import { useRoute } from "vue-router";
import PropertyClient from "@/client/PropertyClient";

const route = useRoute();
const properties = ref([]);

watch(route, (to) => {
  PropertyClient.find(to.query).then(res => {
    console.log(res)
    properties.value = res.data;
  })
}, { flush: 'pre', immediate: true, deep: true })

</script>

<template>
  <div class="card">

    <p class="mt-0 p-0 mb-5 text-700 text-2xl">Search Results</p>

    <div class="grid -mt-3 -ml-3 -mr-3">
      <div v-for="(item, i) in properties" :key="i" class="col-12 md:col-6 lg:col-4">

        <router-link :to="'/property/' + item.id" class="p-2">
          <div class="shadow-2 p-4 surface-card border-round">
            <div class="relative mb-3">
              <span class="surface-card text-900 shadow-2 px-3 py-2 absolute border-round-3xl"
                    :style="{ left: '1rem', top: '1rem' }">
                {{ item.attributes.category }}
              </span>
              <img :src="'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg' " class="w-full"
                   :alt="i"/>
            </div>
            <div class="flex justify-content-between align-items-center mb-3">
              <span class="text-900 font-medium text-xl">{{ item.attributes.street }}, {{ item.attributes.city }}</span>
            </div>
            <p class="mt-0 mb-3 text-700 line-height-3">
              {{ item.attributes.bedrooms }} Bedrooms
            </p>
            <span class="text-primary text-xl font-medium">${{ item.attributes.price.toLocaleString() }}</span>
          </div>
        </router-link>

      </div>
    </div>

  </div>
</template>
