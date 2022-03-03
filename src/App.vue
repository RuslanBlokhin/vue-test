<script>
export default {
  data() {
    return {
      q: "",
      data: null,
      sort: "desc",
      mostRepo: true,
    };
  },
  methods: {
    async fetchData() {
      this.data = null;
      const res = await fetch(
        `https://api.github.com/search/users?order=${this.sort}&q=${this.q}+in:login&sort=repositories&type:user`
      );
      this.data = await res.json();
      console.log(this.data.items);
    },

    sorting() {
      switch (this.sort) {
        case "desc":
          this.sort = "asc";
          this.fetchData();
          break;
        case "asc":
          this.sort = "desc";
          this.fetchData();
          break;
        default:
          this.sort = "desc";
      }
    },
  },
};
</script>

<template>
  <h2>Enter login:</h2>
  <input v-model="q" @keyup.enter="fetchData" />
  <button @click="fetchData">Search</button>
  <button @click="sorting">Sort</button>
  <p v-if="!data">No result</p>
  <ul v-else>
    <li v-for="user in data.items" :key="user.id">
      {{ user.login }}
    </li>
  </ul>
</template>
