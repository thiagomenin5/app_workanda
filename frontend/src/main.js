import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Login from './components/login.vue';
import UserList from './components/UserList.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Login },
  { path: '/users', component: UserList }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');