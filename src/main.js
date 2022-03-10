import { createApp } from "vue";
import { createPinia } from "pinia";
import store from "./store/index.js";

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(store);

app.mount("#app");
