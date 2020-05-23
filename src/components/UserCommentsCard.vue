<template>
  <div class="card shadow-sm mt-4" id="comment">
    <h6 class="mt-4 mb-1 pl-4 header">
      {{comments.length > 0? comments.length+'Comment For Restaurants': `0 Comment For Restaurants`}}
    </h6>
    <hr class="mx-3" />
    <div class="card-body">
      <div class="row">
        <template v-if="comments.length > 0">
          <router-link
            class="my-2"
            v-for="comment in comments"
            :key="comment.id"
            :to="{name: 'restaurant', params: {id: comment.Restaurant.id}}"
          >
            <div class="ml-2 mr-2 position-relative">
              <img
                class="card-img-top"
                :src="comment.Restaurant.image"
                :alt="comment.Restaurant.name"
                width="80px"
                height="80px"
              >
            </div>
            
          </router-link>
        </template>
        <template v-else>
          <h5 class="col-12 text-center p-3 m-0 text-muted">
            <i class="far fa-paper-plane mr-2"></i>No Comment Yet!
          </h5>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>