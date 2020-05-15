<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      Latest Feeds
    </h1>
    <hr>
    <div class="row">
      <div class="col-md-6">
        <LatestRest :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <LatestComment :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script>
import restaurantsAPI from '../apis/restaurants'; 
import { Toast } from '../utils/helpers'
import NavTabs from '../components/NavTabs';
import LatestRest from '../components/LatestRest';
import LatestComment from '../components/LatestComment';

export default {
  components: {
    NavTabs,
    LatestRest,
    LatestComment
  },
  data() {
    return {
      restaurants: [],
      comments: []
    }
  },
  created() {
    this.fetchFeeds()
  },
  methods: {
    async fetchFeeds() {
      try {
        const response = await restaurantsAPI.getFeeds();
        
        const { restaurants, comments } = response.data;
        
        if (restaurants.length === 0) {
          Toast.fire({
            icon: 'warning',
            title: 'There was no latest restaurants!'
          })
        }

        if (comments.length === 0) {
          Toast.fire({
            icon: 'warning',
            title: 'There was no latest comments!'
          })
        }

        this.restaurants = restaurants
        this.comments = comments.filter(comment => comment.RestaurantId !== null)
      } catch(error) {
        console.log(error)
        
      }
    }
  }

}
</script>