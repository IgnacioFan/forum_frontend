<template>
  <div class="card shadow-sm mt-4" id="favorite">
    <h6 class="mt-4 mb-1 pl-4 header">
      {{favoritedRestaurants.length > 0? favoritedRestaurants.length+'Favorited Restaurant': `0 Favorited Restaurant`}}
    </h6>
    <hr class="mx-3" />
    <div class="card-body">
      <div class="row">
        <template v-if="favoritedRestaurants.length > 0">
          <router-link
            class="my-2"
            v-for="restaurant in favoritedRestaurants"
            :key="restaurant.id"
            :to="{name: 'restaurant', params: {id: restaurant.id}}"
          >
            <div class="ml-2 mr-2 position-relative">
              <img
                class="card-img-top"
                :src="restaurant.image"
                :alt="restaurant.name"
                width="80px"
                height="80px"
              >
            </div>
          </router-link>
        </template>
        <template v-else>
          <h5 class="col-12 text-center p-3 m-0 text-muted">
            <i class="far fa-paper-plane mr-2"></i>No Favorite Restaurant Yet!
          </h5>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    favoritedRestaurants: {
      type: Array,
      required: true
    }
  }
}
</script>