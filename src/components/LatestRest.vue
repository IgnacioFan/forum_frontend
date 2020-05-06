<template>
  <div class="card">
    <div class="card-header">
      Latest Restaurants
    </div>
    <div class="card-body">
      <div
        v-for="rest in restaurants"
        :key="rest.id"
      >
        <h4>
          <router-link :to="{ name: 'restaurant', params: { id: rest.id } }" >
            {{ rest.name }}
          </router-link>
          <small>{{ rest.Category.name }}</small>
        </h4>
        <p>{{ rest.description }}</p>
        {{ rest.createdAt | fromNow }}
        <hr>
      </div>
    </div>
  </div>
</template>


<script>
import moment from 'moment'

export default {
  filters: {
    fromNow(datetime) {
      if(!datetime) {
        return '-'
      }

      return moment(datetime).fromNow()
    }
  },

  props: {
    restaurants: {
      type: Array,
      required: true
    }
  }
}
</script>