<template>
  <div class="fill-height d-flex flex-column">
    <v-layout>
      <!-- Main App Bar -->
      <v-app-bar color="primary" dark elevation="4" class="px-4">
        <!-- Nav Icon -->
        <template v-slot:prepend>
          <img
            src="./../assets/recipe-outline.png"
            alt="Logo"
            class="mr-0"
            style="height: 36px; cursor: pointer; color: white"
          />
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
          height="60"
          class="d-flex align-center justify-space-between px-6 py-2 elevation-2 rounded-b primary_background_light"
        >
          <!-- Label -->
          <div
            class="d-flex align-center text-black text-subtitle-1 font-weight-medium"
          >
            <v-icon class="mr-2">mdi-fire</v-icon>
            <span class="text-black"><h4>Popular Recipes</h4></span>
          </div>

          <!-- Count Selector -->
          <div class="d-flex align-center">
            <v-btn
              :onclick="updateFeed"
              variant="plain"
              icon="mdi-refresh"
              color="black"
            ></v-btn>
            <span class="text-black mr-2">Recipes on Page:</span>
            <v-select
              v-model="selectedNumber"
              @update:modelValue="updateFeed"
              :items="[...Array(25).keys()].map((n) => n + 1)"
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
                elevation="3"
                class="rounded-lg"
                @click="toggleExpand(post._id)"
              >
                <!-- Title + Expand Icon -->
                <v-card-title class="d-flex justify-space-between align-center">
                  <h2 class="text-h6 font-weight-bold mb-0">
                    {{ post.title }}
                  </h2>
                  <v-icon :class="{ rotate: expandedRecipeId === post._id }">
                    {{
                      expandedRecipeId === post._id
                        ? "mdi-chevron-up"
                        : "mdi-chevron-down"
                    }}
                  </v-icon>
                </v-card-title>

                <!-- Meta row: Prep Time + Buttons -->
                <div
                  class="d-flex justify-space-between align-center px-4 pb-2"
                  @click.stop
                >
                  <small class="text-grey font-italic">
                    Prep Time: {{ post.prepTime }} minutes
                  </small>
                  <div class="d-flex align-center">
                    <small class="text-grey font-italic">
                      {{ post.userId }}
                    </small>
                  </div>
                </div>

                <!-- Expandable Content -->
                <v-expand-transition>
                  <div v-show="expandedRecipeId === post._id" class="px-4 pb-4">
                    <v-sheet color="#f9f9f9" class="pa-3 rounded mb-3">
                      <div class="d-flex align-center mb-2">
                        <v-icon class="mr-2" style="color: #02c3bd"
                          >mdi-silverware</v-icon
                        >
                        <span class="text-subtitle-1 font-weight-bold"
                          >Ingredients</span
                        >
                      </div>
                      <p class="mb-0">{{ post.ingredients }}</p>
                    </v-sheet>

                    <v-divider class="my-2" />

                    <v-sheet color="#f9f9f9" class="pa-3 rounded">
                      <div class="d-flex align-center mb-2">
                        <v-icon class="mr-2" style="color: #02c3bd"
                          >mdi-format-list-bulleted</v-icon
                        >
                        <span class="text-subtitle-1 font-weight-bold"
                          >Instructions</span
                        >
                      </div>
                      <p class="mb-0">{{ post.steps }}</p>
                    </v-sheet>
                  </div>
                </v-expand-transition>
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
const selectedNumber = ref(8);
const error = ref("");
const expandedRecipeId = ref(null);

const toggleExpand = (id) => {
  expandedRecipeId.value = expandedRecipeId.value === id ? null : id;
};

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
