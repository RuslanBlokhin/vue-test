<script>
import Search from "./components/Search.vue";
// import UserDetails from "./components/UserDetails.vue";
// import UserList from "./components/UserList.vue";

export default {
  components: {
    Search,
    // UserDetails,
    // UserList,
  },
};
</script>

<template>
  <Search />
  <RouterView />
  <!-- <UserList /> -->
</template>
