<script setup lang="ts" xmlns="http://www.w3.org/1999/html">

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ProfileValidator } from "@/validators/ProfileValidator";
import UserClient from "@/client/UserClient";

const { errors, defineField, handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(ProfileValidator)
});

const countries = ['Spain', 'Philippines']

UserClient.me().then(res => {
  setValues(res.data)
})

const [firstNameField, firstNameAttrs] = defineField('firstName');
const [lastNameField, lastNameAttrs] = defineField('lastName');
const [introductionField, introductionAttrs] = defineField('introduction');
const [mobileField, mobileAttrs] = defineField('mobile');
const [cityField, cityAttrs] = defineField('city');
const [countryField, countryAttrs] = defineField('country');

const onSubmit = handleSubmit(data => {
  UserClient.updateMe(data)
      .then(res => {
        alert("Successful Update.")
      })
      .catch(function (error) {
        alert('Update Failed')
      });
});

</script>

<template>
  <div class="w-full flex justify-content-center align-content-center">
    <div class="card max-w-screen-lg">
      <span class="text-900 text-xl font-bold mb-4 block">Update Profile</span>
      <div class="grid">

        <div class="col-12 lg:col-3">
          <p class="m-0 p-0 text-600 line-height-3 mr-3 mb-8">
            This information will only be shown when you contact an advertiser or publish a listing on Realista.
          </p>

          <div class="field w-full">
            <label for="avatar" class="font-medium text-900"> Photo </label>
            <FileUpload mode="basic" customUpload accept="image/*" :maxFileSize="1000000"
                        chooseLabel="Upload New Photo" class="p-button-outlined p-button-plain"></FileUpload>
          </div>
        </div>

        <div class="col-12 lg:col-9">
          <form @submit.prevent="onSubmit" class="grid formgrid p-fluid">

            <div class="field mb-4 col-12 md:col-6">
              <label for="firstName" class="font-medium text-900"> First Name </label>
              <InputText v-model="firstNameField" v-bind="firstNameAttrs" type="text"/>
              <p class="text-red-200">&nbsp; {{ errors['firstName'] }}</p>
            </div>

            <div class="field mb-4 col-12 md:col-6">
              <label for="lastName" class="font-medium text-900"> Last Name </label>
              <InputText v-model="lastNameField" v-bind="lastNameAttrs" type="text"/>
              <p class="text-red-200">&nbsp; {{ errors['lastName'] }}</p>
            </div>

            <div class="field mb-4 col-12 md:col-6">
              <label for="mobile" class="font-medium text-900"> Mobile Number </label>
              <InputText v-model="mobileField" v-bind="mobileAttrs" type="text"/>
              <p class="text-red-200">&nbsp; {{ errors['mobile'] }}</p>
            </div>

            <div class="field mb-4 col-12">
              <label for="bio" class="font-medium text-900"> Self Introduction </label>
              <Textarea id="bio" type="text" :rows="5" autoResize
                        v-model="introductionField" v-bind="introductionAttrs"
                        placeholder="Please give a brief background of yourself.">
            </Textarea>
              <p class="text-red-200">&nbsp; {{ errors['introduction'] }}</p>
            </div>


            <div class="field mb-4 col-12 md:col-6">
              <label for="country" class="font-medium text-900"> Country </label>
              <Dropdown v-model="countryField" v-bind="countryAttrs" :options="countries" :showClear="true">
              </Dropdown>
              <p class="text-red-200">&nbsp; {{ errors['country'] }}</p>
            </div>

            <div class="field mb-4 col-12 md:col-6">
              <label for="city" class="font-medium text-900"> City </label>
              <InputText v-model="cityField" v-bind="cityAttrs" type="text"/>
              <p class="text-red-200">&nbsp; {{ errors['city'] }}</p>
            </div>

            <div class="col-12">
              <Button type="submit" label="Save Profile" class="w-auto mt-3"></Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>
