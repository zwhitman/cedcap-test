<template>
  <div id="app">
    <div v-if="!isLoggedIn" class="login">
      <Login msg="Welcome to Your Mapper App"/>
    </div>
    <div id="header">
      <Header/>
    </div>
    <div id="global-container">
      <!--<router-view/>-->
      <!--consider keep-alive-->
      <Map v-bind:active-item="activeLocation"></Map>
      <Todo/>
    </div>
    <div id="nav">
      <router-link to="/todo">TODO</router-link>
      <router-link to="/">Map</router-link>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Login from '@/components/Login.vue';
import Map from '@/components/Map.vue';
import Todo from '@/components/Todo.vue';

require('./assets/Metro_Stations_Regional.geojson'); //with path



export default {
  components: {
    Header,
    Login,
    Map,
    Todo,
  },
  mounted() {
    this.$store.dispatch("getData", {
      data: data
    });

    var store = this.$store

    function success(pos) {
      var crd = pos.coords;
      var latlng = [crd.longitude, crd.latitude]
      console.log(latlng)
      store.dispatch("addUserLocation", latlng)
    }
      navigator.geolocation.getCurrentPosition(success)
  },
  methods: {
    logout() {
     this.$store.dispatch('logout');
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    currentUserLocation() {
      return this.$store.getters.getUserLocation;
    },
    activeLocation() {
      return this.$store.getters.getActiveLocation;
    },
  }
}
</script>


<style>
body {
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#header {
  height: 50px;
}

#global-container {
  position: fixed;
  top: 50px;
  bottom: 50px;
  width: 100vw;
  overflow: auto;
}
#nav {
  background-color: white;
  position: absolute;
  width: 100vw;
  bottom: 0;
  height: 50px;
  background-color: smokegrey;
  line-height: 50px;
  display: flex;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 5px 0 5px;
  text-decoration: none;
  flex: auto;
  text-align: center;
}

#nav a.router-link-exact-active {
  color: white;
  background-color: #238CF3;
}
</style>
