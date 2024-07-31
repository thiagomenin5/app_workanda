<template>
    <div>
      <Login />
      <UserList />
    </div>
  </template>
  
  <script>
  import Login from '../components/Login.vue';
  import UserList from '../components/UserList.vue';
  
  export default {
    components: {
      Login,
      UserList
    }
  };
  </script>
  