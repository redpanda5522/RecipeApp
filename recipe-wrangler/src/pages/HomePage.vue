<template>
  <div class="fill-height d-flex flex-column">
    <v-layout>
      <!-- Main App Bar -->
      <v-app-bar color="deep-orange accent-4" dark elevation="4" class="px-4">
        <!-- Nav Icon -->
        <template v-slot:prepend>
          <v-app-bar-nav-icon class="hover-opacity" />
        </template>

        <!-- Logo + Title -->
        <v-app-bar-title class="d-flex align-center">
          <span class="text-h5 font-weight-bold">Recipe Wrangler</span>
        </v-app-bar-title>

        <!-- Spacer + Buttons -->
        <v-spacer />

        <UserFeedButton class="mr-2" />
        <LogoutButton />
      </v-app-bar>

      <!-- Filter Bar -->
      <v-main>
        <v-sheet
          color="green darken-2"
          height="60"
          class="d-flex align-center justify-space-between px-6 py-2 elevation-2 rounded-b"
        >
          <!-- Label -->
          <div
            class="d-flex align-center text-white text-subtitle-1 font-weight-medium"
          >
            <v-icon class="mr-2">mdi-fire</v-icon>
            Popular Recipes
          </div>

          <!-- Count Selector -->
          <div class="d-flex align-center">
            <span class="text-white mr-2">Recipes on Page:</span>
            <v-select
              v-model="selectedNumber"
              @update:modelValue="updateFeed"
              :items="[...Array(10).keys()].map((n) => n + 1)"
              variant="outlined"
              hide-details
              density="comfortable"
              class="rounded-sm"
              style="max-width: 100px"
            />
          </div>
        </v-sheet>

        <!-- Content -->
        <v-container fluid>
          <v-row dense>
            <v-col v-for="post in posts" :key="post._id" cols="12">
              <v-card
                :title="post.title"
                :subtitle="`Ingredients: ${post.ingredients}`"
                elevation="3"
                class="rounded-lg"
              >
                <template #text>
                  <p>{{ post.steps }}</p>
                  <small class="text-grey">
                    {{ "Prep Time: " + post.prepTime + " minutes" }}
                  </small>
                </template>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LogoutButton from "@/components/buttons/LogoutButton.vue";
import UserFeedButton from "@/components/buttons/UserFeedButton.vue";
import PostService from "../PostService";

const posts = ref([]);
const selectedNumber = ref(5);
const error = ref("");

const updateFeed = async () => {
  try {
    posts.value = await PostService.getRandomPosts(selectedNumber.value);
  } catch (err) {
    error.value = err.message;
    console.error("Error fetching posts:", err);
  }
};

onMounted(updateFeed);
</script>
