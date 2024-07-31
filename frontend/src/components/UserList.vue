<template>
    <div>
      <h2>Lista de Usuarios</h2>
      <button @click="showForm">Agregar Usuario</button>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>
              <button @click="editUser(user)">Editar</button>
              <button @click="deleteUser(user.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <UserForm v-if="showUserForm" @close="hideForm" @save="fetchUsers" :user="currentUser"/>
    </div>
  </template>
  
  <script>
  import UserForm from './UserForm.vue';
  
  export default {
    components: {
      UserForm
    },
    data() {
      return {
        users: [],
        showUserForm: false,
        currentUser: null
      };
    },
    methods: {
      async fetchUsers() {
        const response = await fetch('http://localhost:3000/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.users = await response.json();
      },
      showForm() {
        this.currentUser = null;
        this.showUserForm = true;
      },
      hideForm() {
        this.showUserForm = false;
      },
      editUser(user) {
        this.currentUser = user;
        this.showUserForm = true;
      },
      async deleteUser(id) {
        await fetch(`http://localhost:3000/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.fetchUsers();
      }
    },
    created() {
      this.fetchUsers();
    }
  };
  </script>
  