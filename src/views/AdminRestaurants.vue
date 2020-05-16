<template>
  <div class="container py-5">
    <AdminNav />
    <router-link
      to="/admin/restaurants/new"
      class="btn btn-primary mb-5"
    >
      Create New Restaurant
    </router-link>
    <AdminRestTable />
  </div>
</template>
<script>
import AdminNav from '../components/AdminNav'
import AdminRestTable from '../components/AdminRestTable'

export default {
  components: {
    AdminNav,
    AdminRestTable
  }
}
</script>