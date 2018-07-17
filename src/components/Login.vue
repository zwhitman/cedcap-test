<template>
  <div id="login" class="login">
    <h1 class="login-message">{{ msg }}</h1>
    <h4>May it be a light for you in dark places, when all other lights go out</h4>
      <!--<router-link to="/login" v-if="!isLoggedIn">Login</router-link>-->
      <a href="#" v-if="isLoggedIn" @click="logout">Logout</a> 

    <form @submit.prevent="login({ email, password })">
     <input type="text" placeholder="email" v-model="email">
     <br>
     <input type="password" placeholder="password" v-model="password">
     <button id="login-button" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String,
    isLoggedIn: String,
  },
data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      }).then(() => {
	var element = document.getElementById("login");
	element.classList.add("hide");
        this.$router.push("/")
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  background-color: rgba(255,255,255,0.8); 
  height: calc(100vh - 50px);
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 9999999999 !important;
}
h1 {
  color: rgba(0,0,0,.7);
}
h4 {
  text-align: center;
  padding: 10vw;
  color: rgba(0,0,0,.7);
}
#login-button {
  background-color: #238CF3;
  width: 100vw;
  line-height: 50px;
  color: white;
  font-size: 1.5em;
  position: fixed;
  bottom: 0;
  left: 0;
}
.login-message {
  margin-top: 20vh;
  text-align: center;
}
.hide {
  display: none;
}
input {
  width: calc( 100vw - 50px);
  margin: 5px 20px;
  line-height: 30px;
  font-size: 1em;
  padding: 5px;
  border: solid 1px #238CF3;
}
</style>
