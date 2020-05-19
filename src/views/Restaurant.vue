<template>
  <div 
    v-show="!isLoading"
    class="container py-5"
  >
    <h1>Restaurant Info</h1>
    <RestDetail :initial-restaurant="restaurant"/>
    <hr>
    <RestComment 
      :restaurant-comments="comments"
      @after-delete-comment="afterDeleteComment"
    />
    <CreateComment 
      :restaurant-id="restaurant.id" 
      @after-create-comment="afterCreateComment"  
    />
  </div>
</template>
<script>
import restaurantsAPI from '../apis/restaurants';
import { Toast } from '../utils/helpers';
import { mapState } from 'vuex';
import RestDetail from '../components/RestDetail.vue';
import RestComment from '../components/RestComment.vue';
import CreateComment from '../components/CreateComment.vue';

export default {
  components: {
    RestDetail,
    RestComment,
    CreateComment,
  },
  data() {
    return{
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        tel: '',
        address: '',
        openingHours: '',
        description: '',
        image: '',
        isFavorited: false,
        isLiked: false
      },
      comments: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant({restaurantId})
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchRestaurant({restaurantId});
    next();
  },
  methods: {
    async fetchRestaurant({restaurantId}) {
      try {
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId });
        // console.log('restaurant', response)
        // if(response.status !== 200) throw new Error();
        const { restaurant, isFavorited, isLiked } = data;
        this.restaurant = {
          id: restaurant.id,
          name: restaurant.name,
          categoryName: (restaurant.Category.name)? restaurant.Category.name: 'undecided',
          tel: restaurant.tel,
          address: restaurant.address,
          openingHours: restaurant.opening_hours,
          description: restaurant.description,
          image: restaurant.image,
          isFavorited: isFavorited,
          isLiked: isLiked
        }
        this.comments = restaurant.Comments;
        this.isLoading = false;
      } catch(error) {
        console.log(error);
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: 'Cannot fetch this restaurant info, please try it later!'
        });
      }
    },
    afterDeleteComment(commentId) {
      this.comments = this.comments.filter(
        comment => comment.id !== commentId
      );
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload;
      this.comments.push({
        id: commentId,
        text: text,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        createdAt: new Date()
      })
    }
  }
}
</script>