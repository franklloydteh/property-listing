<script setup lang="ts">

import { useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { RegistrationValidator } from "@/validators/RegistrationValidator";
import AuthClient from "@/client/AuthClient";

const router = useRouter();

function navigateToLogin() {
  router.push({ path: '/login' })
}

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(RegistrationValidator),
});

const [usernameField, usernameAttrs] = defineField('username');
const [emailField, emailAttrs] = defineField('email');
const [passwordField, passwordAttrs] = defineField('password');
const [repeatField, repeatAttrs] = defineField('repeat_password');
const [firstNameField, firstNameAttrs] = defineField('firstName');
const [lastNameField, lastNameAttrs] = defineField('lastName');
const [confirmField, confirmAttrs] = defineField('confirm');

const onSubmit = handleSubmit(data => {

  AuthClient.register(data)
      .then(res => {
        console.log(res)
        router.push('/my/profile')
      })
      .catch(function (error) {
        console.log('Registration failed', error);
        alert('Registration Failed')
      });
});

</script>

<template>
  <div class="px-5 min-h-screen flex justify-content-center align-items-start">
    <div class="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">

      <div class="mb-4">
        <div class="text-900 text-2xl font-bold mb-2">Register</div>
      </div>

      <form @submit.prevent="onSubmit" class="p-fluid">

        <div class="field">
          <label for="inputtext">Username</label>
          <InputText v-model="usernameField" v-bind="usernameAttrs" :invalid="!!errors['username']"/>
          <p class="text-red-200"> {{ errors["username"] }} </p>
        </div>

        <div class="field">
          <label for="inputtext">Email</label>
          <InputText v-model="emailField" v-bind="emailAttrs" :invalid="!!errors['email']"/>
          <p class="text-red-200"> {{ errors["email"] }} </p>
        </div>

        <div class="field">
          <label for="inputtext">First Name</label>
          <InputText v-model="firstNameField" v-bind="firstNameAttrs" :invalid="!!errors['firstName']"/>
          <p class="text-red-200"> {{ errors["firstName"] }} </p>
        </div>

        <div class="field">
          <label for="inputtext">Last Name</label>
          <InputText v-model="lastNameField" v-bind="lastNameAttrs" :invalid="!!errors['lastName']"/>
          <p class="text-red-200"> {{ errors["lastName"] }} </p>
        </div>

        <div class="field">
          <label for="inputtext">Password</label>
          <InputText type="password" v-model="passwordField" v-bind="passwordAttrs" :invalid="!!errors['password']"/>
          <p class="text-red-200"> {{ errors["password"] }} </p>
        </div>

        <div class="field">
          <label for="inputtext">Repeat Password</label>
          <InputText type="password" v-model="repeatField" v-bind="repeatAttrs" :invalid="!!errors['repeat_password']"/>
          <p class="text-red-200"> {{ errors["repeat_password"] }} </p>
        </div>

        <div class="mb-4 flex flex-wrap">
          <Checkbox name="checkbox" v-model="confirmField" v-bind="confirmAttrs"
                    :invalid="!!errors['confirm']"
                    class="mr-2" binary>
          </Checkbox>
          <label for="checkbox" class="text-900 font-medium mr-2"> I have read the </label>
          <a class="text-600 cursor-pointer hover:text-primary cursor-pointer">Terms and Conditions</a>
          <p class="text-red-200"> {{ errors["confirm"] }} </p>
        </div>

        <Button label="Sign Up" type="submit" class="w-full mb-4"></Button>

        <span class="font-medium text-600"> Already have an account? <a
            class="font-semibold cursor-pointer text-900 hover:text-primary transition-colors transition-duration-300"
            @click="navigateToLogin()">Login</a> </span>
      </form>

    </div>
  </div>
</template>
