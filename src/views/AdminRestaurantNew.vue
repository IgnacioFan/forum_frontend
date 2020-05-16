<template>
  <div class="container py-5">
    <AdminRestForm 
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit"
    />
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
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit(formData){
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.create({formData});
        if(data.status !== 'success') throw new Error(data.message);
        this.$router.push({ name: 'admin-restaurants' });
      } catch(error) {
        console.log(error);
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: 'Cannot create a new restaurant, please try it later!'
        })
      }
    }
  }
}
</script>