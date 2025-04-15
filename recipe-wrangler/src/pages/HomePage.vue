<template>
  <div class="fill-height d-flex flex-column">
    <v-layout>
      <!-- Main App Bar -->
      <v-app-bar color="primary">
        <template v-slot:prepend>
          <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>
          <h2 class="text-white">Recipe Wrangler</h2>
        </v-app-bar-title>

        <UserFeedButton />
        <LogoutButton />
      </v-app-bar>

      <!-- Filter Bar (as a sheet) -->
      <v-main>
        <v-sheet color="secondary" height="50" class="d-flex align-center px-4">
          <v-app-bar-title class="text-white text-subtitle-1">
            Popular Recipes
          </v-app-bar-title>

          <v-spacer />

          <v-select
            v-model="selectedNumber"
            @update:modelValue="updateFeed"
            :items="[...Array(10).keys()].map((n) => n + 1)"
            variant="outlined"
            label="Count"
            hide-details
            density="compact"
            style="max-width: 100px"
          />
        </v-sheet>

        <!-- Content -->
        <v-container fluid>
          <v-row dense>
            <v-col v-for="post in posts" :key="post._id" cols="12">
              <v-card :title="post.title" :subtitle="post.ingredients">
                <template #text>
                  <p>{{ post.steps }}</p>
                  <small class="text-grey">
                    {{ new Date(post.createdAt).toLocaleDateString() }}
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
