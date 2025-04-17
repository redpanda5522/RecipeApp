<template>
  <v-btn
    class="secondary_background font-weight-bold text-white"
    rounded="lg"
    size="x-large"
    @click="handleSignUp"
    ><v-icon class="mr-2">mdi-draw</v-icon>Sign Up</v-btn
  >
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";

const { loginWithRedirect } = useAuth0();

const handleSignUp = () => {
  loginWithRedirect({
    appState: {
      target: "/home",
    },
    authorizationParams: {
      screen_hint: "signup",
    },
  });
};
</script>
