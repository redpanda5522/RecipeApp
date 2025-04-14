<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="New Recipe"
          variant="tonal"
          v-bind="activatorProps"
          v-if="!edit"
        ></v-btn>
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Edit"
          variant="tonal"
          v-bind="activatorProps"
          v-if="edit"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-account" title="New Recipe">
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
                  prep_time === 0 && attemptedSubmit ? ['Enter prep time'] : []
                "
              ></v-number-input> </v-col
            ><v-col>
              <v-radio-group v-model="public_post" inline>
                <v-radio label="Private" :value="false"></v-radio>
                <v-radio label="Public" :value="true"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis"
            >*indicates required field</small
          >
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="!edit ? addRecipe() : updateRecipe()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { shallowRef, ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import PostService from "../PostService";

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

function isFormValid() {
  return (
    title.value.trim() &&
    ingredients.value.trim() &&
    instructions.value.trim() &&
    prep_time.value > 0
  );
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
      dialog.value = false;
      await PostService.insertPost(recipe);
      reload();  
    } catch (err) {
      error.value = err.message;
      console.error("Error adding recipe:", err);
      dialog.value = false;
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
      dialog.value = false;
      await PostService.updatePost(currentRecipe._id, recipe);
      reload();
    } catch (err) {
      error.value = err.message;
      console.error("Error adding recipe:", err);
      dialog.value = false;
    }
  }
};
</script>
