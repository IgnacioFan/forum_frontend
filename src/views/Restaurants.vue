<template>
  <div class="container py-5">
    <NavTabs />
    <RestNavPills :categories="categories" />

    <div class="row">
      <RestCard 
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>

    <RestPagination
      v-if="totalPage.length > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :category-id="categoryId"
      :previous-page="previousPage"
      :next-page="nextPage"
    />
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs.vue'
import RestCard from './../components/RestCard.vue'
import RestNavPills from './../components/RestNavPills.vue'
import RestPagination from './../components/RestPagination.vue'

const dummyData = {
  restaurants: [
    {
      'id': 49,
      'name': 'Russ Kertzmann',
      'tel': '087-274-1881',
      'address': '6601 Lura Lodge',
      'opening_hours': '08:00',
      'description': 'sed',
      'image': 'https://loremflickr.com/320/240/restaurant,food/?random=56.98329738383367',
      'viewCounts': null,
      'isFavorited': true,
      'isLiked': true,
      'createdAt': '2019-07-30T16:24:55.443Z',
      'updatedAt': '2019-07-30T16:24:55.443Z',
      'CategoryId': 4,
      'Category': {
        'id': 1,
        'name': '墨西哥料理',
        'createdAt': '2019-07-30T16:24:55.429Z',
        'updatedAt': '2019-07-30T16:24:55.429Z'
      }
    },
    {
      'id': 46,
      'name': 'Jasper Mueller',
      'tel': '254-159-2190',
      'address': '44890 Dominique Wall',
      'opening_hours': '08:00',
      'description': 'dolorem ratione et',
      'image': 'https://loremflickr.com/320/240/restaurant,food/?random=67.08831513935154',
      'viewCounts': null,
      'isFavorited': false,
      'isLiked': true,
      'createdAt': '2019-07-30T16:24:55.443Z',
      'updatedAt': '2019-07-30T16:24:55.443Z',
      'CategoryId': 2,
      'Category': {
        'id': 2,
        'name': '日本料理',
        'createdAt': '2019-07-30T16:24:55.429Z',
        'updatedAt': '2019-07-30T16:24:55.429Z'
      }
    },
    {
      'id': 47,
      'name': 'Beverly Yundt',
      'tel': '099-398-9865 x7776',
      'address': '27001 Ike Well',
      'opening_hours': '08:00',
      'description': 'Quibusdam ut natus officia porro. Quis eum explicabo architecto sint repudiandae unde. Sunt magni quibusdam ipsa et impedit esse occaecati. Et nemo quaerat saepe delectus. Autem dignissimos corporis sed voluptates suscipit quia fuga. Dolorum ea suscipit.',
      'image': 'https://loremflickr.com/320/240/restaurant,food/?random=44.588878866397906',
      'viewCounts': null,
      'isFavorited': false,
      'isLiked': false,
      'createdAt': '2019-07-30T16:24:55.443Z',
      'updatedAt': '2019-07-30T16:24:55.443Z',
      'CategoryId': 5,
      'Category': {
        'id': 3,
        'name': '素食料理',
        'createdAt': '2019-07-30T16:24:55.429Z',
        'updatedAt': '2019-07-30T16:24:55.429Z'
      }
    },
  ],
  categories: [
    {
      'id': 1,
      'name': '墨西哥料理'
    },
    {
      'id': 2,
      'name': '日本料理'
    },
    {
      'id': 3,
      'name': '素食料理'
    }
  ],
  page: 1,
  totalPage: [1,2,3],
  prev: 1,
  next: 2,
  categoryId: ''
}

export default {
  components: {
    NavTabs,
    RestCard,
    RestNavPills,
    RestPagination,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1
    } 
  },
  created(){
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants () {
      const {
        restaurants,
        categories,
        categoryId,
        page,
        totalPage,
        prev,
        next
      } = dummyData;
      this.restaurants = restaurants;
      this.categories = categories;
      this.categoryId = categoryId;
      this.currentPage = page;
      this.totalPage = totalPage;
      this.previousPage = prev;
      this.nextPage = next;
    }
  }
}
</script>