<script setup>
import { onMounted, ref } from 'vue';

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { PropertyValidator } from "@/validators/PropertyValidator";
import PropertyClient from "@/client/PropertyClient";
import { useRoute, useRouter } from 'vue-router'

const countries = ['Spain', 'Philippines']
const categoryOptions = ['House', 'Apartment', 'Building', 'Storage Room', 'Land'];
const status = ref('Draft');
const statusOptions = ['Published', 'Draft'];
const route = useRoute();
const router = useRouter();
const fileUploaderRef = ref();
const uploadFiles = ref([]);
let images = [];

const { errors, defineField, handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(PropertyValidator)
});

onMounted(() => {
  const propertyId = route.params.id;
  PropertyClient.findOne(propertyId).then(res => {
    setValues(res.data.attributes);
    if (res.data.attributes.publishedAt) {
      status.value = 'Published';
    }

    images = res.data.attributes.images.data;
    console.log(images)
    if (images) {
      images.forEach(img => {
        fetch(img.attributes.url)
            .then(async response => {
              const blob = await response.blob()
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = function () {
                const base64data = reader.result;
                uploadFiles.value.push({ id: img.id, name: img.attributes.name, base64data: base64data })
              }
            })
      });
    }

  });
});

const [descriptionField, descriptionAttrs] = defineField('description');
const [priceField, priceAttrs] = defineField('price');
const [categoryField, categoryAttrs] = defineField('category');
const [areaField, areaAttrs] = defineField('area');
const [bedroomsField, bedroomsAttrs] = defineField('bedrooms');
const [bathroomsField, bathroomsAttrs] = defineField('bathrooms');
const [parkingField, parkingAttrs] = defineField('parking');
const [streetField, streetAttrs] = defineField('street');
const [cityField, cityAttrs] = defineField('city');
const [regionField, regionAttrs] = defineField('region');
const [zipCodeField, zipCodeAttrs] = defineField('zipCode');
const [countryField, countryAttrs] = defineField('country');

const onSubmit = handleSubmit(data => {
  data.publishedAt = status.value === 'Draft' ? null : new Date();

  data.images = []; // I had to guess that its just images and not 'images.data'
  if (images && images.length)
    images.forEach(i => {
      if (uploadFiles.value.find(f => f.id === i.id)) {
        data.images.push({ id: i.id }) // It seems that it only needs the id
      }
    });
  console.log(data.images)


  const propertyId = route.params.id;
  PropertyClient.update(propertyId, data, uploadFiles.value)
      .then(res => {
        alert("Successfully Saved.")
      })
      .catch(function (error) {
        alert('Save Failed')
      });
});

function deleteProperty() {
  const propertyId = route.params.id;
  if (confirm("Are you sure you want to delete property?")) {
    PropertyClient.delete(propertyId).then(() => {
      router.push({ path: "/my/property/list" });
    })
  }

}


const onChooseUploadFiles = () => {
  fileUploaderRef.value.choose();
};
const onSelectedFiles = (event) => {
  event.files.forEach((f) => uploadFiles.value.push(f));
};
const onRemoveFile = (removeFile) => {
  uploadFiles.value = uploadFiles.value.filter((file) => file.name !== removeFile.name);
};

</script>

<template>
  <div class="w-full flex justify-content-center align-content-center">
    <form @submit.prevent="onSubmit" class="card max-w-screen-lg">

      <span class="block text-900 font-bold text-3xl mb-4">List Your Property</span>
      <div class="grid grid-nogutter flex-wrap gap-7 p-fluid">

        <div class="col-12 lg:col-8">
          <div class="grid formgrid">

            <span class="block text-900 font-bold text-xl col-12 pt-2 pb-4">Property Details</span>

            <div class="col-12 lg:col-4 field">
              <label for="price" class="font-medium text-900"> Price </label>
              <InputNumber v-model="priceField" v-bind="priceAttrs"/>
              <p class="text-red-200">&nbsp; {{ errors['price'] }}</p>
            </div>

            <div class="col-12 lg:col-4 field">
              <label for="area" class="font-medium text-900"> Area in m<sup>2</sup> </label>
              <InputNumber v-model="areaField" v-bind="areaAttrs"/>
              <p class="text-red-200">&nbsp; {{ errors['area'] }}</p>
            </div>

            <div class="col-12 lg:col-4 field">
              <label for="category" class="font-medium text-900"> Category </label>
              <Dropdown :options="categoryOptions"
                        v-model="categoryField" v-bind="categoryAttrs"
                        placeholder="Select a category"></Dropdown>
              <p class="text-red-200">&nbsp; {{ errors['category'] }}</p>
            </div>

            <div class="col-12 lg:col-4 field">
              <label for="bedrooms" class="font-medium text-900"> Bedrooms </label>
              <InputNumber v-model="bedroomsField" v-bind="bedroomsAttrs"/>
              <p class="text-red-200">&nbsp; {{ errors['bedrooms'] }}</p>
            </div>

            <div class="col-12 lg:col-4 field">
              <label for="bathrooms" class="font-medium text-900"> Bathrooms </label>
              <InputNumber v-model="bathroomsField" v-bind="bathroomsAttrs"/>
              <p class="text-red-200">&nbsp; {{ errors['bathrooms'] }}</p>
            </div>

            <div class="col-12 lg:col-4 field">
              <label for="parking" class="font-medium text-900"> Parking </label>
              <InputNumber v-model="parkingField" v-bind="parkingAttrs"/>
              <p class="text-red-200">&nbsp; {{ errors['parking'] }}</p>
            </div>

            <div class="field col-12">
              <label for="description" class="font-medium text-900"> Property Description </label>
              <Textarea id="description" type="text" autoResize rows="5"
                        v-model="descriptionField" v-bind="descriptionAttrs"
                        placeholder="Inform the buyer of the nice features and disclose any negatives."></Textarea>
              <p class="text-red-200">&nbsp; {{ errors['description'] }}</p>
            </div>

            <span class="block text-900 font-bold text-xl col-12  pt-2 pb-4">Property Address</span>

            <div class="col-12 lg:col-4 field">
              <label for="street" class="font-medium text-900"> Street </label>
              <InputText v-model="streetField" v-bind="streetAttrs" type="text"/>
              <p class="text-red-200">&nbsp; {{ errors['street'] }}</p>
            </div>

            <div class="col-12 lg:col-4 field">
              <label for="city" class="font-medium text-900"> City </label>
              <InputText v-model="cityField" v-bind="cityAttrs" type="text"/>
              <p class="text-red-200">&nbsp; {{ errors['city'] }}</p>
            </div>

            <div class="col-12 lg:col-4 field">
              <label for="region" class="font-medium text-900"> Region </label>
              <InputText v-model="regionField" v-bind="regionAttrs" type="text"/>
              <p class="text-red-200">&nbsp; {{ errors['region'] }}</p>
            </div>

            <div class="col-12 lg:col-4 field">
              <label for="zipCode" class="font-medium text-900"> Zip Code </label>
              <InputNumber v-model="zipCodeField" v-bind="zipCodeAttrs" :use-grouping="false"/>
              <p class="text-red-200">&nbsp; {{ errors['zipCode'] }}</p>
            </div>

            <div class="col-12 lg:col-4 field">
              <label for="country" class="font-medium text-900"> Country </label>
              <Dropdown :options="countries"
                        v-model="countryField" v-bind="countryAttrs"></Dropdown>
              <p class="text-red-200">&nbsp; {{ errors['country'] }}</p>
            </div>

            <span class="block text-900 font-bold text-xl col-12 pt-2 pb-4">Photos</span>

            <div class="col-12 mt-3">

              <div class="col-4 mb-5 pl-0">
                <Button @click="fileUploaderRef.choose()" label="Upload"></Button>
              </div>

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
                        <img :src="file.objectURL || file.base64data" :alt="file.name" class="w-full border-round"/>
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

        <div class="flex-1 w-full lg:w-3 xl:w-4 flex flex-column row-gap-6">
          <div class="border-1 surface-border border-round">
            <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Status</span>
            <div class="p-3">
              <Dropdown :options="statusOptions" v-model="status"></Dropdown>
            </div>
          </div>

          <div class="flex justify-content-between gap-3">
            <Button @click="deleteProperty()"
                    type="button" class="flex-1" severity="danger" outlined
                    label="Delete" icon="pi pi-fw pi-trash">
            </Button>
            <Button type="submit" class="flex-1"
                    label="Save" icon="pi pi-fw pi-check">
            </Button>
          </div>

        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.remove-file-wrapper:hover {
  .remove-button {
    display: flex !important;
  }
}
</style>