<template>
    <div>
      <h2>{{ user ? 'Editar Usuario' : 'Agregar Usuario' }}</h2>
      <form @submit.prevent="saveUser">
        <div>
          <label for="username">Usuario:</label>
          <input type="text" v-model="username" required>
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">{{ user ? 'Actualizar' : 'Guardar' }}</button>
        <button type="button" @click="$emit('close')">Cancelar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['user'],
    data() {
      return {
        username: this.user ? this.user.username : '',
        password: ''
      };
    },
    methods: {
      async saveUser() {
        const url = this.user ? `http://localhost:3000/users/${this.user.id}` : 'http://localhost:3000/users';
        const method = this.user ? 'PUT' : 'POST';
        await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        this.$emit('save');
        this.$emit('close');
      }
    }
  };
  </script>
  