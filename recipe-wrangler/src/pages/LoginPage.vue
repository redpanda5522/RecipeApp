<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <img max-width="100%" height="100%" src="./../assets/recipe.png" />
      </v-col>
      <v-col>
        <v-row>
          <v-col><h1 style="font-size: 84px">Recipe Wrangler</h1> </v-col>
        </v-row>
        <v-row>
          <v-col><login-button /> <signup-button /></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import LoginButton from "@/components/buttons/LoginButton.vue";
import SignupButton from "@/components/buttons/SignupButton.vue";
</script>

<style scoped>
body {
    background-color: #ffdfd5;
};
</style>