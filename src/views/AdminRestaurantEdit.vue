<template>
  <div class="container py-5">
    <AdminRestForm 
      :initial-restaurant="restaurant"
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import adminAPI from '../apis/admin';
import { Toast } from '../utils/helpers';
import AdminRestForm from '../components/AdminRestForm.vue';

export default {
  components: {
    AdminRestForm
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ""
      },
      isProcessing: false
    }
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  beforeRouteUpdate(to, from, next){
    const { id: restaurantId } = to.params;
    this.fetchRestaurant(restaurantId);
    next();
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({restaurantId});
        console.log(data);
        this.restaurant = {
          ...this.restaurant,
          id: data.restaurant.id,
          name: data.restaurant.name,
          categoryId: data.restaurant.CategoryId,
          tel: data.restaurant.tel,
          address: data.restaurant.address,
          description: data.restaurant.description,
          image: data.restaurant.image,
          openingHours: data.restaurant.opening_hours
        };
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Cannot receive this restaurant info, please try it later!'
        })
      }
    },
    async handleAfterSubmit (formData) {
      try {
        this.isProcessing = true;
        // print 表單資料
        for (let [name, value] of formData.entries()) {
          console.log(name + ': ' + value);
        } 
        // 透過 API 將表單資料送到伺服器
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData
        })
        if(data.status !== 'success') throw new Error(data.message);
        this.$router.push({ name: 'admin-restaurants'})
      } catch (error) {
        this.isProcessing = false
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: 'Cannot update this restaurant info, please try it later!'
        })
      }
    }
  }
}
</script>