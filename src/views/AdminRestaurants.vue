<template>
  <div class="container py-5">
    <AdminNav />
    <router-link
      to="/admin/restaurants/new"
      class="btn btn-primary mb-5"
    >
      Create New Restaurant
    </router-link>
    <AdminRestaurantsTable />
  </div>
</template>
<script>
import AdminNav from '../components/AdminNav'
import AdminRestaurantsTable from '../components/AdminRestaurantsTable'

export default {
  components: {
    AdminNav,
    AdminRestaurantsTable
  }
}
</script>