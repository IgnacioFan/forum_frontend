<template>
  <section class="col-12 row m-0 p-0">
    <section class="col-12 col-md-5" id="profile-section">
      <!--Personal Info-->
      <ul class="list-group text-center shadow-sm">
        <li class="list-group-item p-0 pt-4 px-2 border-0 avatar">
          <img
            :src="userProfile.image"
            width="140px"
            height="140px"
          >
        </li>
        <li class="list-group-item p-0 pt-2 px-2 border-0">
          <h4 class="m-0 user-name">{{ userProfile.name }}</h4>
        </li>
        <li class="list-group-item p-0 border-0 px-2 text-secondary">{{ userProfile.email }}</li>
        <li class="list-group-item px-2 border-0">
          <a
            v-if="userProfile.isAdmin"
            href="#"
            class="btn btn-primary"
            role="button"
          >Edit</a>
        </li>
        <li v-if="userProfile.isFollowed" class="list-group-item py-4 px-2 border-0">
          <button
            type="button"
            class="btn btn-danger"
            @click.stop.prevent="removeFollow"
          >
            unFollow
          </button>
        </li>
        <li v-else class="list-group-item py-4 px-2 border-0">
          <button
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="addFollow"
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
          <h2 class="mb-2">{{ userProfile.commentNumbers }}</h2>
          <p class="m-0">Commented Restaurants</p>
        </div>
        <div class="col-6 px-3 py-4 d-flex flex-column justify-content-center">
          <h2 class="mb-2">{{ userProfile.favoriteRestaurantNumbers }}</h2>
          <p class="m-0">Favorited Restaurants</p>
        </div>
        <div class="col-6 px-3 py-4 d-flex flex-column justify-content-center">
          <h2 class="mb-2">{{ userProfile.followingNumbers }}</h2>
          <p class="m-0">Followed Users</p>
        </div>
        <div class="col-6 px-3 py-4 d-flex flex-column justify-content-center">
          <h2 class="mb-2">{{ userProfile.followerNumbers }}</h2>
          <p class="m-0">Users Following You</p>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  props: {
    initialUserProfile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userProfile: this.initialUserProfile
    }
  },
  created(){

  },
  methods: {
    removeFollow() {
      this.userProfile = {
        ...this.userProfile,
        isFollowed: false
      }
    },
    addFollow() {
      this.userProfile = {
        ...this.userProfile,
        isFollowed: true
      }
    }
  }
}
</script>
