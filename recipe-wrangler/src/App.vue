<template>
  <v-app>
    <router-view />
</v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
.primary_background {
  background-color: #ee6055;
}

.secondary_background {
  background-color: #60d394;
}

.primary_background_light {
  background-color: #ff9b85;
}

.secondary_background_light {
  background-color: #aaf683;
}

.primary_text {
  color: red;
}

.secondary_background {
  color: blue;
}
</style>