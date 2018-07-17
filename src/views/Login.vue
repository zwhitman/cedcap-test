<template>
  <div class="login">
    <Login msg="Welcome to Your Mapper App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';

export default {
  name: 'login',
  components: {
    Login,
  },
};
</script>
