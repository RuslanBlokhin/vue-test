<script>
export default {
  data() {
    return {
      message: "Hello World!",
      titleClass: "title",
      count: 0,
      text: "",
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>

<template>
  <h1 v-bind:class="titleClass">{{ message }}</h1>
  <button v-on:click="increment">count is: {{ count }}</button>
  <input v-model="text" />
  <p>{{ text }}</p>
</template>

<style>
.title {
  color: red;
}
</style>
