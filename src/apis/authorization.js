import { apiHelper } from '../utils/helpers';

export default {
  signIn({email, password}) {
    return apiHelper.post('/signin', {
      email, 
      password
    })
  },
  signUp({email, name, password, passwordCheck }) {
    return apiHelper.post('/signup', {
      email,
      name,
      password,
      passwordCheck
    })
  }
}