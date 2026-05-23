import "./lib/parse";
import "./assets/styles.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Global properties
app.use(createPinia());
app.use(router);

//mount the app
app.mount("#app");
