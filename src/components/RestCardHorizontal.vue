<template>
  <div class="row no-gutters">
    <div class="col-md-4">
      <a href="#">
        <img
          class="card-img-top"
          :src="restaurant.image"
          alt="Card image cap"
          width="240px"
          height="180px"
        >
      </a>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">
          {{ restaurant.name }}
        </h5>
        <span class="badge badge-secondary">Favorites：{{ restaurant.favoriteCount }}</span>
        <p class="card-text">
          {{ restaurant.description }}
        </p>
        <router-link
          :to="{ name: 'restaurant', params: { id: restaurant.id }}"
          class="btn btn-primary mr-2"
        >
          Show
        </router-link>

        <button
          v-if="restaurant.isFavorited"
          type="button"
          class="btn btn-danger mr-2"
          @click.stop.prevent="removeFavorite(restaurant.id)"
        >
          Remove Favorite
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary"
          @click.stop.prevent="addFavorite(restaurant.id)"
        >
          Add Favorite
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant
    }
  },
  methods: {
    async removeFavorite(restaurantId){
      try {
        const { data } = await usersAPI.removeFavorite({restaurantId});
        if(data.status !== 'success') throw new Error(data.message);
        this.restaurant = {
          ...this.restaurant,
          favoriteCount: this.restaurant.favoriteCount-1,
          isFavorited: false
        }
      } catch(error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Cannot remove restaurant to your favorites, please try it later!'
        })
      }
    },
    async addFavorite(restaurantId){
      try {
        const { data } = await usersAPI.addFavorite({restaurantId});
        if(data.status !== 'success') throw new Error(data.message);
        this.restaurant = {
          ...this.restaurant,
          favoriteCount: this.restaurant.favoriteCount+1,
          isFavorited: true
        }
      } catch(error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Cannot add restaurant to your favorites, please try it later!'
        })
      }
    }
  }
}
</script>