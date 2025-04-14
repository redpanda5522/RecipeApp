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
  
          <HomeButton />
          <LogoutButton />
        </v-app-bar>
  
        <!-- Filter Bar (as a sheet) -->
        <v-main>
          <v-sheet color="secondary" height="50" class="d-flex align-center px-4">
            <v-app-bar-title class="text-white text-subtitle-1">
              My Recipes
            </v-app-bar-title>
            <RecipeDialog :reload="updateFeed"/>
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
                  <RecipeDialog :edit="true" :current-recipe="post" :reload="updateFeed" />
                  <DeleteButton :reload="updateFeed" :recipe-id="post._id" />
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
  