<script setup lang="ts">
import Button from "primevue/button";

const props = defineProps(['data'])

function open(){
  window.open(props.data.target, '_blank');
}
</script>

<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <div class="text-700 text-center">
      <div class="text-900 font-bold text-5xl mb-3">
        {{ data.header }}
      </div>
      <div class="text-700 text-2xl mb-5">
        {{ data.description }}
      </div>
      <Button :label="data.targetLabel"
              @click="open()"
              class="font-bold px-5 py-3 white-space-nowrap" raised rounded>
      </Button>
    </div>
  </div>
</template>