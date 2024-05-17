<script setup>
import { ref } from 'vue';

const product = ref({
  "id": "1000",
  "description": "Product Description",
  "image": "bamboo-watch.jpg",
  "price": 65000,
  "category": "Apartment",
  "area": 100,
  "bedrooms": 2,
  "bathrooms": 1,
  "parking": 1,
  "address": {
    "street": "Maria Benlliure",
    "city": "Gandia",
    "region": "Velencia",
    "country": "Spain",
    "zipCode": 22911
  },
  "status": "PUBLISHED"
});

const selectedCategory = ref(null);
const categoryOptions = ['House', 'Apartment', 'Building', 'Storage Room', 'Land'];
const fileUploaderRef = ref();
const uploadFiles = ref([]);
const onChooseUploadFiles = () => {
  fileUploaderRef.value.choose();
};
const onSelectedFiles = (event) => {
  uploadFiles.value = event.files;
};
const onRemoveFile = (removeFile) => {
  uploadFiles.value = uploadFiles.value.filter((file) => file.name !== removeFile.name);
};

</script>

<template>
  <div class="card">
    <span class="block text-900 font-bold text-3xl mb-4">List Your Property</span>
    <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">

      <div class="col-12 lg:col-8">
        <div class="grid formgrid">

          <span class="block text-900 font-bold text-xl col-12 pt-2 pb-4">Property Details</span>

          <div class="col-12 lg:col-4 field">
            <label for="price" class="font-medium text-900"> Price </label>
            <InputText type="number" placeholder="Price" label="price" v-model="product.price"/>
          </div>

          <div class="col-12 lg:col-4 field">
            <label for="area" class="font-medium text-900"> Area in m<sup>2</sup> </label>
            <InputText type="number" placeholder="Area" label="area" v-model="product.area"/>
          </div>

          <div class="col-12 lg:col-4 field">
            <label for="category" class="font-medium text-900"> Category </label>
            <Dropdown :options="categoryOptions" v-model="product.category" placeholder="Select a category"></Dropdown>
          </div>

          <div class="col-12 lg:col-4 field">
            <label for="bedrooms" class="font-medium text-900"> Bedrooms </label>
            <InputText type="number" placeholder="No. of Bedrooms" label="bedrooms" v-model="product.bedrooms"/>
          </div>

          <div class="col-12 lg:col-4 field">
            <label for="bathrooms" class="font-medium text-900"> Bathrooms </label>
            <InputText type="number" placeholder="No. of Bedrooms" label="bathrooms" v-model="product.bathrooms"/>
          </div>

          <div class="col-12 lg:col-4 field">
            <label for="parking" class="font-medium text-900"> Parking </label>
            <InputText type="number" placeholder="No. of Parking Slots" label="parking" v-model="product.parking"/>
          </div>

          <div class="field col-12">
            <label for="description" class="font-medium text-900"> Property Description </label>
            <Textarea id="description" type="text"  autoResize
                      v-model="product.description"
                      placeholder="Inform the buyer of the nice features and disclose any negatives."></Textarea>
          </div>

          <span class="block text-900 font-bold text-xl col-12  pt-2 pb-4">Property Address</span>

          <div class="col-12 lg:col-4 field">
            <label for="street" class="font-medium text-900"> Street </label>
            <InputText type="text" label="street" v-model="product.address.street"/>
          </div>

          <div class="col-12 lg:col-4 field">
            <label for="city" class="font-medium text-900"> City </label>
            <InputText type="text" label="city" v-model="product.address.city"/>
          </div>

          <div class="col-12 lg:col-4 field">
            <label for="region" class="font-medium text-900"> Region </label>
            <InputText type="text" label="region" v-model="product.address.region"/>
          </div>

          <div class="col-12 lg:col-4 field">
            <label for="zipCode" class="font-medium text-900"> Zip Code </label>
            <InputText type="text" label="zipCode" v-model="product.address.zipCode"/>
          </div>

          <div class="col-12 lg:col-4 field">
            <label for="country" class="font-medium text-900"> Country </label>
            <InputText type="text" label="country" v-model="product.address.country"/>
          </div>

          <span class="block text-900 font-bold text-xl col-12 pt-2 pb-4">Photos</span>

          <div class="col-12 mt-3">
            <FileUpload
                ref="fileUploaderRef"
                id="files-fileupload"
                name="demo[]"
                accept="image/*"
                customUpload
                multiple
                auto
                class="border-1 surface-border surface-card p-0 border-round"
                :maxFileSize="1000000"
                @select="onSelectedFiles"
                :pt="{ buttonbar: { class: 'hidden' }, root: { style: { backgroundColor: 'rgba(255, 255, 255, 0.05)' } }  }"
            >
              <template v-if="uploadFiles.length > 0" #content>
                <div class="h-20rem m-1 border-round">
                  <div v-for="file in uploadFiles" :key="file.name" class="w-full relative border-round p-0"
                       :style="{ cursor: 'copy' }">
                    <div
                        class="remove-file-wrapper h-full relative border-3 border-transparent border-round hover:bg-primary transition-duration-100 cursor-auto">
                      <img :src="file.objectURL" :alt="file.name" class="w-full border-round"/>
                      <Button
                          icon="pi pi-times"
                          class="remove-button text-sm absolute justify-content-center align-items-center cursor-pointer"
                          rounded
                          :style="{ top: '-10px', right: '-10px', display: 'none', width: '3rem' }"
                          @click="onRemoveFile(file)"
                      ></Button>
                    </div>
                  </div>
                </div>
              </template>
              <template #empty>
                <div v-if="uploadFiles.length < 1" class="h-20rem m-1 border-round">
                  <div @click="onChooseUploadFiles"
                       class="flex flex-column w-full h-full justify-content-center align-items-center cursor-pointer"
                       :style="{ cursor: 'copy' }">
                    <i class="pi pi-fw pi-file text-4xl text-primary"></i>
                    <span class="block font-semibold text-900 text-lg mt-3">Drop or select a cover image</span>
                  </div>
                </div>
              </template>
            </FileUpload>
          </div>
        </div>
      </div>

      <div class="flex-1 w-full lg:w-3 xl:w-4 flex flex-column row-gap-3">
        <div class="border-1 surface-border border-round">
          <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Publish</span>
          <div class="p-3">
            <div class="surface-100 py-2 px-3 flex align-items-center border-round">
              <span class="text-black-alpha-90 font-bold mr-3">Status:</span>
              <span class="text-black-alpha-60 font-semibold">Draft</span>
              <Button type="button" icon="pi pi-fw pi-pencil" class="ml-auto" text rounded></Button>
            </div>
          </div>
        </div>

        <div class="flex justify-content-between gap-3">
          <Button class="flex-1" severity="danger" outlined label="Discard" icon="pi pi-fw pi-trash"></Button>
          <Button class="flex-1" label="Publish" icon="pi pi-fw pi-check"></Button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.remove-file-wrapper:hover {
  .remove-button {
    display: flex !important;
  }
}
</style>