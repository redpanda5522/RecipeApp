<template>
  <v-btn color="primary" rounded="lg" size="x-large" @click="handleSignUp">Sign Up</v-btn>
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
