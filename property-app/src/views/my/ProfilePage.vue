<script setup lang="ts">
import { ref } from 'vue';

const countries = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' }
]);
const selectedCountry = ref(null);
</script>

<template>
  <div class="card">
    <span class="text-900 text-xl font-bold mb-4 block">Create Profile</span>
    <div class="grid">
      <div class="col-12 lg:col-2">
        <p class="m-0 p-0 text-600 line-height-3 mr-3">
          This information will only be shown when you contact an advertiser or publish a listing on Realista.
        </p>
      </div>
      <div class="col-12 lg:col-10">
        <div class="grid formgrid p-fluid">
          <div class="field mb-4 col-12 md:col-6">
            <label for="firstName" class="font-medium text-900"> First Name </label>
            <InputText id="firstName" type="text"/>
          </div>
          <div class="field mb-4 col-12 md:col-6">
            <label for="lastName" class="font-medium text-900"> Last Name </label>
            <InputText id="lastName" type="text"/>
          </div>
          <div class="field mb-4 col-12">
            <label for="avatar" class="font-medium text-900"> Avatar </label>
            <FileUpload mode="basic" name="avatar" customUpload accept="image/*" :maxFileSize="1000000"
                        chooseLabel="Upload Image" class="p-button-outlined p-button-plain"></FileUpload>
          </div>
          <div class="field mb-4 col-12">
            <label for="bio" class="font-medium text-900"> Self Introduction </label>
            <Textarea id="bio" type="text" :rows="5" autoResize
                      placeholder="Please give a brief background of yourself.">
            </Textarea>
          </div>
          <div class="field mb-4 col-12 md:col-6">
            <label for="email" class="font-medium text-900"> Email </label>
            <InputText id="email" type="text"/>
          </div>
          <div class="field mb-4 col-12 md:col-6">
            <label for="mobile" class="font-medium text-900"> Mobile Number </label>
            <InputText id="mobile" type="text"/>
          </div>
          <div class="field mb-4 col-12 md:col-6">
            <label for="country" class="font-medium text-900"> Country </label>
            <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" :filter="true"
                      placeholder="Select a Country" :showClear="true">
              <template #value="slotProps">
                <div class="flex align-items-center" v-if="slotProps.value">
                  <span :class="`mr-2 flag flag-${selectedCountry.code.toLowerCase()}`"
                        style="width: 18px; height: 12px"/>
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <span :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                        style="width: 18px; height: 12px"/>
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="field mb-4 col-12 md:col-6">
            <label for="city" class="font-medium text-900"> City </label>
            <InputText id="city" type="text"/>
          </div>
          <div class="col-12">
            <Button label="Save Profile" class="w-auto mt-3"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
