<template>
	<div 
		v-show="!isLoading"
		class="container py-5"
	>
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
import restaurantsAPI from '../apis/restaurants';
import { Toast } from '../utils/helpers';

export default {
	data() {
		return {
			restaurant: {
				id: -1,
				name: '',
				categoryName: '',
				viewCounts: -1,
				commentCounts: -1
			},
			isLoading: true
		}
	},
	created() {
		const { id: restaurantId } = this.$route.params;
		console.log(restaurantId);
		this.fetchDashboard(restaurantId);
	},
	beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchDashboard(restaurantId);
    next();
  },
	methods: {
		async fetchDashboard(restaurantId) {
			try {
				const { data } = await restaurantsAPI.getRestaurant({restaurantId});
				// console.log(data);
				const { restaurant } = data
				this.restaurant = {
					id: restaurant.id,
					name: restaurant.name,
					categoryName: restaurant.Category.name,
					viewCounts: restaurant.viewCounts,
					commentCounts: restaurant.Comments.length
				}	
				this.isLoading = false;
			} catch (error) {
				console.log(error);
				this.isLoading = false;
				Toast.fire({
					icon: 'error',
					title: 'Cannot fetch this restaurant, please try it later!'
				})
			}
		}
	}
}
</script>