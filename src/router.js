import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';
import TheMap from './views/Map.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'map',
      component: TheMap,
    },
    {
      path: '/todo',
      name: 'todo',
      component: About,
    },
  ],
});
