<script></script>

<template>
  <div :class="$style.search">
    <h2>Enter login:</h2>
    <input
      v-model="$store.state.q"
      @keyup.enter="$store.dispatch('fetchData')"
    />
    <button @click="$store.dispatch('fetchData')" :class="$style.searchBtn">
      Search
    </button>
    <button
      @click="$store.commit('sorting')"
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
