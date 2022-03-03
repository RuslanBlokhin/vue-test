<script>
export default {
  data() {
    return {
      q: "",
      data: null,
      users: [],
    };
  },
  methods: {
    async fetchData() {
      this.data = null;
      const res = await fetch(
        `https://api.github.com/search/users?q=${this.q}+in:login`
      );
      this.data = await res.json();
      console.log(this.data.items);
    },
  },

  // mounted() {
  //   this.fetchData();
  // },
  // watch: {
  //   todoId() {
  //     this.fetchData();
  //   },
  // },
};
</script>

<template>
  <h2>Enter login:</h2>
  <input v-model="q" @keyup.enter="fetchData" />
  <button @click="fetchData">Search</button>
  <p v-if="!data">No result</p>
  <ul v-else>
    <li v-for="user in data.items" :key="user.id">{{ user.login }}</li>
  </ul>
</template>
