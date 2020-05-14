<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign In Page
        </h1>
      </div>
      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          
          autofocus
        >
      </div>
      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="password"
          
        >
      </div>
      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2019-2020
      </p>
    </form>
  </div>
  
</template>

<script>
import authorizationAPI from '../apis/authorization';
import { Toast } from '../utils/helpers';

export default {
  name: 'SignIn',
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false
    }
  },
  methods: {
    handleSubmit () {
      
      if(!(this.email && this.password)) {
        Toast.fire({
          icon: 'warning',
          title: 'Please, enter email and password!'
        });
        return;
      }

      this.isProcessing = true;

      authorizationAPI.signIn({
        email: this.email,
        password: this.password
      }).then(response => {
        console.log('response', response.data)
        // pick data object from response
        const { data } = response

        if(data.status !== 'success') throw new Error(data.message)
        localStorage.setItem('token', data.token)
        this.$router.push('/restaurants')
      }).catch(error => {
        this.password = '';
        Toast.fire({
          icon: 'warning',
          title: 'Please, confirm your email and password!'
        });
        this.isProcessing = false;
        console.log('error', error);
      })
    }
  }
}
</script>