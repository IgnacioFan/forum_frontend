<template>
  <div 
    v-show="!isLoading"
    class="container py-5"
  >
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
              v-if="!user.isAdmin"
              type="button"
              class="btn btn-link"
              @click.stop.prevent="toggleUserRole(user.id)"
            >
              set as admin
            </button>
            <button
              v-else
              type="button"
              class="btn btn-link"
              @click.stop.prevent="toggleUserRole(user.id)"
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
import adminAPI from '../apis/admin';
import AdminNav from '../components/AdminNav';
import { Toast } from '../utils/helpers';
import { mapState } from 'vuex';

export default {
  components: {
    AdminNav,
  },
  data() {
    return {
      users: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const { data } = await adminAPI.users.get();
        console.log(data.users)
        this.users  = data.users;
        this.isLoading = false;
      } catch (error) {
        console.log('fetch users error: ',error);
        this.isLoading = true;
        Toast.fire({
          icon: 'error',
          title: 'Cannot fetch all users, please try it later!'
        });
      }
    },
    async toggleUserRole(userId) {
      try {
        const { data } = await adminAPI.users.toggleRole({userId});
        if(data.status !== 'success') throw new Error(data.message);
        this.users = this.users.map(user => {
          if(user.id === userId){
              return {
                ...user,
                isAdmin: !user.isAdmin
              }
            }
            return user;
        });
      } catch (error) {
        console.log('toggle user role error: ',error);
        Toast.fire({
          icon: 'error',
          title: 'Cannot toggle this user, please try it later!'
        });
      }
    }
  }
}
</script>
