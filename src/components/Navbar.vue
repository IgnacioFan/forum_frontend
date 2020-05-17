<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand"
      to="/"
    >
      Restaurant Forum
    </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"/>
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user admin -->
        <router-link v-if="currentUser.isAdmin" to="/admin" class="text-white mr-3">Admin</router-link>
        <!-- is user login -->
        <template v-if="isAuthenticated">
          <router-link to="#" class="text-white mr-3">Hey, {{ currentUser.name || 'user' }}</router-link>
          <button type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0">Log out</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  }
}
</script>