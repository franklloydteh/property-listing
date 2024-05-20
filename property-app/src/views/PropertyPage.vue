<script setup lang="ts">
import { ref } from 'vue';
import PropertyClient from "@/client/PropertyClient";
import { useRoute } from "vue-router";
import OwnerClient from "@/client/OwnerClient";

const route = useRoute();
const property = ref();
const owner = ref();
const message = ref('Hi, I am interested in...');

PropertyClient.findOne(route.params.id).then(res => {
  property.value = res.data.attributes;
});

OwnerClient.findByProperty(route.params.id).then(res => {
  owner.value = res.data;
});

function sendMessage() {
  if (confirm("Are you sure you want to message?")) {
    OwnerClient.messageForProperty(route.params.id, message.value);
  }
}

</script>

<template>
  <div class="card" v-if="property">
    <div class="grid mb-7">

      <div class="col-12 lg:col-7">
        <Galleria :value="property.images.data" :numVisible="6"
                  :circular="true" containerStyle="max-width: 800px; margin: auto">
          <template #item="slotProps">
            <div class="carousel-main-image"
                 :style="{  backgroundImage : 'url(' + slotProps.item.attributes.formats.medium.url  + ')' } "></div>
          </template>
          <template #thumbnail="slotProps">
            <div class="carousel-thumb-image"
                 :style="{  backgroundImage : 'url(' + slotProps.item.attributes.formats.thumbnail.url + ')' } "></div>
          </template>
        </Galleria>
      </div>

      <div class="col-12 lg:col-4 py-3 lg:pl-6">

        <div class="flex align-items-center text-3xl font-medium text-900 mb-4">
          {{ property.category }} in {{ property.city }}
        </div>

        <div class="flex flex-column mb-5">
          <p class="text-900 font-bold text-2xl mb-0">${{ property.price.toLocaleString() }}</p>
          <span class="text-900 text-xl">{{ property.area }}m<sup>2</sup></span>
        </div>

        <ul class="p-0 m-0 flex flex-column text-600">
          <li class="flex block mr-2 mb-3">
            <p>{{ property.bedrooms }} Bedroom</p>
          </li>
          <li class="flex block mb-3">
            <p>{{ property.bathrooms }} Bathroom</p>
          </li>
          <li class="flex block mb-3 mr-2">
            <p>{{ property.parking }} Parking</p>
          </li>
        </ul>

        <p class="text-900 font-bold mt-3 mb-1">Owner</p>
        <div class="inline-flex align-items-center mb-1">
          <span class="text-xl" v-if="owner">{{ owner.firstName }} {{ owner.lastName }}</span>
        </div>
        <Textarea class="w-full" rows="3" v-model="message">
        </Textarea>
        <Button class="w-full flex justify-content-center" @click="sendMessage()">Send Message to Owner</Button>


      </div>

    </div>

    <div class="text-900 font-bold text-3xl mb-4 mt-2">Address</div>
    <p class="text-600 p-0 mb-0">
      {{ property.street }},
      {{ property.city }} City,
    </p>
    <p class="text-600 p-0 mb-0">
      {{ property.region }},
      {{ property.country }}
    </p>
    <p class="text-600 p-0 mb-5">
      {{ property.zipCode }}
    </p>

    <div class="text-900 font-bold text-3xl mb-4 mt-2">Property Details</div>
    <span class="line-height-3 text-600 p-0 mx-0 mt-0 mb-4" style="white-space: pre-line;">
       {{ property.description }}
    </span>


  </div>
</template>

<style scoped>
.carousel-main-image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  max-width: 100%;
  --div-width: 50vw;
  width: var(--div-width);
  height: calc(var(--div-width) * 3 / 4);
}

@media only screen and (max-width: 992px) {
  .carousel-main-image {
    --div-width: 80vw;
    width: var(--div-width);
    height: calc(var(--div-width) * 3 / 4);
  }
}

.carousel-thumb-image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  max-width: 100%;
  --div-width: 10vw;
  width: var(--div-width);
  height: calc(var(--div-width) * 3 / 4);
}
</style>
