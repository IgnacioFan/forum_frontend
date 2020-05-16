<template>
  <table 
    v-show="!isLoading"
    class="table"
  >
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th
          scope="col"
          width="300"
        >
          operation
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{ name: 'admin-restaurant', params: {id: restaurant.id} }"
            class="btn btn-link"
          >Show</router-link>

          <router-link
            :to="{ name: 'admin-restaurants-edit', params: { id: restaurant.id }}"
            class="btn btn-link"
          >Edit</router-link>

          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="removeRestaurant(restaurant.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import adminAPI from '../apis/admin';
import { Toast } from '../utils/helpers';

export default {
  data () {
    return {
      restaurants: [],
      isLoading: true
    }
  },
  created () {
    this.fetchRestaurants()
  },
  methods: {
    async fetchRestaurants () {
      try {
        const { data } = await adminAPI.restaurants.get();
        this.restaurants = data.restaurants;
        this.isLoading = false;
      } catch(error) {
        console.log(error);
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: 'Cannot fetch all restaurants, please try it later!'
        })
      }
    },
    async removeRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.delete({restaurantId});
        if(data.status !== 'success') throw new Error(data.message);
        this.restaurants = this.restaurants.filter(
          restaurant => restaurant.id !== restaurantId
        );
      }catch(error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Cannot delete this restaurant, please try it later!'
        })
      }
    }
  }
}
</script>