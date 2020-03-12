<template>
  <ul class="nav nav-tabs mb-4">
    <li
      v-for="tab in tabs"
      :key="tab.id"
      class="nav-item"
    >
      <router-link
        :to="tab.path"
        class="nav-link"
      >
        {{ tab.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import uuid from 'uuid/v4'
export default {
  data() {
    return {
      tabs: [
        {
          id: uuid(),
          title: 'Home',
          path: '/restaurants'
        },
        {
          id: uuid(),
          title: 'Feeds',
          path: '/restaurants/feeds'
        },
        {
          id: uuid(),
          title: 'Top Restaurants',
          path: '/restaurants/top'
        },
        {
          id: uuid(),
          title: 'Popular Writers',
          path: '/users/populars'
        }
      ]
    }
  }
}
</script>