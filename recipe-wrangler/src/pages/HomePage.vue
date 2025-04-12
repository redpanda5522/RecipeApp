<template>
  <v-card class="mx-auto">
    <v-layout>
      <v-app-bar color="primary">
        <template v-slot:prepend>
          <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Recipe Wrangler</v-app-bar-title>
        <UserFeedButton />
        <logout-button />
      </v-app-bar>

      <v-app-bar color="secondary">
        <v-app-bar-title>Popular Recipes</v-app-bar-title>
      </v-app-bar>


      <v-main>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="n in 4" :key="n" cols="12">
              <v-card
                :subtitle="`Subtitle for Content ${n}`"
                :title="`Content ${n}`"
                text="Lorem ipsum dolor sit amet consectetur, adipisicing elit.?"
              ></v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import LogoutButton from "@/components/buttons/LogoutButton.vue";
import UserFeedButton from "@/components/buttons/UserFeedButton.vue";
</script>
