<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="userProfile.name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        >
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="userProfile.image"
          :src="userProfile.image"
          class="d-block img-thumbnail mb-3"
          width="300"
          height="300"
        >
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        >
      </div>

      <button
        type="submit"
        class="btn btn-primary"
      >
        Submit
      </button>
    </form>
  </div>
</template>
<script>
const dummyData = {
  'profile': {
    'id': 1,
    'name': 'root',
    'email': 'root@example.com',
    'isAdmin': true,
    'image': 'https://i.imgur.com/58ImzMM.png',
    'createdAt': '2019-07-30T16:24:54.983Z',
    'updatedAt': '2019-08-01T10:33:51.095Z',
  },
  'isFollowed': false
}
export default {
  data() {
    return {
      userProfile: {
        id: -1,
        name: '',
        image: ''
      }
    }
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUserProfile(userId);
  },
  methods: {
    fetchUserProfile(userId) {
      this.userProfile = {
        ...this.userProfile,
        id: userId,
        name: dummyData.profile.name,
        image: dummyData.profile.image
      }
    },
    handleFileChange(e) {
      const files = e.target.files;
      console.log(files)
      if(files === 0) return this.userProfile.image;
      else {
        const imageUrl = window.URL.createObjectURL(files[0]);
        this.userProfile.image = imageUrl;
      }
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      for(let [key, value] of formData.entries()){
        console.log(`${key} : ${value}`);
      }
    }
  }
}
</script>
