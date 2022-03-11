import { createApp } from "vue";
import { createPinia } from "pinia";

import store from "./store/index.js";
import router from "./router";

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(store);
app.use(router);

app.mount("#app");
