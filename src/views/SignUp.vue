<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign Up
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          v-model="name"
          type="text"
          class="form-control"
          placeholder="name"
          required
          autofocus
        >
      </div>
      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
        >
      </div>

      <div class="form-label-group mb-2">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="password"
          required
        >
      </div>

      <div class="form-label-group mb-2">
        <label for="passwordCheck">Password Check</label>
        <input
          id="passwordCheck"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="password"
          required
        >
      </div>

      <button
        :disabled="isProcessing"
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
      >
        Submit
      </button>
      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">
            Sign In
          </router-link>
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

/* eslint-disable */
export default {
  name: "SignUp",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit (e) {
      try {
        if(!this.name) return validateForm('without name');
        if(!this.email) return validateForm('without email');
        if(this.password !== this.passwordCheck){
          this.password = '';
          this.passwordCheck = '';
          return validateForm(', because passord-check is not equal to password');
        } 
        this.isProcessing = true;
        const { data } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        })
        if(data.status !== 'success') throw new Error(data.message);
        this.$router.push('/signin');
      } catch(error) {
        console.log(error)
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: 'Fail to sign up, please try it later!'
        })
      }
    }
  }
}
</script>