<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="restaurant.image"
        alt="Card image cap"
        width="286px"
        height="180px"
      >
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }" >
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{ restaurant.Category.name }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button 
          v-if="restaurant.isFavorited" 
          type="button" 
          class="btn btn-danger btn-border favorite mr-2"
          @click.stop.prevent="removeFavorite(restaurant.id)"
        >
          remove favorite
        </button>
        <button 
          v-else type="button" 
          class="btn btn-primary btn-border favorite mr-2"
          @click.stop.prevent="addFavorite(restaurant.id)"
        >
          add favorite
        </button>
        <button 
          v-if="restaurant.isLiked" 
          type="button" 
          class="btn btn-danger like mr-2"
          @click.stop.prevent="removeLike(restaurant.id)"
        >
         Unlike
        </button>
        <button 
          v-else type="button" 
          class="btn btn-primary like mr-2"
          @click.stop.prevent="addLike(restaurant.id)"
        >
          Like
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
    async addFavorite (restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({restaurantId});

        if(data.status !== 'success') throw new Error(data.message);

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        };
      } catch(error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Cannot add restaurant to your favorites, please try it later!'
        })
      }
    },
    async removeFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.removeFavorite({restaurantId});

        if(data.status !== 'success') throw new Error(data.message);

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        };
      } catch(error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Cannot remove restaurant to your favorites, please try it later!'
        })
      }
    },
    async addLike(restaurantId) {
      try {
        const { data } = await usersAPI.addLike({restaurantId});

        if(data.status !== 'success') throw new Error(data.message);

        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        };
      } catch(error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Cannot like this restaurant, please try it later!'
        })
      }
    },
    async removeLike(restaurantId) {
      try {
        const { data } = await usersAPI.removeLike({restaurantId});

        if(data.status !== 'success') throw new Error(data.message);

        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        };
      } catch(error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Cannot dislike this restaurant, please try it later!'
        })
      }
    }
  }
}
</script>