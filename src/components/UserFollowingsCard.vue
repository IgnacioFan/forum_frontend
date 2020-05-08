<template>
  <div class="card mt-4" id="following">
    <h6 class="mt-4 mb-1 pl-4 header">
      {{followings.length}} {{(followings.length > 1)? "people": "person"}}, you are following
    </h6>
    <hr class="mx-3" />
    <div class="card-body">
      <div class="row">
        <template v-if="followings.length > 0">
          <router-link
            v-for="user in followings"
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
            No Following User Yet!
          </h5>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    initialUserFollowings: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      followings: this.initialUserFollowings
    }
  }
}
</script>