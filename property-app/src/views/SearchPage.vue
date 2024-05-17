<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PropertyService } from "@/service/PropertyService";

const productService = new PropertyService();

const products = ref([]);
onMounted(() => {
  productService.getProductsSmall().then((data) => (products.value = data));
});

</script>

<template>
  <div class="card">

    <p class="mt-0 p-0 mb-5 text-700 text-2xl">Search Results</p>

    <div class="grid -mt-3 -ml-3 -mr-3">
      <div v-for="(product, i) in products" :key="i" class="col-12 md:col-6 lg:col-4">

        <router-link to="/property/1" class="p-2">
          <div class="shadow-2 p-4 surface-card border-round">
            <div class="relative mb-3">
              <span class="surface-card text-900 shadow-2 px-3 py-2 absolute border-round-3xl"
                    :style="{ left: '1rem', top: '1rem' }">
                {{ product.category }}
              </span>
              <img :src="'https://primefaces.org/cdn/primevue/images/product/'+product.image" class="w-full" :alt="i"/>
            </div>
            <div class="flex justify-content-between align-items-center mb-3">
              <span class="text-900 font-medium text-xl">{{product.address.street}}, {{product.address.city}}</span>
            </div>
            <p class="mt-0 mb-3 text-700 line-height-3">
              {{product.bedrooms}} Bedrooms
            </p>
            <span class="text-primary text-xl font-medium">${{ product.price }}</span>
          </div>
        </router-link>

      </div>
    </div>

  </div>
</template>
