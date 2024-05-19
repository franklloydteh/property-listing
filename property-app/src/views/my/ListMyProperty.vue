<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PropertyService } from '@/service/PropertyService';
import { useRouter } from "vue-router";
import PropertyClient from "@/client/PropertyClient";


const dataviewValue = ref<any>(null);
const layout = ref<"grid" | "list" | undefined>('list');
const sortOrder = ref(1);
const sortField = ref("id");

const productService = new PropertyService();
const router = useRouter();

onMounted(() => {
  PropertyClient.findMine().then(res => {
    dataviewValue.value = res.data
  })
});

function update(item) {
  router.push({ path: `/my/property/${item.id}` })
}

function newListing() {
  router.push({ path: '/my/property/create' })
}

</script>

<template>
  <div class="w-full flex flex-column align-items-center">

    <div class="w-full max-w-screen-lg flex justify-content-end" style="padding: 14px">
      <Button icon="pi pi-plus" label="List Property"
              @click="newListing()"
              class="max-w-12rem white-space-nowrap">
      </Button>
    </div>

    <div class="grid max-w-screen-lg">
      <div class="col-12">
        <div class="card">
          <h5>My Properties</h5>

          <DataView :value="dataviewValue"
                    :layout="layout" :paginator="false" :sortOrder="sortOrder"
                    :sortField="sortField"
                    :dataKey="'id'">

            <template #list="slotProps">
              <div class="grid grid-nogutter">
                <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                  <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
                       :class="{ 'border-top-1 surface-border': index !== 0 }">

                    <div class="md:w-10rem relative">
                      <div class="card-image"
                           v-if="item.images && item.images && item.images.length"
                           :style="{  backgroundImage : 'url(' + item.images[0].formats.thumbnail.url+ ')' } "></div>
                      <div class="card-image"
                           v-else
                           :style="{  backgroundImage : 'url(https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg)' } "></div>
                    </div>

                    <div
                        class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                      <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                        <div>
                          <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                          <div class="text-lg font-medium text-900 mt-2">
                            {{ item.street }}, {{ item.city }}, {{ item.country }}
                          </div>
                          <span class="text-900 font-medium text-sm">{{ item.area }} m<sup>2</sup></span>
                        </div>
                      </div>

                      <div class="flex flex-column md:align-items-end gap-5">
                        <span class="text-xl font-semibold text-900">${{ item.price.toLocaleString() }}</span>
                        <div class="flex flex-row-reverse md:flex-row gap-2">
                          <Button v-if="!item.publishedAt" label="Draft"
                                  disabled severity="contrast"
                                  outlined>
                          </Button>
                          <Button v-if="item.publishedAt" label="Published"
                                  disabled severity="primary"
                                  outlined>
                          </Button>
                          <Button icon="pi pi-pencil" label="Update"
                                  @click="update(item)"
                                  class="flex-auto md:flex-initial white-space-nowrap">
                          </Button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </template>

          </DataView>
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
  --div-width: 140px;
  width: var(--div-width);
  height: calc(var(--div-width) * 3 / 4);
}

</style>