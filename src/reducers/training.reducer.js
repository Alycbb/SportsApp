import { combineReducers } from 'redux';
import { ActionConst } from 'react-native-router-flux';

//create training plan 
const addTrainingPlan = (state = {}, action) =>{
    switch (action.type){
        case "ADD_TRAINING_PLAN_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
  
        case "ADD_TRAINING_PLAN_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
            }
  
        case "ADD_TRAINING_PLAN_FAIL":
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

//get training plan by teamName
const ViewTrainingByTeam = (state = {}, action) =>{
    switch (action.type){
        case "VIEW_TRAINING_BY_TEAM_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                traingingByTeam: null,
                errors: null
            }
  
        case "VIEW_TRAINING_BY_TEAM_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                traingingByTeam: action.payload,
                errors: null,
            }
  
        case "VIEW_TRAINING_BY_TEAM_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                traingingByTeam: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

//get training plan by userName
const ViewTrainingByUser = (state = {}, action) =>{
    switch (action.type){
        case "VIEW_TRAINING_BY_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                traingingByUser: null,
                errors: null
            }
  
        case "VIEW_TRAINING_BY_USER_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                traingingByUser: action.payload,
                errors: null,
            }
  
        case "VIEW_TRAINING_BY_USER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                traingingByUser: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

export default combineReducers ({
    addTrainingPlan,
    ViewTrainingByTeam,
    ViewTrainingByUser
});