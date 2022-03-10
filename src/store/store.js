import { createStore } from "vuex";
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

  mutations: {
    sorting(state) {
      state.sort = state.sort === "desc" ? "asc" : "desc";
      store.dispatch("fetchData");
      state.mostRepo = !state.mostRepo;
    },

    loadMore(state) {
      state.info = "Loading...";
      state.page = 20;
      if (state.page === 100) return;
      else state.page = state.page + 20;
      store.dispatch("fetchData");
    },
  },

  actions: {
    async fetchData(context) {
      context.state.info = "Loading...";
      try {
        const res = await fetch(
          `https://api.github.com/search/users?order=${context.state.sort}&q=${context.state.q}+in:login&sort=repositories&type:user&per_page=${context.state.page}`
        );
        context.state.data = await res.json();
      } catch (error) {
        alert("OOOPS" + error.message);
      }
      if (context.state.data.items.length === 0)
        context.state.info = "No result";
    },

    async fetchUser(context) {
      try {
        const res = await fetch(
          `https://api.github.com/users/${context.state.login}`
        );
        context.state.user = await res.json();
        context.state.created_at = context.state.user.created_at
          .slice(0, 10)
          .split("-")
          .reverse()
          .join(".");
        context.state.isOpen = true;
      } catch (e) {
        alert("OOOPS, somthing went wrong: " + e.message);
      } finally {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
  },
});
export default store;
