<template>
  <div 
    v-show="!isLoading"
    class="container py-5"
  >
    <div class="row">
      <div class="col-md-12">
        <h1>{{ restaurant.name }}</h1>
        <span class="badge badge-secondary mt-1 mb-3">
          {{ restaurant.categoryName }}
        </span>
      </div>
      <div class="col-md-4">
        <img
          class="img-responsive center-block"
          :src="restaurant.image | emptyImage"
          style="width: 250px;margin-bottom: 25px;"
        >
        <div class="well">
          <ul class="list-unstyled">
            <li>
              <strong>Opening Hour:</strong>
              {{ restaurant.openingHours }}
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
      <div class="col-md-8">
        <p>{{ restaurant.description }}</p>
      </div>
    </div>
    <hr>
    <button
      type="button"
      class="btn btn-link"
      @click="$router.back()"
    >Back</button>
  </div>
</template>
<script>
import adminAPI from '../apis/admin';
import { Toast } from '../utils/helpers';
import { emptyImageFilter } from '../utils/mixins';

export default {
  name: 'AdminRestaurant',
  mixins: [emptyImageFilter],
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: ''
      },
      isLoading: true
    }
  },
  beforeRouteUpdate(to, from, next){
    const { id: restaurantId } = to.params;
    this.fetchRestaurant(restaurantId);
    next();
  },
  mounted () {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({restaurantId});
        this.restaurant = {
          ...this.restaurant,
          id: data.restaurant.id,
          name: data.restaurant.name,
          categoryName: data.restaurant.Category.name,
          tel: data.restaurant.tel,
          address: data.restaurant.address,
          description: data.restaurant.description,
          image: data.restaurant.image,
          openingHours: data.restaurant.opening_hours
        }
        this.isLoading = false;
      } catch(error) {
        this.isLoading = false;
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: 'Cannot load this restaurant info, please try it later!'
        })
      }
    }
  }
}
</script>