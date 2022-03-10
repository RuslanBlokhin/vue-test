import store from "@/store/index.js";
export default {
  sorting(state) {
    state.sort = state.sort === "desc" ? "asc" : "desc";
    state.mostRepo = !state.mostRepo;
    store.dispatch("fetchData");
  },

  loadMore(state) {
    state.info = "Loading...";
    state.page = 20;
    if (state.page === 100) return;
    else state.page = state.page + 20;
    store.dispatch("fetchData");
  },
};
