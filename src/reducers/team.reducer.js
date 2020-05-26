import { combineReducers } from 'redux';
import { ActionConst } from 'react-native-router-flux';


const displayAllTeam = (state = {}, action) =>{
    switch (action.type){
        case "GET_ALL_TEAM_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                teamList: action.payload,
                errors: null,
            }
  
        case "GET_ALL_TEAM_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                teamList: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

const displayTeamMembers = (state = {}, action) =>{
    switch (action.type){
        case "GET_TEAM_MEMBERS_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                teamMembers: action.payload,
                errors: null,
            }
  
        case "GET_TEAM_MEMBERS_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                teamMembers: null,
                errors: action.payload
            }
        default:
            return state;
    }
}


const AssignAthleteToTeam = (state = {}, action) =>{
    switch (action.type){
        case "ASSIGN_ATHLETE_TO_TEAM_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }

        case "ASSIGN_ATHLETE_TO_TEAM_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                teamDetails: action.payload,
                errors: null,
            }
  
        case "ASSIGN_ATHLETE_TO_TEAM_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                teamDetails: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

const AssignCoachToTeam = (state = {}, action) =>{
    switch (action.type){
        case "ASSIGN_COACH_TO_TEAM_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }

        case "ASSIGN_COACH_TO_TEAM_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                teamDetails: action.payload,
                errors: null,
            }
  
        case "ASSIGN_COACH_TO_TEAM_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                teamDetails: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

const AssignQuesToTeam = (state = {}, action) =>{
    switch (action.type){
        case "ASSIGN_TEMPLATE_TO_TEAM_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }

        case "ASSIGN_TEMPLATE_TO_TEAM_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                teamDetails: action.payload,
                errors: null,
            }
  
        case "ASSIGN_TEMPLATE_TO_TEAM_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                teamDetails: null,
                errors: action.payload
            }
        default:
            return state;
    }
}


export default combineReducers ({
    displayAllTeam,
    displayTeamMembers,
    AssignAthleteToTeam,
    AssignCoachToTeam
});