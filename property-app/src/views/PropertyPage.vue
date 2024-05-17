<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PropertyService } from "@/service/PropertyService";

const propertyService = new PropertyService();

const property = ref({ address: {} });
onMounted(() => {
  propertyService.getProductsSmall().then((data) => (property.value = data[0]));
});

const images = [
  {
    "itemImageSrc": "/demo/images/galleria/galleria1.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria1s.jpg",
    "alt": "Description for Image 1",
    "title": "Title 1"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria2.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria2s.jpg",
    "alt": "Description for Image 2",
    "title": "Title 2"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria3.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria3s.jpg",
    "alt": "Description for Image 3",
    "title": "Title 3"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria4.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria4s.jpg",
    "alt": "Description for Image 4",
    "title": "Title 4"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria5.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria5s.jpg",
    "alt": "Description for Image 5",
    "title": "Title 5"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria6.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria6s.jpg",
    "alt": "Description for Image 6",
    "title": "Title 6"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria7.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria7s.jpg",
    "alt": "Description for Image 7",
    "title": "Title 7"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria8.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria8s.jpg",
    "alt": "Description for Image 8",
    "title": "Title 8"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria9.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria9s.jpg",
    "alt": "Description for Image 9",
    "title": "Title 9"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria10.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria10s.jpg",
    "alt": "Description for Image 10",
    "title": "Title 10"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria11.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria11s.jpg",
    "alt": "Description for Image 11",
    "title": "Title 11"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria12.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria12s.jpg",
    "alt": "Description for Image 12",
    "title": "Title 12"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria13.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria13s.jpg",
    "alt": "Description for Image 13",
    "title": "Title 13"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria14.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria14s.jpg",
    "alt": "Description for Image 14",
    "title": "Title 14"
  },
  {
    "itemImageSrc": "/demo/images/galleria/galleria15.jpg",
    "thumbnailImageSrc": "/demo/images/galleria/galleria15s.jpg",
    "alt": "Description for Image 15",
    "title": "Title 15"
  }
]

</script>

<template>
  <div class="card">
    <div class="grid mb-7">

      <div class="col-12 lg:col-7">
        <Galleria :value="images" :numVisible="6"
                  :circular="true" containerStyle="max-width: 800px; margin: auto">
          <template #item="slotProps">
            <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block"/>
          </template>
          <template #thumbnail="slotProps">
            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;"/>
          </template>
        </Galleria>
      </div>

      <div class="col-12 lg:col-4 py-3 lg:pl-6">

        <div class="flex align-items-center text-3xl font-medium text-900 mb-4">
          {{ property.category }} in {{ property.address.city }}
        </div>

        <div class="flex flex-column mb-5">
          <p class="text-900 font-bold text-2xl mb-0">${{ property.price }}</p>
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

        <p class="text-900 font-bold mt-3 mb-4">Owner</p>
        <div class="inline-flex align-items-center">
          <img src="/demo/images/avatar/circle/avatar-f-4.png" class="w-4rem mr-4"/>
          <span class="text-2xl">Frank Lloyd Teh</span>
        </div>
        <Textarea class="w-full" rows="3"></Textarea>
        <Button class="w-full flex justify-content-center">Send Message to Owner</Button>


      </div>

    </div>

    <div class="text-900 font-bold text-3xl mb-4 mt-2">Address</div>
    <p class="text-600 p-0 mb-0">
      {{ property.address.street }},
      {{ property.address.city }} City,
    </p>
    <p class="text-600 p-0 mb-0">
      {{ property.address.region }},
      {{ property.address.country }}
    </p>
    <p class="text-600 p-0 mb-5">
      {{ property.address.zipCode }}
    </p>

    <div class="text-900 font-bold text-3xl mb-4 mt-2">Property Details</div>
    <span class="line-height-3 text-600 p-0 mx-0 mt-0 mb-4" style="white-space: pre-line;">
       {{ property.description }}
    </span>


  </div>
</template>
