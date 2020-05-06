<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      Top Restaurants
    </h1>

    <hr>
    <div
      class="card mb-3"
      style="max-width: 640px;margin: auto;"
    >
      <RestCardHorizontal 
        v-for="restaurant in topRestaurant"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs'
import RestCardHorizontal from '../components/RestCardHorizontal'

const dummyData = {
    restaurants: [
        {
            "id": 1,
            "name": "Ferne Prosacco",
            "image": "http://lorempixel.com/640/480",
            "description": "libero...",
            "favoriteUser": 0,
            "isFavorite": false
        },
        {
            "id": 2,
            "name": "Alessia Cole",
            "image": "http://lorempixel.com/640/480",
            "description": "repellendus blanditiis nam...",
            "favoriteUser": 0,
            "isFavorite": false
        },
        {
            "id": 3,
            "name": "Mr. Lelia Jerde",
            "image": "http://lorempixel.com/640/480",
            "description": "Nesciunt ducimus architecto sint quia adipisci vero. Ex pariatur ipsum optio tenetur laudantium vel magni face...",
            "favoriteUser": 0,
            "isFavorite": false
        },
        {
            "id": 4,
            "name": "Bailee Shanahan",
            "image": "http://lorempixel.com/640/480",
            "description": "quasi quod nesciunt...",
            "favoriteUser": 0,
            "isFavorite": false
        },
        {
            "id": 5,
            "name": "Mr. Layne Kautzer",
            "image": "http://lorempixel.com/640/480",
            "description": "officia illo possimus...",
            "favoriteUser": 0,
            "isFavorite": false
        },
        {
            "id": 6,
            "name": "Efren Altenwerth",
            "image": "http://lorempixel.com/640/480",
            "description": "Dolorem occaecati rerum. Sequi recusandae corrupti illum exercitationem quo tempora incidunt. Consequatur reru...",
            "favoriteUser": 0,
            "isFavorite": false
        },
        {
            "id": 7,
            "name": "Janie Wisoky DVM",
            "image": "http://lorempixel.com/640/480",
            "description": "Itaque ut nihil dolorem. In assumenda minima est. Natus sit debitis et. Molestiae aspernatur nobis iste volupt...",
            "favoriteUser": 0,
            "isFavorite": false
        },
        {
            "id": 8,
            "name": "Jimmie Torphy",
            "image": "http://lorempixel.com/640/480",
            "description": "Harum vel atque atque quis ut est autem. Ea corrupti autem itaque rerum delectus vero. Sunt vel et qui vero la...",
            "favoriteUser": 0,
            "isFavorite": false
        },
        {
            "id": 9,
            "name": "Lucienne Gutkowski",
            "image": "http://lorempixel.com/640/480",
            "description": "Consequatur hic omnis et error qui fuga....",
            "favoriteUser": 0,
            "isFavorite": false
        },
        {
            "id": 10,
            "name": "Theo Bartoletti",
            "image": "http://lorempixel.com/640/480",
            "description": "Optio aut quidem quas quia.\nLaboriosam voluptatem quam in in.\nEa eligendi suscipit autem repellat quibusdam re...",
            "favoriteUser": 0,
            "isFavorite": false
        }
    ]
}

export default {
  components: {
    NavTabs,
    RestCardHorizontal,
  },
  data() {
    return {
      topRestaurants: []
    }
  },
  created(){
    this.fetchTopRestaurant();
  },
  methods: {
    fetchTopRestaurant() {
      this.topRestaurant = dummyData.restaurants
    }
  }
}
</script>