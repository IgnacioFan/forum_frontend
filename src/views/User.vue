<template>
  <section>
    <div 
      v-show="!isLoading"
      class="container py-5">
      <div class="row"
    >
        <UserProfileCard 
          :current-user="currentUser"
          :profile="profile"
          :initial-is-followed="isFollowed"
          @after-add-follower="afterAddFollower"
          @after-remove-follower="afterRemoveFollower"
        />
        <section class="col-12 col-md-5">
          <UserFollowingsCard :following-users="followings" />
          <UserFollowersCard :followers="followers" />
        </section>

        <section class="col-12 col-md-7">
          <UserCommentsCard :comments="comments" />
          <UserFavoritedRestaurantsCard :favorited-restaurants="favoritedRestaurants" />
        </section>
      </div>
    </div>
  </section>
</template>
<script>
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';
import { mapState } from 'vuex';
import UserProfileCard from '../components/UserProfileCard';
import UserFollowingsCard from '../components/UserFollowingsCard';
import UserFollowersCard from '../components/UserFollowersCard';
import UserCommentsCard from "../components/UserCommentsCard";
import UserFavoritedRestaurantsCard from '../components/UserFavoritedRestaurantsCard';

export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
  },
  data() {
    return {
      profile: {
        id: -1,
        name: '',
        email: '',
        isAdmin: false,
        image: '',
        followerNumbers: -1,
        followingNumbers: -1,
        commentNumbers: -1,
        favoriteRestaurantNumbers: -1
      },
      comments: [],
      followers: [],
      followings: [],
      favoritedRestaurants: [],
      isFollowed: false,
      isLoading: true
    }
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUserProfile(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUserProfile({userId});
    next();
  },
  methods: {
    async fetchUserProfile(userId) {
      try {
        const { data } = await usersAPI.getUser({userId});
        console.log(data);
        const { profile } = data
        this.profile = {
          ...this.profile,
          id: profile.id,
          name: profile.name,
          email: profile.email,
          isAdmin: profile.isAdmin,
          image: profile.image,
          followerNumbers: profile.Followers.length,
          followingNumbers: profile.Followings.length,
          commentNumbers: profile.Comments.length,
          favoriteRestaurantNumbers: profile.FavoritedRestaurants.length
        },
        this.comments = profile.Comments;
        this.followers = profile.Followers;
        this.followings = profile.Followings;
        this.favoritedRestaurants = profile.FavoritedRestaurants;
        this.isFollowed = data.isFollowed,
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = true;
        Toast.fire({
          icon: 'error',
          title: 'Cannot fetch this restaurant info, please try it later!'
        });
      }
    },
    afterAddFollower(){
      console.log('add follow')
      this.followers.push({
        id: this.currentUser.id,
        image: this.currentUser.image
      })
    },
    afterRemoveFollower(){
      console.log('remove follow')
      this.followers = this.followers.filter(
        user => user.id !== this.currentUser.id
      )
    }
  }
}
</script>