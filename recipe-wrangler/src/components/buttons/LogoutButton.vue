<template>
  <v-btn
    class="text-none"
    style="background-color: #02c3bd"
    rounded="lg"
    :elevation="3"
    @click="logout"
    ><v-icon class="mr-2">mdi-logout</v-icon>Log out</v-btn
  >
</template>
<script>
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  setup() {
    const { logout } = useAuth0();

    return {
      logout: () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
      },
    };
  },
};
</script>
