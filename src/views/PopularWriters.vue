<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      Popular Writer
    </h1>
    <hr>
    <div class="row text-center">
      <UserCard 
        v-for="user in users"
        :key="user.id"
        :initial-user="user"
      />
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue';
import UserCard from '../components/UserCard.vue';

const dummyData = {
  users: [
        {
            "id": 1,
            "name": "root",
            "email": "root@example.com",
            "password": "$2a$10$nw79s3OYvBommN6N50AP.uRXcvy51ItqNy5Mc4bRdGjNUtIRnLVPe",
            "isAdmin": true,
            "image": "http://lorempixel.com/200/200/people",
            "createdAt": "2020-05-04T07:41:15.000Z",
            "updatedAt": "2020-05-04T07:41:15.000Z",
            "Followers": [],
            "FollowerCount": 0,
            "isFollowed": false,
            "isOwner": true
        },
        {
            "id": 2,
            "name": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$KWDOLi/TKJ9z53/nKSCIqOgLqWd85POcYl1zFVuxki5ED/zjh4wU6",
            "isAdmin": false,
            "image": "http://lorempixel.com/200/200/people",
            "createdAt": "2020-05-04T07:41:15.000Z",
            "updatedAt": "2020-05-04T07:41:15.000Z",
            "Followers": [],
            "FollowerCount": 0,
            "isFollowed": false,
            "isOwner": false
        },
        {
            "id": 3,
            "name": "user2",
            "email": "user2@example.com",
            "password": "$2a$10$f/2V/rWjE7JwEC2btn8WCeljJ/QAVv38hVKK/f7pDQvKOHr3OomzK",
            "isAdmin": false,
            "image": "http://lorempixel.com/200/200/people",
            "createdAt": "2020-05-04T07:41:16.000Z",
            "updatedAt": "2020-05-04T07:41:16.000Z",
            "Followers": [1,2],
            "FollowerCount": 2,
            "isFollowed": true,
            "isOwner": false
        }
    ]
}

export default {
  components: {
    NavTabs,
    UserCard,
  },
  data() {
    return {
      users: [],
    }
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const {
        users
      } = dummyData;
      this.users = users;
    }
  }
}
</script>