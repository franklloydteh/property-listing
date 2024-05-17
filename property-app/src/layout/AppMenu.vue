<script setup>
import { ref } from 'vue';

import AppSubMenu from './AppSubMenu.vue';

const model = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: '/'
  },
  {
    label: 'About',
    icon: 'pi pi-info',
    to: '/'
  }
]);
</script>

<template>
  <AppSubMenu :model="model"/>
</template>

<style lang="scss" scoped></style>
