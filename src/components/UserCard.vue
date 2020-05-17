<template>
  <div class="col-3">
    <a href="#">
      <img
        src="http://via.placeholder.com/300X300?test=No+Image"
        width="140px"
        height="140px"
      >
    </a>
    <h2>{{user.name}}</h2>
    <span class="badge badge-secondary">Following: {{user.FollowerCount}}</span>
    <p class="mt-3">
      <button
        v-if="user.isFollowed"
        type="button"
        class="btn btn-danger"
        @click.stop.prevent="removeFollowing"
      >
      not Follow
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary"
        @click.stop.prevent="addFollowing"
      >
      Follow
      </button>
    </p>
  </div>
</template>
<script>
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
    removeFollowing() {
      this.user = {
        ...this.user,
        isFollowed: false
      }
    },

    addFollowing() {
      this.user = {
        ...this.user,
        isFollowed: true
      }
    },
  }
}
</script>