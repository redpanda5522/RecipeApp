<template>
  <div class="fill-height d-flex flex-column">
    <v-layout>
      <!-- Main App Bar -->
      <v-app-bar color="primary" elevation="4" class="px-4 primary_background">
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

        <HomeButton class="mr-2" />
        <LogoutButton />
      </v-app-bar>
      <!-- Filter Bar -->
      <v-main>
        <v-sheet
          height="60"
          class="d-flex align-center justify-space-between px-6 py-2 elevation-2 rounded-b primary_background_light"
        >
          <!-- Label + Add Button -->
          <div class="d-flex align-center text-subtitle-1 font-weight-medium">
            <v-icon class="mr-4">mdi-book-open-variant-outline</v-icon>
            <h4>My Recipes</h4>
          </div>
          <div class="d-flex align-center">
            <RecipeDialog class="ml-4" :reload="updateFeed" />
          </div>
        </v-sheet>

        <!-- Scrollable Recipe List -->
        <div
          style="
            overflow-y: auto;
            max-height: calc(100vh - 130px);
            padding: 16px;
          "
        >
          <v-container fluid>
            <v-row dense>
              <v-col v-for="post in posts" :key="post._id" cols="12">
                <v-card
                  elevation="3"
                  class="rounded-lg"
                  @click="toggleExpand(post._id)"
                >
                  <!-- Title + Expand Icon -->
                  <v-card-title
                    class="d-flex justify-space-between align-center"
                  >
                    <h2 class="text-h6 font-weight-bold mb-0">
                      {{ post.title }}
                    </h2>
                    <div>
                      <v-icon v-if="post.public" size="small" class="mr-6"
                        >mdi-eye</v-icon
                      >
                      <v-icon v-if="!post.public" size="small" class="mr-6"
                        >mdi-eye-off-outline</v-icon
                      >
                      <v-icon
                        :class="{ rotate: expandedRecipeId === post._id }"
                      >
                        {{
                          expandedRecipeId === post._id
                            ? "mdi-chevron-up"
                            : "mdi-chevron-down"
                        }}
                      </v-icon>
                    </div>
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
                      <RecipeDialog
                        :edit="true"
                        :current-recipe="post"
                        :reload="updateFeed"
                        v-slot="{ openDialog }"
                      >
                        <v-btn
                          color="primary"
                          variant="text"
                          size="small"
                          class="mr-1"
                          @click="openDialog"
                        >
                          <v-icon start size="18">mdi-pencil</v-icon>
                          Edit
                        </v-btn>
                      </RecipeDialog>

                      <DeleteButton
                        :snackbar="showSuccess"
                        :reload="updateFeed"
                        :recipe-id="post._id"
                      />
                    </div>
                  </div>

                  <!-- Expandable Content -->
                  <v-expand-transition>
                    <div
                      v-show="expandedRecipeId === post._id"
                      class="px-4 pb-4"
                    >
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
        </div>
      </v-main>
    </v-layout>
    <v-snackbar
      v-model="showSnackbar"
      location="bottom right"
      :timeout="3000"
      color="success"
      rounded="lg"
      class="text-center"
    >
      <v-icon class="mr-2">mdi-check</v-icon>
      <span>Successfully deleted recipe!</span>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import LogoutButton from "@/components/buttons/LogoutButton.vue";
import HomeButton from "@/components/buttons/HomeButton.vue";
import RecipeDialog from "../components/RecipeDialog.vue";
import DeleteButton from "../components/buttons/DeleteButton.vue";
import PostService from "../PostService";

const { user } = useAuth0();
const posts = ref([]);
const error = ref("");
const expandedRecipeId = ref(null);
const showSnackbar = ref(false);

const toggleExpand = (id) => {
  expandedRecipeId.value = expandedRecipeId.value === id ? null : id;
};

const updateFeed = async () => {
  try {
    posts.value = await PostService.getUserPosts(user.value.name);
  } catch (err) {
    error.value = err.message;
    console.error("Error fetching posts:", err);
  }
};

const showSuccess = async () => {
  showSnackbar.value = true;
};

onMounted(updateFeed);
</script>

<style scoped>
.v-card {
  cursor: pointer;
}
</style>
