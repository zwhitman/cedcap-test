<template>
  <div v-if="$route.name == 'todo'" id="todo">
    <div class="todo-el" v-for="item in getAddresses">
	<div v-on:click="test(item)" class="el-container">
	  <h5>{{ item.properties.ADDRESS }}</h5>
	  <p class="lat-lon">{{ item.geometry.coordinates[1].toFixed(2) }}&deg N<br>{{ item.geometry.coordinates[0].toFixed(2)*-1 }}&deg W</p>
	  <router-link class="go-button" to="/" tag="button">GO &rarr;</router-link>
	</div>
    </div>
 </div>
</template>

<script>
export default {
  name: 'todo',
  props: {
    msg: String,
    message: String,
  },
  computed: {
    getAddresses() {
      return this.$store.getters.getAddresses.features
    }
  },
  methods: {
    goButton(item) {
      console.log('goButton')
      this.$store.dispatch("addActiveItem", item.geometry.coordinates)
//      this.$store.dispatch("addUserLocation", item.geometry.coordinates)
    },
    test(item) {
      console.log('test')
      console.log(this.$store.getters.getActiveItem)
      
      this.$store.dispatch("addActiveItem", item.geometry.coordinates)
      if(this.$store.getters.getUserLocation == []){
	this.$store.dispatch("addUserLocation", item.geometry.coordinates)
      }

    }
  },
};

</script>

<style scoped>
.el-container {
  border-bottom: solid 1px lightgrey;
  padding: 10px;
  position: relative;
  background-color: rgba(255,255,255,1);
  height: 80px;
  -webkit-transition: .2s; /* Safari */
  transition: .2s;
}

a {
  text-decoration: none;
}

.go-button {
  display: none;
}

.el-container:hover > .go-button {
  display: inline;
  position: absolute;
  right: 15px;
  bottom: 25px;
  height: 40px;
  border: 1px solid #238CF3;
  width: 50px;
  background-color: white;
}

.el-container:hover {
  height: 200px;
  background-color: rgba(255,255,255,.6);
}

.el-container > h4 {
  margin: 5px;
  padding-top:10px;
  max-width: 200px;
  position: absolute;
  bottom: 40px;
}

.el-container > h5 {
  margin: 5px;
  position: absolute;
  bottom: 20px;
  max-width: 220px;
}

.el-container > p {
  position: absolute;
  margin: 0;
  top: 0px;
  right: 0px;
  padding: 5px 10px;
  background-color: rgba(255,255,255,.8);
  font-size: .5em;
  color: darkgrey;
}


</style>
