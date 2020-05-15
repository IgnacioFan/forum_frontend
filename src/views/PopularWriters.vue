<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      Popular Writer
    </h1>
    <hr>
    <div class="row text-center">
      <UserCard 
        v-for="user in users"
        :key="user.id"
        :initial-user="user"
      />
    </div>
  </div>
</template>

<script>
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';
import NavTabs from '../components/NavTabs.vue';
import UserCard from '../components/UserCard.vue';

export default {
  components: {
    NavTabs,
    UserCard,
  },
  data() {
    return {
      users: [],
    }
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await usersAPI.getTopWriters();
        
        this.users = data.users.map( user => ({
          id: user.id,
          name: user.name,
          image: user.image,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed
        }));
    
      } catch(error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: 'Cannot fetch wirters, please try it later!'
        })
      }
    }
  }
}
</script>