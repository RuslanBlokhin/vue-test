<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  data() {
    return {
      q: "",
      page: 20,
      data: null,
      sort: "desc",
      mostRepo: true,
      user: null,
      isOpen: false,
      login: "",
      avatar: null,
      created_at: null,
      bio: null,
      location: null,
      nameF: null,
      email: null,
    };
  },

  methods: {
    async fetchData() {
      try {
        this.data = null;
        const res = await fetch(
          `https://api.github.com/search/users?order=${this.sort}&q=${this.q}+in:login&sort=repositories&type:user&per_page=${this.page}`
        );
        this.data = await res.json();
      } catch (error) {
        console.log(error.message);
      }
    },

    async fetchUser(e) {
      try {
        this.isOpen = true;
        this.login = e.target.textContent;
        const res = await fetch(`https://api.github.com/users/${this.login}`);
        this.user = await res.json();
        this.avatar = this.user.avatar_url;
        this.bio = this.user.bio;
        this.location = this.user.location;
        this.nameF = this.user.name;
        this.email = this.user.email;
        this.created_at = this.user.created_at
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("-");
        console.log(this.user);
        console.log(this.created_at);
      } catch (e) {
        console.log(e.message);
      }
    },

    loadMore() {
      if (this.page === 100) return;
      else this.page = this.page + 20;
      this.fetchData();
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
      this.mostRepo = !this.mostRepo;
    },
  },
};
</script>

<template>
  <h2>Enter login:</h2>
  <input v-model="q" @keyup.enter="fetchData" />
  <button @click="fetchData" :class="$style.searchBtn">Search</button>
  <button @click="sorting" v-if="data" :class="$style.sortBtn">
    Sort: {{ mostRepo ? "Most repositories" : "Fewest repositories" }}
  </button>
  <div v-if="isOpen" :class="$style.details">
    <img :src="avatar" alt="ava" :class="$style.details__avatar" />
    <div :class="$style.details__info">
      <h2>{{ login }}</h2>
      <p :class="$style.details__info__date">Created at: {{ created_at }}</p>
      <p v-if="nameF" :class="$style.details__info__name">{{ nameF }}</p>
      <p v-if="location" :class="$style.details__info__date">
        Location: {{ location }}
      </p>
      <p v-if="email">{{ email }}</p>
      <div v-if="bio" :class="$style.details__info__bio">{{ bio }}</div>
    </div>
  </div>

  <p v-if="!data">No result</p>
  <ul v-else :class="$style.list">
    <li
      to="/details"
      v-for="user in data.items"
      :key="user.id"
      :class="$style.list__item"
      @click="fetchUser"
    >
      {{ user.login }}
    </li>
  </ul>
  <div :class="$style.loadmorebtnWwrapper" v-if="data" @click="loadMore">
    <button>Load more</button>
  </div>
</template>

<style module>
.searchBtn {
  margin-right: 10px;
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
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
}
.list__item:hover {
  transform: scale(1.03) translateY(-10%);
  box-shadow: 0px 0px 15px 5px aquamarine;
}
.loadmorebtnWwrapper {
  text-align: center;
  margin: 20px 0;
}
.sortBtn {
  margin-top: 10px;
  margin-bottom: 30px;
}
.details {
  display: flex;
  min-width: 450px;
  z-index: 100;
  padding: 5px;
  margin-bottom: 10px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
}
.details__avatar {
  border-radius: 50%;
  max-width: 250px;
  height: 100%;
}
.details__info {
  margin-left: 30px;
}
.details__info__date {
  color: grey;
  font-size: 12px;
}
.details__info__name {
  font-size: 18px;
  font-weight: 500;
}
</style>
