<script>
import Search from "./Search.vue";
export default {
  methods: {
    async fetchUser(e) {
      try {
        // this.$store.state.isOpen = true;
        this.login = e.target.textContent;
        const res = await fetch(`https://api.github.com/users/${this.login}`);
        this.$store.state.user = await res.json();
        this.$store.state.created_at = this.$store.state.user.created_at
          .slice(0, 10)
          .split("-")
          .reverse()
          .join(".");
        console.log(this.$store.state.created_at);
        this.$store.state.isOpen = true;
      } catch (e) {
        alert("OOOPS, somthing went wrong: " + e.message);
      } finally {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },

    loadMore() {
      this.$store.state.info = "Loading...";
      this.$store.state.page = 20;
      if (this.$store.state.page === 100) return;
      else this.$store.state.page = this.$store.state.page + 20;
      Search.methods.fetchData();
      // this.fetchData();
    },
  },
};
</script>

<template>
  <p
    v-if="!$store.state.data || $store.state.data.items.length === 0"
    :class="$style.info"
  >
    {{ $store.state.info }}
  </p>
  <ul v-else :class="$style.list">
    <li
      v-for="user in $store.state.data.items"
      :key="user.id"
      :class="$style.list__item"
      @click="fetchUser"
    >
      {{ user.login }}
    </li>
  </ul>
  <div :class="$style.loadmorebtnWwrapper">
    <button
      v-if="$store.state.data && $store.state.data.items.length !== 0"
      @click="loadMore"
    >
      Load more
    </button>
  </div>
</template>

<style module>
.info {
  text-align: center;
}
.list {
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin-top: 0;
  margin-bottom: 5px;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
}
.list__item {
  padding: 5px;
  text-decoration: none;
  color: black;
  font-size: 18px;
  position: relative;
  cursor: pointer;
  border-radius: 2px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--box-shadow);
}
.list__item:hover {
  transform: scale(1.03) translateY(-10%);
  box-shadow: 0px 0px 15px 5px aquamarine;
}
.loadmorebtnWwrapper {
  text-align: center;
  margin: 20px 0;
}
</style>
