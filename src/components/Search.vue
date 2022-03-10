<script>
export default {
  methods: {
    async fetchData() {
      this.$store.state.info = "Loading...";
      // if (this.q === e.target.value) this.$store.state.isOpen = false;
      try {
        const res = await fetch(
          `https://api.github.com/search/users?order=${this.$store.state.sort}&q=${this.$store.state.q}+in:login&sort=repositories&type:user&per_page=${this.$store.state.page}`
        );
        this.$store.state.data = await res.json();
      } catch (error) {
        alert("OOOPS" + error.message);
      }
      if (this.$store.state.data.items.length === 0)
        this.$store.state.info = "No result";
    },

    sorting() {
      this.$store.state.sort = this.sort === "desc" ? "asc" : "desc";
      this.fetchData();
      this.$store.state.mostRepo = !this.$store.state.mostRepo;
    },
  },
};
</script>

<template>
  <div :class="$style.search">
    <h2>Enter login:</h2>
    <input v-model="$store.state.q" @keyup.enter="fetchData" />
    <button @click="fetchData" :class="$style.searchBtn">Search</button>
    <button
      @click="sorting"
      v-if="$store.state.data && $store.state.data.items.length !== 0"
      :class="$style.sortBtn"
    >
      Sort:
      {{ $store.state.mostRepo ? "Most repositories" : "Fewest repositories" }}
    </button>
  </div>
</template>

<style module>
.search {
  text-align: center;
}
.searchBtn {
  margin-right: 10px;
}
.sortBtn {
  display: block;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
