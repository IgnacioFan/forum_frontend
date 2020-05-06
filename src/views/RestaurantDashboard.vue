<template>
	<div class="container py-5">
		<div>
			<h1>{{ restaurant.name }}</h1>
			<span class="badge badge-secondary mt-1 mb-3">
				{{ restaurant.categoryName }}
			</span>
		</div>

		<hr>

		<ul>
			<li>Comments： {{ restaurant.commentCounts }}</li>
			<li>Views： {{ restaurant.viewCounts }}</li>
		</ul>

		<button
			type="button"
			class="btn btn-link"
			@click="$router.back()"
		>
			Back
		</button>
	</div>
</template>
<script>
const dummyData = {
	"restaurant": {
		"id": 1,
		"name": "Ferne Prosacco",
		"tel": "(183) 715-3203 x82462",
		"address": "20877 Hodkiewicz Parkways",
		"opening_hours": "08:00",
		"description": "libero",
		"image": "http://lorempixel.com/640/480",
		"viewCounts": 0,
		"createdAt": "2020-05-06T04:05:55.000Z",
		"updatedAt": "2020-05-06T04:05:55.000Z",
		"CategoryId": 2,
		"Comments": [],
		"Category": {
            "id": 3,
            "name": "義大利料理",
            "createdAt": "2019-06-22T09:00:43.000Z",
            "updatedAt": "2019-06-22T09:00:43.000Z"
        },
		"FavoritedUsers": []
	},
	"commentCounts": 0,
	"favoriteUser": 0
}
export default {
	data() {
		return {
			restaurant: {
				id: -1,
				name: '',
				categoryName: '',
				viewCounts: -1,
				commentCounts: -1
			}
		}
	},
	created() {
		const { id: restaurantId } = this.$route.params;
		console.log(restaurantId);
		this.fetchDashboard(restaurantId);
	},
	methods: {
		fetchDashboard(restaurantId) {
			this.restaurant = {
				id: restaurantId,
				name: dummyData.restaurant.name,
				categoryName: dummyData.restaurant.Category.name,
				viewCounts: dummyData.restaurant.viewCounts,
				commentCounts: dummyData.commentCounts
			}
		}
	}
}
</script>