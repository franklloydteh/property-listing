<script setup>
import { useLayout } from '@/layout/composables/layout';
import UserClient from "@/client/UserClient";

const { layoutState } = useLayout();

function close() {
  layoutState.profileSidebarVisible.value = false;
}

function signOut() {
  UserClient.logout();
  close();
  window.location.href = '/';
}
</script>

<template>
  <Sidebar v-model:visible="layoutState.profileSidebarVisible.value" position="right"
           class="layout-profile-sidebar w-full sm:w-25rem">

    <div class="flex flex-column mx-auto md:mx-0">
      <span class="mb-2 font-semibold">Welcome</span>
      <span class="text-color-secondary font-medium mb-5">Isabella Andolini</span>

      <ul class="list-none m-0 p-0">
        <li>
          <router-link to="/my/profile" @click="close()"
                       class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                        <span>
                            <i class="pi pi-user text-xl text-primary"></i>
                        </span>
            <div class="ml-3">
              <span class="mb-2 font-semibold">Profile</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/my/property/list" @click="close()"
                       class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                        <span>
                            <i class="pi pi-home text-xl text-primary"></i>
                        </span>
            <div class="ml-3">
              <span class="mb-2 font-semibold">My Properties</span>
            </div>
          </router-link>
        </li>
        <li>
          <a @click="signOut()"
             class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
            <span>
                <i class="pi pi-power-off text-xl text-primary"></i>
            </span>
            <div class="ml-3">
              <span class="mb-2 font-semibold">Sign Out</span>
            </div>
          </a>
        </li>
      </ul>
    </div>

  </Sidebar>
</template>
