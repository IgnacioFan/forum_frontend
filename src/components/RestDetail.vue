<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block" 
        :src="restaurant.image"
        style="width: 250px;margin-bottom: 25px;"
      >
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours}}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        :to="{ name: 'restaurant-dashboard', params: { id: restaurant.id }}"
        class="btn btn-primary btn-border mr-2"
      >Dashboard</router-link>

      <button
        v-if="restaurant.isFavorited"
        type="button"
        class="btn btn-danger btn-border mr-2"
        @click.stop.prevent="removeFavorited"
      >
        Remove Favorite
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary btn-border mr-2"
        @click.stop.prevent="addFavorited"
      >
        Add Favorite
      </button>
      <button
        v-if="restaurant.isLiked"
        type="button"
        class="btn btn-danger like mr-2"
        @click.stop.prevent="removeLiked"
      >
        Unlike
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary like mr-2"
        @click.stop.prevent="addLiked"
      >
        Like
      </button>
    </div>
  </div>
</template>
<script>
import userAPI from '../apis/users';
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
      restaurant: this.initialRestaurant,
      isProcesssing: false
    }
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
  methods: {
    removeFavorited() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false
      }
    },
    addFavorited(){
      this.restaurant = {
        ...this.restaurant,
        isFavorited: true
      }
    },
    async removeLiked(){
      try{
        const restaurantId = this.restaurant.id
        this.isProcesssing = true;
        const { data } = await userAPI.removeLike({ restaurantId });
        console.log(data)
        if(data.status !== 'success') throw new Error(data.message);
        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        }
        this.isProcesssing = false;
      } catch(error) {
        this.isProcesssing = false;
        Toast.fire({
          icon: 'error',
          title: 'Cannot remove like to this restaurant, please try it later!'
        });
      }
    },
    async addLiked(){
      try{
        const restaurantId = this.restaurant.id
        this.isProcesssing = true;
        const { data } = await userAPI.addLike({ restaurantId });
        console.log(data)
        if(data.status !== 'success') throw new Error(data.message);
        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        }
        this.isProcesssing = false;
      } catch(error) {
        this.isProcesssing = false;
        Toast.fire({
          icon: 'error',
          title: 'Cannot add like to this restaurant, please try it later!'
        });
      }
    }
  }
}
</script>