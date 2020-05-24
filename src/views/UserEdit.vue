<template>
  <div 
    v-show="!isLoading"
    class="container py-5"
  >
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="userProfile.name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        >
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="userProfile.image"
          :src="userProfile.image"
          class="d-block img-thumbnail mb-3"
          width="300"
          height="300"
        >
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        >
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isProcessing"
      >
        Submit
      </button>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import userAPI from '../apis/users';
import { Toast, validateForm } from '../utils/helpers';

export default {
  data() {
    return {
      userProfile: {
        id: -1,
        name: '',
        image: ''
      },
      isLoading: true,
      isProcessing: false 
    }
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    const { id: userId } = this.$route.params;
    this.setUserProfile(userId);
  },
  beforeRouteUpdate(to, from, next){
    const { id: userId } = to.params;
    this.setUserProfile(userId);
    next();
  },
  methods: {
    setUserProfile(userId) {
      try {
        if(this.currentUser.id !== userId) return this.$router.push(`/users/${userId}`);
      
        this.userProfile = {
          ...this.userProfile,
          id: this.currentUser.id,
          name: this.currentUser.name,
          image: this.currentUser.image
        }
        this.isLoading = false;
      } catch(error) {
        console.log('set user profile: ',error);
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: 'Cannot fetch user profile, please try it later!'
        });
      }
    },
    handleFileChange(e) {
      const files = e.target.files;
      // console.log(files)
      if(files === 0) return this.userProfile.image;
      else {
        const imageUrl = window.URL.createObjectURL(files[0]);
        this.userProfile.image = imageUrl;
      }
    },
    async handleSubmit(e) {
      try {
        this.isProcessing = true;
        if(this.userProfile.name === '') {
          this.isProcessing = false;
          return validateForm('without name');
        }
        const form = e.target;
        const formData = new FormData(form);
        for(let [key, value] of formData.entries()){
          console.log(`${key} : ${value}`);
        }
        const userId = this.userProfile.id;
        const { data } = await userAPI.editUser({userId, formData});
        if(data.status !== 'success') throw new Error(data.message);
        this.$router.push(`/users/${userId}`);
      } catch (error) {
        // console.log('user edit submit: ', error);
        this.isProcessing = false; 
        Toast.fire({
          icon: 'error',
          title: 'Cannot edit user profile, please try it later!'
        });
      }
    }
  }
}
</script>
