import {combineReducers} from 'redux';
//state while getting user information
const getUser = (state ={}, action) =>{
    switch(action.type){
        case "GET_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                userDetails: null,
                errors: null
            }
        case "GET_USER_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                userDetails: action.payload,
                errors: null,
                radioSelected: false
            }
        case "GET_USER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                userDetails: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

const getUserByName = (state ={}, action) =>{
    switch(action.type){
        case "GET_USER_BY_NAME_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                OneUser: null,
                errors: null
            }
        case "GET_USER_BY_NAME_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                OneUser: action.payload,
                errors: null,
            }
        case "GET_USER_BY_NAME_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                OneUser: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

const addPhysicalData = (state ={}, action) =>{
    switch(action.type){
        case "ADD_PHYSICAL_DATA_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                userDetails: null,
                errors: null
            }
        case "ADD_PHYSICAL_DATA_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                userDetails: action.payload,
                errors: null,
            }
        case "ADD_PHYSICAL_DATA_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                userDetails: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

const UserList = (state ={}, action) =>{
    switch(action.type){
        case "GET_USER_LIST_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                userList: null,
                errors: null
            }
        case "GET_USER_LIST_SUCCESS":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null,
                userList: action.payload
            }
        default:
            return state;
    }
}


export default combineReducers({
    getUser,
    addPhysicalData,
    UserList,
    getUserByName
});