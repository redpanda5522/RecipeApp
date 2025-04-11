import { createApp } from "vue";
import { createVuetify } from "vuetify";
import "vuetify/styles"; 
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createAuth0 } from "@auth0/auth0-vue";
import App from "./App.vue";
import router from "./router";

// const dotenv = require("dotenv");

// dotenv.config();

// Vuetify setup
const vuetify = createVuetify({
  components,
  directives,
});

// Create and mount the app
console.log(process.env)
console.log(process.env.VUE_APP_TEST)
console.log(process.env.VITE_TEST)
createApp(App)
  .use(router)
  .use(vuetify)
  .use(
    createAuth0({
      domain: process.env.VUE_APP_AUTHO_DOMAIN, 
      clientId: process.env.VUE_APP_AUTHO_CLIENTID,
      authorizationParams: {
        redirect_uri: process.env.VUE_APP_AUTHO_REDIRECT,
      },
    })
  )
  .mount("#app");
