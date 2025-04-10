import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Make sure to import Vuetify styles
import router from './router'

// Vuetify setup
const vuetify = createVuetify();

console.log(router.getRoutes());

// Create and mount the app
createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');

