<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps(['data'])
const router = useRouter();

function open() {
  router.push({ path: props.data.target });
}
</script>

<template>
  <div class="grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
      <section>
        <div class="text-6xl text-primary font-bold mb-3">
          {{ data.header }}
        </div>
        <p class="mt-0 mb-4 text-700 text-2xl line-height-3">
          {{ data.description }}
        </p>
        <Button :label="data.targetLabel"
                @click="open()"
                class="mr-3" raised></Button>
      </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
      <img :src="data.image.data.attributes.url"
           class="md:ml-auto block md:h-full"
           style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
    </div>
  </div>
</template>
