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
import { Toast, validateForm } from '../utils/helpers';

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
    async handleSubmit () {
      try{
        // email and password input cannot be blank
        if(!(this.email && this.password)) return validateForm('without email and password!');
        // block the submit btn
        this.isProcessing = true;

        const { data } = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })

        if(data.status === 'error') throw new Error(data.message);
        // store token in localstorage in browser
        localStorage.setItem('token', data.token);
        // call vuex and pass user data to state
        this.$store.commit('setCurrentUser', data.user);
        // redirect to restaurants
        this.$router.push('/restaurants')
      } catch(error) {
        console.log('error', error);
        this.isProcessing = false;
        this.password = '';
        Toast.fire({
          icon: 'error',
          title: 'Please, confirm your email and password!'
        });
      }
    }
  }
}
</script>