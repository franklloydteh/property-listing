<script setup lang="ts">
</script>

<template>
  <div class="px-5 min-h-screen flex justify-content-center align-items-start">
    <div class="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
      <div class="mb-4">
        <div class="text-900 text-xl font-bold mb-2">Log in</div>
        <span class="text-600 font-medium">Please enter your details</span>
      </div>
      <div class="flex flex-column">
        <IconField iconPosition="left" class="w-full mb-4">
          <InputIcon class="pi pi-envelope"/>
          <InputText id="email" type="text" class="w-full md:w-25rem" placeholder="Email"/>
        </IconField>

        <IconField iconPosition="left" class="w-full mb-4">
          <InputIcon class="pi pi-lock"/>
          <InputText id="password" type="password" class="w-full md:w-25rem" placeholder="Password"/>
        </IconField>
        <div class="mb-4 flex flex-wrap gap-3">
          <div>
            <label for="checkbox" class="text-900 font-medium mr-8"> Remember Me </label>
          </div>
          <a class="text-600 cursor-pointer hover:text-primary cursor-pointer ml-auto transition-colors transition-duration-300">Reset
            password</a>
        </div>
        <Button label="Log In" class="w-full" @click="navigateToDashboard"></Button>
      </div>
    </div>
  </div>
</template>
