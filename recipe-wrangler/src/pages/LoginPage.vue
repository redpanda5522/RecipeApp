<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="auto">
        <img max-width="100%" height="100%" src="./../assets/recipe.png" />
      </v-col>
      <v-spacer cols="2"></v-spacer>
      <v-col cols="6">
        <v-row>
          <h1 style="font-size: 84px">Recipe</h1>
        </v-row>
        <v-row>
          <h1 style="font-size: 84px">Wrangler</h1>
        </v-row>
        <v-row>
          <v-col cols="auto"><login-button /> </v-col>
          <v-col cols="auto"><signup-button /> </v-col>
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
}
</style>
