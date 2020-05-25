import {apiHelper} from '../utils/helpers';
export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`)
  },
  getUser({userId}) {
    return apiHelper.get(`/users/${userId}`)
  },
  editUser({userId, formData}) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
  addFavorite({restaurantId}) {
    return apiHelper.post(`/favorite/${restaurantId}`, null)
  },
  removeFavorite({restaurantId}) {
    return apiHelper.delete(`/favorite/${restaurantId}`)
  },
  addLike({restaurantId}) {
    return apiHelper.post(`/like/${restaurantId}`, null)
  },
  removeLike({restaurantId}) {
    return apiHelper.delete(`/like/${restaurantId}`)
  },
  getTopWriters(){
    return apiHelper.get('/users/top')
  },
  addFollowing({userId}) {
    return apiHelper.post(`/following/${userId}`, null)
  },
  removeFollowing({userId}) {
    return apiHelper.delete(`/following/${userId}`)
  }
}