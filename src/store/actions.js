export default {
  async fetchData({ state }) {
    state.info = "Loading...";
    try {
      const res = await fetch(
        `https://api.github.com/search/users?order=${state.sort}&q=${state.q}+in:login&sort=repositories&type:user&per_page=${state.page}`
      );
      state.data = await res.json();
    } catch (error) {
      alert("OOOPS" + error.message);
    }
    if (state.data.items.length === 0) state.info = "No result";
  },

  async fetchUser({ state }) {
    try {
      const res = await fetch(`https://api.github.com/users/${state.login}`);
      state.user = await res.json();
      state.created_at = state.user.created_at
        .slice(0, 10)
        .split("-")
        .reverse()
        .join(".");
      state.isOpen = true;
    } catch (e) {
      alert("OOOPS, somthingwent wrong: " + e.message);
    } finally {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
};
