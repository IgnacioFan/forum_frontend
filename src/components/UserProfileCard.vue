<template>
  <section class="col-12 row m-0 p-0">
    <section class="col-12 col-md-5" id="profile-section">
      <!--Personal Info-->
      <ul class="list-group text-center shadow-sm">
        <li class="list-group-item p-0 pt-4 px-2 border-0 avatar">
          <img
            :src="profile.image"
            width="140px"
            height="140px"
          >
        </li>
        <li class="list-group-item p-0 pt-2 px-2 border-0">
          <h4 class="m-0 user-name">{{ profile.name }}</h4>
        </li>
        <li class="list-group-item p-0 border-0 px-2 text-secondary">{{ profile.email }}</li>
        <li class="list-group-item px-2 border-0">
          <router-link
            v-if="profile.id === currentUser.id"
            :to="{ name: 'user-profile-edit', params: { id: profile.id} }"
            class="btn btn-primary"
            role="button"
          >Edit</router-link>
        </li>
        <li v-if="isFollowed" class="list-group-item py-4 px-2 border-0">
          <button
            type="button"
            class="btn btn-danger"
            @click.stop.prevent="removeFollow(profile.id)"
          >
            unFollow
          </button>
        </li>
        <li v-else class="list-group-item py-4 px-2 border-0">
          <button
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="addFollow(profile.id)"
          >
            Follow
          </button>
        </li>
      </ul>
    </section>
    <section class="col-12 col-md-7" id="status-section">
      <!--Data Summary-->
      <div class="row bg-white shadow-sm rounded text-center text-secondary w-100 mx-0 h-100">
        <div class="col-6 px-3 py-4 d-flex flex-column justify-content-center">
          <h2 class="mb-2">{{ profile.commentNumbers }}</h2>
          <p class="m-0">Commented Restaurants</p>
        </div>
        <div class="col-6 px-3 py-4 d-flex flex-column justify-content-center">
          <h2 class="mb-2">{{ profile.favoriteRestaurantNumbers }}</h2>
          <p class="m-0">Favorited Restaurants</p>
        </div>
        <div class="col-6 px-3 py-4 d-flex flex-column justify-content-center">
          <h2 class="mb-2">{{ profile.followingNumbers }}</h2>
          <p class="m-0">Followed Users</p>
        </div>
        <div class="col-6 px-3 py-4 d-flex flex-column justify-content-center">
          <h2 class="mb-2">{{ profile.followerNumbers }}</h2>
          <p class="m-0">Users Following You</p>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import userAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  props: {
    profile: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    },
    initialIsFollowed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isFollowed: this.initialIsFollowed
    }
  },
  watch: {
    initialIsFollowed(isFollowed){
      this.isFollowed = isFollowed
    } 
  },
  methods: {
    async removeFollow(userId) {
      try {
        const { data } = await userAPI.removeFollowing({ userId });
        if(data.status !== 'success') throw new Error(data.message);
        this.isFollowed = false;
        this.profile.followerNumbers--;
        this.$emit("after-remove-follower");
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: "Cannot remove this user's following, please try it later"
        });
      }
    },
    async addFollow(userId) {
      try {
        const { data } = await userAPI.addFollowing({ userId });
        if(data.status !== 'success') throw new Error(data.message);
        this.isFollowed = true;
        this.profile.followerNumbers++;
        this.$emit("after-add-follower");
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: "Cannot follow this user, please try it later"
        });
      }
    }
  }
}
</script>
