<template>
  <div class="container py-5">
    <AdminRestForm @after-submit="handleAfterSubmit"/>
  </div>
</template>
<script>
import AdminRestForm from '../components/AdminRestForm.vue';

export default {
  components: {
    AdminRestForm
  },
  methods: {
    handleAfterSubmit(formData){
      for(let [name, value] of formData.entries()){
        console.log(name, ' : ', value)
      }
    }
  }
}
</script>