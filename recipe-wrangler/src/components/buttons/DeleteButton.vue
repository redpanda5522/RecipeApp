<template>
    <v-btn style="background-color: red" rounded="lg" :onclick="deleteRecipe">Delete</v-btn>
</template>

<script setup>
import PostService from "./../../PostService";

const {recipeId, reload} = defineProps({
  recipeId: {
    type: String,
    default: "",
    required: true
  },
  reload: {
    type: Function,
    required: true
  }
});

const deleteRecipe = async () => {
  try {
    await PostService.deletePost(recipeId);
    reload();
  } catch (err) {
    console.error("Error adding recipe:", err);
  }
};
  </script>

