import { createApp } from "vue";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { createAuth0 } from "@auth0/auth0-vue";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";

// const customTheme = {
//   colors: {
//     background: '#ffdfd5',
//     primary: '#FA5F2F',
//     secondary: '#76C177',
//   },
// }

// Vuetify setup
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    options: { customProperties: true },
    defaultTheme: "myCustomTheme",
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          background: "#ffdfd5",
          primary: "#FA5F2F",
          secondary: "#76C177",
        },
      },
    },
  },
});

// Create and mount the app
createApp(App)
  .use(router)
  .use(vuetify)
  .use(
    createAuth0({
      domain: import.meta.env.VITE_AUTHO_DOMAIN,
      clientId: import.meta.env.VITE_AUTHO_CLIENTID,
      authorizationParams: {
        redirect_uri: import.meta.env.VITE_AUTHO_REDIRECT,
      },
      useRefreshTokens: true,
      cacheLocation: "localstorage",
    })
  )
  .mount("#app");
