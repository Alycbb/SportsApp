import { combineReducers } from 'redux'

// state for logged in user
const authData = (state = {}, action) =>{
    switch (action.type){
        case "AUTH_USER_SUCCESS":
            return{
                token: action.token,
                isLoggedIn: true
            }
        case "AUTH_USER_FAIL":
            return{
                token: null,
                isLoggedIn: false
            }
        default:
            return state;
    }
}

const userData = (state = {}, action) =>{
    switch (action.type){
        case "IS_ADMIN":
            return{
                isAdmin: true
            }
        
        case "NOT_ADMIN":
            return{
                isAdmin: false
            }
        
        default:
            return state;
    }
}



//state while creating user
const createUser =  (state = {}, action) => {
    switch (action.type) {
        case "CREATE_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
  
        case "CREAT_USER_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null
            }
  
        case "CREAT_USER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }
  
        default:
          return state;
      }
}
//state while logging in user
const loginUser = (state = {}, action) => {
    switch (action.type) {
      case "LOGIN_USER_LOADING":
          return {
              isLoading: true,
              isError: false,
              isSuccess: false,
              errors: null
          }

      case "LOGIN_USER_SUCCESS":
          return {
              isLoading: false,
              isError: false,
              isSuccess: true,
              userInfo: action.payload,
              errors: null,
          }

      case "LOGIN_USER_FAIL":
          return {
              isLoading: false,
              isError: true,
              isSuccess: false,
              errors: action.payload
          }

      default:
        return state;
    }
}

export default combineReducers ({
    createUser,
    loginUser,
    authData,
    userData,
    // showQue,
    // modifyQues
});