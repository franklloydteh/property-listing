<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from "vue-router";
import PropertyClient from "@/client/PropertyClient";

const route = useRoute();
const properties = ref<any[]>([]);

watch(route, (to) => {
  PropertyClient.find(to.query).then(res => {
    console.log(res)
    properties.value = res.data;
  })
}, { flush: 'pre', immediate: true, deep: true })

</script>

<template>
  <div class="w-full flex justify-content-center align-content-center">
    <div class="card max-w-screen-lg w-full">

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
                <div class="card-image"
                     v-if="item.attributes.images && item.attributes.images.data && item.attributes.images.data.length"
                     :style="{  backgroundImage : 'url(' + item.attributes.images.data[0].attributes.formats.small.url+ ')' } "></div>
                <div class="card-image"
                     v-else
                     :style="{  backgroundImage : 'url(https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg)' } "></div>
              </div>
              <div class="flex justify-content-between align-items-center mb-3">
                <span class="text-900 font-medium text-xl">{{ item.attributes.street }}, {{
                    item.attributes.city
                  }}</span>
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
  </div>
</template>


<style scoped>
.card-image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  max-width: 100%;
  --div-width: 20vw;
  width: var(--div-width);
  height: calc(var(--div-width) * 3 / 4);
}

@media only screen and (max-width: 768px) {
  .card-image {
    --div-width: 78vw;
    width: var(--div-width);
    height: calc(var(--div-width) * 3 / 4);
  }
}

@media only screen and (max-width: 992px) and (min-width: 769px) {
  .card-image {
    --div-width: 38vw;
    width: var(--div-width);
    height: calc(var(--div-width) * 3 / 4);
  }
}
</style>
