<template>
    <div>
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Usuario:</label>
          <input type="text" v-model="username" required>
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password
            })
          });
          const data = await response.json();
          if (data.token) {
            localStorage.setItem('token', data.token);
            this.$router.push('/users');
          } else {
            alert('Error al iniciar sesión');
          }
        } catch (error) {
          console.error('Error al iniciar sesión', error);
        }
      }
    }
  };
  </script>
  