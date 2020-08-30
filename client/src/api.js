import axios from 'axios'

export const login = async function (userData) {
  return await axios.post('/login', userData)
}
export const signup = async function (newUserData) {
  return await axios.post('/signup', newUserData)
}

export const getMyDetails = async function () {
  return await axios.get('/user/me')
}

export const updateMyDetails = async function (userDetails) {
  return await axios.post('/user', userDetails)
}

export const uploadProfileImage = async function (image) {
  return await axios.post('/user/image', image)
}

export const postNewScream = async function (scream) {
  return await axios.post('/scream', { body: scream })
}
