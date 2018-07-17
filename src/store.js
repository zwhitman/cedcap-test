import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const DATA = "DATA";
const ACTIVEITEM = "ACTIVEITEM";
const USERLOCATION = "USERLOCATION";

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("token"),
    items: [],
    userLocation: [],
    activeItem: [],
  },
  mutations: {

    [LOGIN] (state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
    },
    [DATA](state, response) {
      state.items = response;
    },
    [ACTIVEITEM](state, response) {
      state.activeItem = response;
    },
    [USERLOCATION](state, response) {
      state.userLocation = response;
    },

  },
  actions: {

  login({ commit }, creds) {
     commit(LOGIN); // show spinner
     return new Promise(resolve => {
       setTimeout(() => {
         localStorage.setItem("token", "JWT");
         commit(LOGIN_SUCCESS);
         resolve();
       }, 1000);
     });
   },
   logout({ commit }) {
     localStorage.removeItem("token");
     commit(LOGOUT);
   },
  
    getData({ commit }, file) {
      var response = file
      commit(DATA, response.data);
    },

    addActiveItem({ commit }, payload) {
      commit(ACTIVEITEM, payload);
    },

    addUserLocation({ commit }, payload) {
      commit(USERLOCATION, payload);
    },

  },
  getters: {

    isLoggedIn: state => {
      return state.isLoggedIn
    },
    
    getAddresses: state => {
      return state.items
    },

    getActiveItem: state => {
      return state.activeItem
    },

    getUserLocation: state => {
      return state.userLocation
    },

  }
});
