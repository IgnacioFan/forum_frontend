<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      Top Restaurants
    </h1>

    <hr>
    <div
      class="card mb-3"
      style="max-width: 640px;margin: auto;"
    >
      <RestCardHorizontal 
        v-for="restaurant in topRestaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>
  </div>
</template>

<script>
import restaurantsAPI from '../apis/restaurants';
import { Toast } from '../utils/helpers';
import NavTabs from '../components/NavTabs';
import RestCardHorizontal from '../components/RestCardHorizontal';

export default {
  components: {
    NavTabs,
    RestCardHorizontal,
  },
  data() {
    return {
      topRestaurants: []
    }
  },
  created(){
    this.fetchTopRestaurant();
  },
  methods: {
    async fetchTopRestaurant() {
      try {
        const { data } = await restaurantsAPI.getTopRestaurants();
        // console.log(data)
        this.topRestaurants = data.restaurants.map(restaurant => ({
          id: restaurant.id,
          name: restaurant.name,
          image: restaurant.image,
          description: restaurant.description,
          isFavorited: restaurant.isFavorited,
          favoriteCount: restaurant.FavoriteCount,
        }))
      } catch(error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: 'Cannot find top restaurants, please try it again!'
        });
      }
    }
  }
}
</script>