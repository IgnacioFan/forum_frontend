import {apiHelper} from '../utils/helpers';
const getToken = () => localStorage.getItem('token');

export default {
  addFavorite({restaurantId}) {
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  removeFavorite({restaurantId}) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  addLike({restaurantId}) {
    return apiHelper.post(`/like/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  removeLike({restaurantId}) {
    return apiHelper.delete(`/like/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getTopWriters(){
    return apiHelper.get('/users/top', {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  addFollowing({userId}) {
    return apiHelper.post(`/following/${userId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  removeFollowing({userId}) {
    return apiHelper.delete(`/following/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
}