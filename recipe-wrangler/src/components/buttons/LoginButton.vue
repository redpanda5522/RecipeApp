<template>
  <v-btn
    class="primary_background font-weight-bold text-white"
    rounded="lg"
    size="x-large"
    @click="handleLogin"
    ><v-icon class="mr-2">mdi-login</v-icon>Log In</v-btn
  >
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";

const { loginWithRedirect } = useAuth0();

const handleLogin = () => {
  loginWithRedirect({
    appState: {
      target: "/home",
    },
  });
};
</script>
