<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import UserClient from "@/client/UserClient";


const { onMenuToggle, onProfileSidebarToggle, onConfigSidebarToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

const isSignedIn = ref(null);

onMounted(() => {
  bindOutsideClickListener();
  isSignedIn.value = UserClient.isSignedIn();
  console.log('signedin', isSignedIn.value)
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;

  const sidebarEl = document.querySelector('.layout-topbar-menu');
  const topbarEl = document.querySelector('.layout-topbar-menu-button');

  return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

const showProfileSidebar = () => {
  onProfileSidebarToggle();
};
const onConfigButtonClick = () => {
  onConfigSidebarToggle();
};

function search() {
  console.log("search")
  router.push({ path: '/search' })
}
</script>

<template>
  <div class="layout-topbar">

    <div class="topbar-start">
      <router-link to="/" class="pr-3 flex center">
        <i class="pi pi-home" style="font-size: 2.5rem"></i>
      </router-link>
    </div>

    <form @submit.prevent="search()">
      <IconField iconPosition="left">
        <InputIcon class="pi pi-search"/>
        <InputText type="text" placeholder="Search" class="w-24rem"/>
      </IconField>
    </form>

    <div class="topbar-end flex flex-row">
      <router-link to="/register" class="pr-3" v-if="!isSignedIn">
        <h5 class="m-0">Register</h5>
      </router-link>
      <router-link to="/login" class="pr-3" v-if="!isSignedIn">
        <h5>Login</h5>
      </router-link>
      <ul class="topbar-menu" v-if="isSignedIn">
        <li class="topbar-profile">
          <i class="pi pi-list cursor-pointer" style="font-size: 2.5rem" @click="showProfileSidebar"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
