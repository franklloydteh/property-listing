<script setup lang="ts">
import CallToAction from "@/components/blocks/CallToAction.vue";
import Hero from "@/components/blocks/Hero.vue";
import Features from "@/components/blocks/Features.vue";
import HomePageClient from "@/client/HomePageClient";
import { ref } from "vue";

const components = ref<any>([]);

HomePageClient.get()
    .then(page => {
      components.value = page.data.attributes.components;
    })

function type(component, type) {
  return component.__component === ('page-components.' + type);
}
</script>

<template>
  <div v-for="component in components">
    <hero v-if="type(component, 'hero-banner')" :data="component">
    </hero>

    <call-to-action v-if="type(component,'call-to-action')" :data="component">
    </call-to-action>

    <features v-if="type(component,'features-list')" :data="component">
    </features>
  </div>
</template>
