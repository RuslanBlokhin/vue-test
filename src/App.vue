<script>
export default {
  data() {
    return {
      q: "",
      page: 20,
      data: null,
      sort: "desc",
      mostRepo: true,
      user: {},
      isOpen: false,
      login: "",
      info: "",
      created_at: "",
    };
  },

  methods: {
    async fetchData(e) {
      this.info = "Loading...";
      if (this.q === e.target.value) this.isOpen = false;
      try {
        const res = await fetch(
          `https://api.github.com/search/users?order=${this.sort}&q=${this.q}+in:login&sort=repositories&type:user&per_page=${this.page}`
        );
        this.data = await res.json();
      } catch (error) {
        alert("OOOPS" + error.message);
      }
      if (this.data.items.length === 0) this.info = "No result";
    },

    async fetchUser(e) {
      try {
        this.login = e.target.textContent;
        const res = await fetch(`https://api.github.com/users/${this.login}`);
        this.user = await res.json();
        this.created_at = this.user.created_at
          .slice(0, 10)
          .split("-")
          .reverse()
          .join(".");
        this.isOpen = true;
      } catch (e) {
        console.log(e);
        alert("OOOPS, somthing went wrong: " + e.message);
      } finally {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },

    loadMore() {
      this.isOpen = true;
      this.info = "Loading...";
      if (this.page === 100) return;
      else this.page = this.page + 20;
      this.fetchData();
    },

    sorting() {
      this.sort = this.sort === "desc" ? "asc" : "desc";
      this.fetchData();
      this.mostRepo = !this.mostRepo;
    },
  },
};
</script>

<template>
  <div :class="$style.search">
    <h2>Enter login:</h2>
    <input v-model="q" @keyup.enter="fetchData" />
    <button @click="fetchData" :class="$style.searchBtn">Search</button>
    <button
      @click="sorting"
      v-if="data && data.items.length !== 0"
      :class="$style.sortBtn"
    >
      Sort: {{ mostRepo ? "Most repositories" : "Fewest repositories" }}
    </button>
  </div>
  <div v-if="isOpen" :class="$style.details">
    <img :src="user.avatar_url" alt="ava" :class="$style.details__avatar" />
    <div :class="$style.details__info">
      <h2>{{ login }}</h2>
      <p :class="$style.details__info__date">Created at: {{ created_at }}</p>
      <p v-if="user.name" :class="$style.details__info__name">
        {{ user.name }}
      </p>
      <p v-if="user.location" :class="$style.details__info__date">
        Location: {{ user.location }}
      </p>
      <p v-if="user.email">{{ user.email }}</p>
      <div v-if="user.bio" :class="$style.details__info__bio">
        {{ user.bio }}
      </div>
    </div>
    <svg
      @click="isOpen = false"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      :class="$style.iconExit"
    >
      <path
        d="M17.707 16.293a1 1 0 0 1-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L10.586 12 6.293 7.707a1 1 0 0 1 1.414-1.414L12 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414L13.414 12l4.293 4.293z"
      ></path>
    </svg>
  </div>
  <p v-if="!data || data.items.length === 0" :class="$style.info">{{ info }}</p>
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
  <div :class="$style.loadmorebtnWwrapper">
    <button v-if="data && data.items.length !== 0" @click="loadMore">
      Load more
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
.sortBtn {
  display: block;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 30px;
}
.details {
  display: flex;
  justify-content: space-around;
  max-width: 750px;
  margin: 0 auto 10px;
  min-width: 450px;
  z-index: 100;
  padding: 10px;
  box-shadow: var(--box-shadow);
}
.details__avatar {
  border-radius: 50%;
  max-width: 200px;
  height: 100%;
}
.details__info {
  max-width: 400px;
}
.details__info__date {
  color: grey;
  font-size: 12px;
}
.details__info__name {
  font-size: 18px;
  font-weight: 500;
}
.iconExit {
  fill: grey;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
.iconExit:hover {
  fill: black;
}
</style>
