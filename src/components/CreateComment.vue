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
        :disabled="isProcessing"
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
import commentAPI from '../apis/comment';
import { Toast, validateForm } from '../utils/helpers';

export default {
  props:{
    restaurantId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      text: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        // console.log('submit');
        if(this.text === '') return validateForm('without text input!');
        this.isProcessing = true;
        const { data } = await commentAPI.create({ 
          restaurantId: this.restaurantId, 
          text: this.text
        });
        console.log(data)
        if(data.status !== 'success') throw new Error(data.message);

        this.$emit('after-create-comment', {
          commentId: data.commentId,
          restaurantId: this.restaurantId,
          text: this.text
        });
        this.isProcessing = false;
        this.text = '';
      } catch (error) {
        console.log(error);
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: 'Cannot add comment, please try it later!'
        });
      }
    },
  }
}
</script>
