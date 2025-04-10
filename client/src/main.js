import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import "vuetify/styles"; // Make sure to import Vuetify styles
import router from "./router";
import { createAuth0 } from "@auth0/auth0-vue";

// const dotenv = require("dotenv");

// dotenv.config();

// Vuetify setup
const vuetify = createVuetify();

// Create and mount the app
createApp(App)
  .use(router)
  .use(
    createAuth0({
      domain: "dev-64n4wmunx57ecqp6.us.auth0.com", //REDO with env vars and new stuff later
      clientId: "jaAhscT8iIBixqoKiCA62pAb4sVfGg1e",
      authorizationParams: {
        redirect_uri: "http://localhost:8080/callback",
      },
    })
  )
  .use(vuetify)
  .mount("#app");
