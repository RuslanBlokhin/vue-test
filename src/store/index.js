import { createStore } from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";

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

  mutations,
  actions,
});
export default store;
