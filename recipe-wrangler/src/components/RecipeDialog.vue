<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular text-black"
          prepend-icon="mdi-note-plus-outline"
          text="New Recipe"
          :elevation="3"
          v-bind="activatorProps"
          v-if="!edit"
          color="#81d8a8"
          rounded="lg"
        ></v-btn>
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-square-edit-outline"
          text="Edit"
          v-bind="activatorProps"
          v-if="edit"
          style="background-color: #81d8a8"
          rounded="md"
        ></v-btn>
      </template>

      <v-card
        elevation="4"
        class="rounded-lg"
        style="border-top: 6px solid #b2dfdb"
      >
        <v-card-title class="d-flex align-center pb-2">
          <div v-if="!edit">
            <v-icon class="mr-2">mdi-note-plus-outline</v-icon>
            <span class="text-h6 font-weight-medium">New Recipe</span>
          </div>
          <div v-if="edit">
            <v-icon class="mr-2">mdi-square-edit-outline</v-icon>
            <span class="text-h6 font-weight-medium">Edit Recipe</span>
          </div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-text-field
              v-model="title"
              label="Title"
              variant="outlined"
              required
              :error="!title && attemptedSubmit"
              :error-messages="
                !title && attemptedSubmit ? ['Title is required'] : []
              "
            ></v-text-field>
          </v-row>
          <v-row>
            <v-textarea
              v-model="ingredients"
              label="Ingredients"
              variant="outlined"
              required
              rows="2"
              :error="!ingredients && attemptedSubmit"
              :error-messages="
                !ingredients && attemptedSubmit
                  ? ['Ingredients are required']
                  : []
              "
            ></v-textarea>
          </v-row>
          <v-row>
            <v-textarea
              v-model="instructions"
              label="Instructions"
              variant="outlined"
              required
              auto-grow
              :error="!instructions && attemptedSubmit"
              :error-messages="
                !instructions && attemptedSubmit
                  ? ['Instructions are required']
                  : []
              "
            ></v-textarea>
          </v-row>
          <v-row>
            <v-col>
              <v-number-input
                v-model="prep_time"
                control-variant="split"
                :max="500"
                :min="0"
                :step="5"
                label="Prep Time (min)"
                :error="prep_time === 0 && attemptedSubmit"
                :error-messages="
                  prep_time === 0 && attemptedSubmit
                    ? ['Prep Time is required']
                    : []
                "
              ></v-number-input> </v-col
            ><v-col>
              <v-radio-group v-model="public_post" inline>
                <v-radio label="Private" :value="false"></v-radio>
                <v-radio label="Public" :value="true"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="tonal" color="#ff9b85" @click="closeDialog()"
            ><v-icon class="mr-2">mdi-close</v-icon>Close</v-btn
          >

          <v-btn
            color="#81d8a8"
            variant="tonal"
            @click="!edit ? addRecipe() : updateRecipe()"
            ><v-icon class="mr-2">mdi-check</v-icon
            >{{ !edit ? "Add" : "Update" }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="showSnackbar"
      location="bottom right"
      :timeout="3000"
      color="success"
      rounded="lg"
      class="text-center"
    >
      <v-icon class="mr-2">mdi-check</v-icon>
      <span>{{ snackbarMessage }}</span>
    </v-snackbar>
  </div>
</template>

<script setup>
import { shallowRef, ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import PostService from "../PostService";
import { watch } from "vue";

const { edit, currentRecipe, reload } = defineProps({
  edit: {
    type: Boolean,
    default: false,
  },
  currentRecipe: {
    type: Object,
    default: () => ({}),
  },
  reload: {
    type: Function,
    required: true,
  },
});

let dialog = shallowRef(false);
const title = ref(currentRecipe.title || "");
const ingredients = ref(currentRecipe.ingredients || "");
const instructions = ref(currentRecipe.steps || "");
const public_post = ref(currentRecipe.public || false);
const prep_time = ref(currentRecipe.prepTime || 0);
const { user } = useAuth0();
const error = ref("");
const attemptedSubmit = ref(false);
const showSnackbar = ref(false);
const snackbarMessage = ref("");

watch(dialog, (val) => {
  if (val) {
    title.value = currentRecipe.title || "";
    ingredients.value = currentRecipe.ingredients || "";
    instructions.value = currentRecipe.steps || "";
    public_post.value = currentRecipe.public || false;
    prep_time.value = currentRecipe.prepTime || 0;
    attemptedSubmit.value = false;
  }
});

function isFormValid() {
  return (
    title.value.trim() &&
    ingredients.value.trim() &&
    instructions.value.trim() &&
    prep_time.value > 0
  );
}

function closeDialog() {
  dialog.value = false;
}

const addRecipe = async () => {
  attemptedSubmit.value = true;
  if (isFormValid()) {
    try {
      const recipe = {
        title: title.value,
        ingredients: ingredients.value,
        steps: instructions.value,
        prepTime: prep_time.value,
        userId: user.value.name,
        public: public_post.value,
      };
      closeDialog();
      await PostService.insertPost(recipe);
      snackbarMessage.value = "Recipe added successfully!";
      showSnackbar.value = true;
      reload();
    } catch (err) {
      error.value = err.message;
      console.error("Error adding recipe:", err);
      closeDialog();
    }
  }
};

const updateRecipe = async () => {
  attemptedSubmit.value = true;
  if (isFormValid()) {
    try {
      const recipe = {
        title: title.value,
        ingredients: ingredients.value,
        steps: instructions.value,
        prepTime: prep_time.value,
        userId: user.value.name,
        public: public_post.value,
      };
      closeDialog();
      await PostService.updatePost(currentRecipe._id, recipe);
      snackbarMessage.value = "Recipe updated successfully!";
      showSnackbar.value = true;
      reload();
    } catch (err) {
      error.value = err.message;
      console.error("Error adding recipe:", err);
      closeDialog();
    }
  }
};
</script>
