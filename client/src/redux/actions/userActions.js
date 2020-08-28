import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI ,SET_UNAUTHENTICATED , LOADING_USER} from '../types'
import { login, signup, getMyDetails } from '../../api'
import axios from 'axios'

export const loginUser = (userData,history)=> async (dispatch)=>{    
  dispatch({type:LOADING_UI})
  try{
    var res = await login(userData)
    console.log("in action",res)
    setAuthorizationHeader(res.data.token)
    await dispatch(getUserData())
    dispatch({
      type:CLEAR_ERRORS
    })
    history.push('/')
  }catch(err){
    dispatch({
      type:SET_ERRORS,
      payload:err.response.data
    })
  }
}     

export const signupUser = (newUserData,history)=>(dispatch)=>{
  dispatch({type:LOADING_UI})
  try{
    signup(newUserData)
    this.loginUser(newUserData,history)
  }catch(err){
    dispatch({
      type:SET_ERRORS,
      payload:err.response.data
    })
  }     
}
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']
    dispatch({
        type:SET_UNAUTHENTICATED
    })
}
export const getUserData = () => async (dispatch) => {
  // console.log("in user details")
  dispatch({ type: LOADING_USER })
  try{
    var res = await getMyDetails()
    dispatch({
      type:SET_USER,
      payload: res.data
    })
  }catch(err){
    console.log(err)
  }
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post('/user/image', formData)
        .then(res => {
            dispatch(getUserData())
            window.location.reload(false)
        })
        .catch(err => {
            console.log(err)
        })
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post('/user',userDetails)
        .then(()=>{
            dispatch(getUserData())
        })
        .catch(err => {
            console.log(err)
        })
}

const setAuthorizationHeader = (token) => {
    var AccessToken = `Bearer ${token}`;
    localStorage.setItem('AccessToken',AccessToken)
    axios.defaults.headers.common['Authorization'] = AccessToken
}

