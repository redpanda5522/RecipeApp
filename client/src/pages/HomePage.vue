<template>
<v-app>
  <v-app-bar :elevation="10" color="orange-darken-4" rounded>
  <template v-slot:prepend>
    <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
  </template>
  <v-app-bar-title>Application Bar</v-app-bar-title>
  <logout-button />
</v-app-bar>
</v-app>
</template>

<script setup>
import LogoutButton from '@/components/buttons/LogoutButton.vue';
</script>