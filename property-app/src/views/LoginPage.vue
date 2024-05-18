<script setup lang="ts">


import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { LoginValidator } from "@/validators/LoginValidator";
import AuthClient from "@/client/AuthClient";

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(LoginValidator),
});

const [identifierField, identifierAttrs] = defineField('identifier');
const [passwordField, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(data => {

  AuthClient.login(data.identifier, data.password)
      .then(res => {
        window.location.href = '/';
      })
      .catch(function (error) {
        console.log('Login failed', error);
        alert('Login Failed')
      });
});
</script>

<template>
  <div class="px-5 min-h-screen flex justify-content-center align-items-start">
    <div class="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
      <div class="mb-4">
        <div class="text-900 text-xl font-bold mb-2">Log in</div>
        <span class="text-600 font-medium">Please enter your credentials</span>
      </div>

      <form @submit.prevent="onSubmit" class="flex flex-column">

        <IconField iconPosition="left" class="w-full mb-1">
          <InputIcon class="pi pi-envelope"/>
          <InputText v-model="identifierField" v-bind="identifierAttrs"
                     type="text" class="w-full md:w-25rem" placeholder="Email or Username"/>
        </IconField>
        <p class="text-red-200 mb-2"> &nbsp; {{ errors["identifier"] }} </p>

        <IconField iconPosition="left" class="w-full mb-1">
          <InputIcon class="pi pi-lock"/>
          <InputText v-model="passwordField" v-bind="passwordAttrs"
                     type="password" class="w-full md:w-25rem" placeholder="Password"/>
        </IconField>
        <p class="text-red-200 mb-2"> &nbsp; {{ errors["password"] }} </p>

        <!--        <div class="mb-4 flex flex-wrap gap-3">-->
        <!--          <div>-->
        <!--            <label for="checkbox" class="text-900 font-medium mr-8"> Remember Me </label>-->
        <!--          </div>-->
        <!--          <a class="text-600 cursor-pointer hover:text-primary cursor-pointer ml-auto transition-colors transition-duration-300">Reset-->
        <!--            password</a>-->
        <!--        </div>-->

        <Button type="submit" label="Log In" class="w-full"></Button>
      </form>

    </div>
  </div>
</template>
