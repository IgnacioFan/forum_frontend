<template>
  <div class="card mt-4" id="following">
    <h6 class="mt-4 mb-1 pl-4 header">
      {{followers.length}} {{(followers.length > 1)? "people": "person"}} followed you
    </h6>
    <hr class="mx-3" />
    <div class="card-body">
      <div class="row">
        <template v-if="followers.length > 0">
          <router-link
            v-for="user in followers"
            :key="user.id"
            :to="{name: 'user-profile', params: {id: user.id}}"
          >
            <div class="ml-2 mr-2 position-relative">
              <img
                :src="user.image"
                width="80" height="80"
                :alt="user.name" class="rounded"
              >
            </div>
          </router-link>
        </template>
        <template v-else>
          <h5 class="col-12 text-center p-3 m-0 text-muted">
            No Follower Yet!
          </h5>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    initialUserFollowers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      followers: this.initialUserFollowers
    }
  }
}
</script>