<template>
  <div class="container py-5">
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
import RestDetail from '../components/RestDetail.vue';
import RestComment from '../components/RestComment.vue';
import CreateComment from '../components/CreateComment.vue';

const dummyData = {
    restaurant: {
        "id": 1,
        "name": "Judy Runte",
        "tel": "(918) 827-1962",
        "address": "98138 Elisa Road",
        "opening_hours": "08:00",
        "description": "dicta et cupiditate",
        "image": "https://loremflickr.com/320/240/food,dessert,restaurant/?random=1",
        "createdAt": "2019-06-22T09:00:43.000Z",
        "updatedAt": "2019-06-22T09:00:43.000Z",
        "CategoryId": 3,
        "Category": {
            "id": 3,
            "name": "義大利料理",
            "createdAt": "2019-06-22T09:00:43.000Z",
            "updatedAt": "2019-06-22T09:00:43.000Z"
        },
        "FavoritedUsers": [],
        "LikedUsers": [],
        "Comments": [
            {
                "id": 3,
                "text": "Quos asperiores in nostrum cupiditate excepturi aspernatur.",
                "UserId": 2,
                "RestaurantId": 1,
                "createdAt": "2019-06-22T09:00:43.000Z",
                "updatedAt": "2019-06-22T09:00:43.000Z",
                "User": {
                    "id": 2,
                    "name": "user1",
                    "email": "user1@example.com",
                    "password": "$2a$10$0ISHJI48xu/VRNVmEeycFe8v5ChyT305f8KaJVIhumu7M/eKAikkm",
                    "image": "https://i.imgur.com/XooCt5K.png",
                    "isAdmin": false,
                    "createdAt": "2019-06-22T09:00:43.000Z",
                    "updatedAt": "2019-06-23T01:16:31.000Z"
                }
            }
        ]
    },
    isFavorited: false,
    isLiked: false,
    currentUser: {
      id: 1,
      name: '管理者',
      email: 'root@example.com',
      image: 'https://i.pravatar.cc/300',
      isAdmin: true
    },
    isAuthenticated: true
};

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
      currentUser: {}
    }
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log('fetch id'+restaurantId);
      this.restaurant = {
        id: dummyData.restaurant.id,
        name: dummyData.restaurant.name,
        categoryName: dummyData.restaurant.Category.name,
        tel: dummyData.restaurant.tel,
        address: dummyData.restaurant.address,
        openingHours: dummyData.restaurant.opening_hours,
        description: dummyData.restaurant.description,
        image: dummyData.restaurant.image,
        isFavorited: dummyData.isFavorited,
        isLiked: dummyData.isLiked
      }
      this.comments = dummyData.restaurant.Comments
      this.currentUser = dummyData.currentUser
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
        restaurantId: restaurantId,
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