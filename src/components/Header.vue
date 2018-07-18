<template>
  <div class="header">
    <h2>{{ $route.name }}</h2>
    <a href="#" v-if="isLoggedIn" @click="logout">
      <img src="@/assets/sign-out-alt-solid.svg" alt="Sign in" style="height:20px">
    </a>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style scoped>
.header {
}
h2 {
  text-align: center;
  line-height: 50px;
  margin: 0;
}
a {
  position: fixed;
  top: 15px;
  right: 15px;
}
</style>
