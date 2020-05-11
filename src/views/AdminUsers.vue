<template>
  <div class="container py-5">
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th
            scope="col"
            width="140"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <th scope="row">
            {{ user.id }}
          </th>
          <td>{{ user.name }}</td>
          <td>{{ user.isAdmin? 'admin': 'user' }}</td>
          <td>
            <template v-if="currentUser.id !== user.id">
            <button
              v-if="user.isAdmin"
              type="button"
              class="btn btn-link"
              @click="toggleUserRole(user.id)"
            >
              set as admin
            </button>
            <button
              v-else
              type="button"
              class="btn btn-link"
              @click="toggleUserRole(user.id)"
            >
              set as user
            </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import AdminNav from '../components/AdminNav.vue';
const dummyData = {
  users: [
    {
      id: 1,
      name: 'root',
      email: 'root@example.com',
      isAdmin: true,
    },
    {
      id: 2,
      name: 'user1',
      email: 'user1@example.com',
      isAdmin: false,
    },
    {
      id: 3,
      name: 'user2',
      email: 'user2@example.com',
      isAdmin: false,
    }
  ]
}
export default {
  components: {
    AdminNav,
  },
  data() {
    return {
      currentUser: {
        id: 1
      },
      users: []
    }
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.users  = dummyData.users;
    },
    toggleUserRole(userId) {
      this.users = this.users.map(user => {
        if(user.id === userId){
          console.log(userId)
          return {
            ...user,
            isAdmin: !user.isAdmin
          }
        }
        return user;
      });
    }
  }
}
</script>
