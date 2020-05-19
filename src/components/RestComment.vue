<template>
  <div>
    <h2 class="my-4">
      All Comments：
    </h2>
    <div
      v-for="comment in restaurantComments"
      :key="comment.id"
    >
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          type="button"
          class="btn btn-danger float-right"
          :disabled="isProcessing"
          @click.stop.prevent="handleDeleteBtnClick(comment.id)"
        >
          Delete
        </button>
        <h3>
          <a href="#">
            {{ comment.User.name }}
          </a>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr>
    </div>
  </div>
</template>
<script>
import commentAPI from '../apis/comment';
import { Toast } from '../utils/helpers';
import { fromNowFilter } from '../utils/mixins';
import { mapState } from 'vuex';

export default {
  mixins: [ fromNowFilter ],
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false
    }
  },
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    async handleDeleteBtnClick(commentId) {
      try {
        console.log('Handle Delete Button Click', commentId);
        this.isProcessing = true;
        const { data } = await commentAPI.delete({commentId});
        if(data.status !== 'success') throw new Error(data.message);
        this.isProcessing = false;
        this.$emit('after-delete-comment', commentId);
      } catch (error) {
        console.log(error);
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: 'Cannot delete this comment, please try it later!'
        });
      }
    }
  }
}
</script>
