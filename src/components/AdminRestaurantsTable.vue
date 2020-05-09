<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th
          scope="col"
          width="300"
        >
          operation
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{ name: 'admin-restaurant', params: {id: restaurant.id} }"
            class="btn btn-link"
          >Show</router-link>

          <router-link
            :to="{ name: 'admin-restaurants-edit', params: { id: restaurant.id }}"
            class="btn btn-link"
          >Edit</router-link>

          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="removeRestaurant(restaurant.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const dummyData = {
    "restaurants": [
        {
            "id": 1,
            "name": "Chet Kling",
            "tel": "163.241.8004 x500",
            "address": "296 Rowe Branch",
            "opening_hours": "08:00",
            "description": "Ut officia aut aut sed sit labore consequatur. Necessitatibus ipsum suscipit id est sit et excepturi. Possimus est ex voluptas reiciendis sint.",
            "image": "http://lorempixel.com/640/480",
            "viewCounts": 0,
            "createdAt": "2020-05-08T07:45:01.000Z",
            "updatedAt": "2020-05-08T07:45:01.000Z",
            "CategoryId": 1,
            'Category': {
              'id': 1,
              'name': '墨西哥料理',
              'createdAt': '2019-07-30T16:24:55.429Z',
              'updatedAt': '2019-07-30T16:24:55.429Z'
            }
        },
        {
            "id": 2,
            "name": "Jarvis Bins",
            "tel": "079.693.8163",
            "address": "45898 Doyle Bridge",
            "opening_hours": "08:00",
            "description": "Dolor accusantium omnis magni illo.",
            "image": "http://lorempixel.com/640/480",
            "viewCounts": 0,
            "createdAt": "2020-05-08T07:45:01.000Z",
            "updatedAt": "2020-05-08T07:45:01.000Z",
            "CategoryId": 5,
            "Category": null
        },
        {
            "id": 3,
            "name": "Kiley Luettgen",
            "tel": "1-226-088-3514 x11603",
            "address": "6193 Hadley Mills",
            "opening_hours": "08:00",
            "description": "Sit dolorem fugiat voluptatem eum dolorum voluptatem.\nEsse et eligendi quis omnis consequuntur sequi et.\nQui doloribus et ea et omnis temporibus et.",
            "image": "http://lorempixel.com/640/480",
            "viewCounts": 0,
            "createdAt": "2020-05-08T07:45:01.000Z",
            "updatedAt": "2020-05-08T07:45:01.000Z",
            "CategoryId": 1,
            'Category': {
              'id': 1,
              'name': '墨西哥料理',
              'createdAt': '2019-07-30T16:24:55.429Z',
              'updatedAt': '2019-07-30T16:24:55.429Z'
            }
        },
        {
            "id": 4,
            "name": "Oceane Auer",
            "tel": "1-627-229-1751",
            "address": "7901 Betsy Forks",
            "opening_hours": "08:00",
            "description": "optio officiis deleniti",
            "image": "http://lorempixel.com/640/480",
            "viewCounts": 0,
            "createdAt": "2020-05-08T07:45:01.000Z",
            "updatedAt": "2020-05-08T07:45:01.000Z",
            "CategoryId": 1,
            'Category': {
              'id': 1,
              'name': '墨西哥料理',
              'createdAt': '2019-07-30T16:24:55.429Z',
              'updatedAt': '2019-07-30T16:24:55.429Z'
            }
        },
        {
            "id": 5,
            "name": "Tremayne Dickens",
            "tel": "1-097-205-2845",
            "address": "18159 Ramiro Vista",
            "opening_hours": "08:00",
            "description": "Ab sed aliquid quam illum saepe dolores quia. In dicta illo nemo alias corrupti. Et perferendis non iure est est est commodi ut veritatis. Voluptatem ut voluptate voluptatem aut aliquam voluptatem dolore.",
            "image": "http://lorempixel.com/640/480",
            "viewCounts": 0,
            "createdAt": "2020-05-08T07:45:01.000Z",
            "updatedAt": "2020-05-08T07:45:01.000Z",
            "CategoryId": 1,
            "Category": null
        },
        {
            "id": 6,
            "name": "Vada Sporer",
            "tel": "(783) 264-1679 x4812",
            "address": "280 Francis Pine",
            "opening_hours": "08:00",
            "description": "Quia aut dignissimos ut sed facilis placeat.",
            "image": "http://lorempixel.com/640/480",
            "viewCounts": 0,
            "createdAt": "2020-05-08T07:45:01.000Z",
            "updatedAt": "2020-05-08T07:45:01.000Z",
            "CategoryId": 5,
            "Category": null
        },
        {
            "id": 7,
            "name": "Mittie Marvin",
            "tel": "(886) 735-4401",
            "address": "9202 Ferry Ramp",
            "opening_hours": "08:00",
            "description": "magni voluptatum ut",
            "image": "http://lorempixel.com/640/480",
            "viewCounts": 0,
            "createdAt": "2020-05-08T07:45:01.000Z",
            "updatedAt": "2020-05-08T07:45:01.000Z",
            "CategoryId": 1,
            "Category": null
        },
        {
            "id": 8,
            "name": "Kole Cruickshank Sr.",
            "tel": "788-380-1904 x518",
            "address": "3733 Barrows Grove",
            "opening_hours": "08:00",
            "description": "Voluptates nulla ut. Ut iste id et nemo velit explicabo vel blanditiis. Exercitationem repellat labore ullam odio vero amet neque aliquid. Voluptatum qui rerum in quae officia ut modi ipsum perspiciatis.\n \rMaxime ratione ut voluptatum doloremque impedit. Necessitatibus accusantium quia consequatur quod incidunt. Distinctio cum labore enim quisquam. Dicta vitae saepe illum reprehenderit tempore omnis. Consequuntur quasi omnis in aut deleniti asperiores consequuntur et quisquam.\n \rVoluptatem et consectetur. Commodi provident fugit. Odit nesciunt non inventore.",
            "image": "http://lorempixel.com/640/480",
            "viewCounts": 0,
            "createdAt": "2020-05-08T07:45:01.000Z",
            "updatedAt": "2020-05-08T07:45:01.000Z",
            "CategoryId": 4,
            "Category": null
        },
        {
            "id": 9,
            "name": "Fredrick Welch",
            "tel": "(273) 469-3566",
            "address": "3723 Hammes Rue",
            "opening_hours": "08:00",
            "description": "labore non et",
            "image": "http://lorempixel.com/640/480",
            "viewCounts": 0,
            "createdAt": "2020-05-08T07:45:01.000Z",
            "updatedAt": "2020-05-08T07:45:01.000Z",
            "CategoryId": 1,
            "Category": null
        },
        {
            "id": 10,
            "name": "Mikel Willms",
            "tel": "745.245.9928 x2858",
            "address": "649 Manuel Estates",
            "opening_hours": "08:00",
            "description": "Impedit quod recusandae minus eos nam quam.\nQuia doloremque quod.\nRerum velit quod nihil laboriosam quis non quis autem distinctio.",
            "image": "http://lorempixel.com/640/480",
            "viewCounts": 0,
            "createdAt": "2020-05-08T07:45:01.000Z",
            "updatedAt": "2020-05-08T07:45:01.000Z",
            "CategoryId": 5,
            "Category": null
        }
    ],
    "pagination": [
        1,
        2,
        3,
        4,
        5
    ],
    "currentPage": 1,
    "nextPage": 2,
    "lastPage": 0,
    "hasLastPage": false,
    "hasNextPage": true,
    "searchInput": "",
    "sortBy": false,
    "sortName": false,
    "sortId": false
}

export default {
  data () {
    return {
      restaurants: []
    }
  },
  created () {
    this.fetchRestaurants()
  },
  methods: {
    fetchRestaurants () {
      this.restaurants = dummyData.restaurants
    },
    removeRestaurant(restaurantId) {
      this.restaurants = this.restaurants.filter(
        restaurant => restaurant.id !== restaurantId
      );
    }
  }
}
</script>