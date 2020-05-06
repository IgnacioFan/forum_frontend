<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">Leave Comment：</label>
      <textarea
        v-model="text"
        class="form-control"
        rows="3"
        name="text"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button
        type="button"
        class="btn btn-link"
        @click="$router.back()"
      >Back</button>

      <button
        type="submit"
        class="btn btn-primary mr-0"
      >
        Submit
      </button>
    </div>
  </form>
</template>
<script>
import uuid from 'uuid/v4';

export default {
  props:{
    restaurantId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    handleSubmit() {
      console.log('submit');
      this.$emit('after-create-comment', {
        restaurantId: this.restaurantId,
        commentId: uuid(),
        text: this.text,
      });
      this.text = '';
    },
  }
}
</script>
