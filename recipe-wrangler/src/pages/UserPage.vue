<template>
  <div class="fill-height d-flex flex-column">
    <v-layout>
      <!-- Main App Bar -->
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

        <HomeButton class="mr-2" />
        <LogoutButton />
      </v-app-bar>
      <!-- Filter Bar -->
      <v-main>
        <v-sheet
          color="green darken-2"
          height="60"
          class="d-flex align-center justify-space-between px-6 py-2 elevation-2 rounded-b"
        >
          <!-- Label + Add Button -->
          <div
            class="d-flex align-center text-white text-subtitle-1 font-weight-medium"
          >
            <v-icon class="mr-2">mdi-book-open-variant</v-icon>
            My Recipes
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
                  :title="post.title"
                  :subtitle="`Ingredients: ${post.ingredients}`"
                  elevation="3"
                  class="rounded-lg"
                >
                  <template #text>
                    <p>{{ post.steps }}</p>
                    <small class="text-grey">
                      {{ new Date(post.createdAt).toLocaleDateString() }}
                    </small>
                  </template>
                  <v-card-actions>
                    <RecipeDialog
                    :edit="true"
                    :current-recipe="post"
                    :reload="updateFeed"
                  />
                  <DeleteButton :reload="updateFeed" :recipe-id="post._id" />
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-main>
    </v-layout>
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
const selectedNumber = ref(5);
const error = ref("");
const updateFeed = async () => {
  try {
    posts.value = await PostService.getUserPosts(user.value.name);
  } catch (err) {
    error.value = err.message;
    console.error("Error fetching posts:", err);
  }
};

onMounted(updateFeed);
</script>
