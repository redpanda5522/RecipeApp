<template>
    <v-btn color="secondary" rounded="lg" size="x-large" @click="handleLogin">Log In</v-btn>
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
  