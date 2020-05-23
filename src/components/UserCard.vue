<template>
  <div class="col-3">
    <router-link 
      :to="{ name: 'user-profile', params: { id: user.id } }"
    >
      <img
        :src="user.image"
        width="140px"
        height="140px"
      >
    </router-link>
    <h2>{{user.name}}</h2>
    <span class="badge badge-secondary">Following: {{user.followerCount}}</span>
    <p class="mt-3">
      <button
        v-if="user.isFollowed"
        type="button"
        class="btn btn-danger"
        @click.stop.prevent="removeFollowing(user.id)"
      >
      not Follow
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary"
        @click.stop.prevent="addFollowing(user.id)"
      >
      Follow
      </button>
    </p>
  </div>
</template>
<script>
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      user: this.initialUser
    }
  },
  methods: {
    async removeFollowing(userId) {
      try {
        const { data } = await usersAPI.removeFollowing({userId});
        if(data.status !== 'success') throw new Error(data.message);
        this.user = {
          ...this.user,
          followerCount: this.user.followerCount-1,
          isFollowed: false
        }
      } catch(error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: "Cannot remove user's following, please try it later"
        });
      }
    },

    async addFollowing(userId) {
      try {
        const { data } = await usersAPI.addFollowing({userId});
        if(data.status !== 'success') throw new Error(data.message);
        this.user = {
          ...this.user,
          followerCount: this.user.followerCount+1,
          isFollowed: true
        }
      } catch(error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: "Cannot add user's following, please try it later"
        });
      }
    },
  }
}
</script>