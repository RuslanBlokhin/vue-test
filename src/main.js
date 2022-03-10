import { createApp } from "vue";
import { createPinia } from "pinia";
import { createStore } from "vuex";

import App from "./App.vue";

const app = createApp(App);

const store = createStore({
  state() {
    return {
      q: "",
      sort: "desc",
      mostRepo: true,
      data: null,
      user: {},
      isOpen: false,
      page: 20,
      info: "",
      created_at: "",
      login: "",
    };
  },
});

app.use(createPinia());
app.use(store);

app.mount("#app");
