import { combineReducers } from 'redux';
import { ActionConst } from 'react-native-router-flux';


const TemplateAdd = (state = {}, action) =>{
    switch (action.type){
        case "ADD_PHYSICAL_DATA_TEMPLATE_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
  
        case "ADD_PHYSICAL_DATA_TEMPLATE_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
            }
  
        case "ADD_PHYSICAL_DATA_TEMPLATE_FAIL":
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


const TemplateDisplay = (state = {}, action) =>{
    switch (action.type){
        case "VIEW_PHYSICAL_DATA_TEMPLATE_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
  
        case "VIEW_PHYSICAL_DATA_TEMPLATE_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                templates: action.payload
            }
  
        case "VIEW_PHYSICAL_DATA_TEMPLATE_FAIL":
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

const DisplayOneTemplate = (state = {}, action) =>{
    switch (action.type){

        case "DISPLAY_ONE_TEMPLATE_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                onetemplate: action.payload
            }
  
        case "DISPLAY_ONE_TEMPLATE_FAIL":
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

const AddPhysicalData = (state = {}, action) =>{
    switch (action.type){
        case "ADD_PHYSICAL_DATA_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
  
        case "ADD_PHYSICAL_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                PD:action.payload
            }
  
        case "ADD_PHYSICAL_DATA_FAIL":
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

const ViewPhysicalData = (state = {}, action) =>{
    switch (action.type){
        case "VIEW_PHYSICAL_DATA_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                PDs: action.payload
            }
  
        case "VIEW_PHYSICAL_DATA_FAIL":
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

const GetUserPhysicalData = (state = {}, action) =>{
    switch (action.type){
        case "GET_USER_PHYSICAL_DATA_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
  
        case "GET_USER_PHYSICAL_DATA_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                userPDs: action.payload
            }
  
        case "GET_USER_PHYSICAL_DATA_FAIL":
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

const GetPDbyUserName = (state = {}, action) =>{
    switch (action.type){
        case "GET_PHYSICAL_DATA_BY_USER_NAME_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
  
        case "GET_PHYSICAL_DATA_BY_USER_NAME_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                PDsByName: action.payload
            }
  
        case "GET_PHYSICAL_DATA_BY_USER_NAME_FAIL":
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


const GetDifferentComparedUserPD = (state = {}, action) =>{
    switch (action.type){
        case "GET_COMPARED_TWO_DIFFERENT_USER_DATA_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
  
        case "GET_COMPARED_TWO_DIFFERENT_USER_DATA_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                DifferntUsersPDs: action.payload
            }
  
        case "GET_COMPARED_TWO_DIFFERENT_USER_DATA_FAIL":
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

const GetTwoComparedPD = (state = {}, action) =>{
    switch (action.type){
        case "GET_TWO_COMPARED_PHYSICAL_DATA_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
  
        case "GET_TWO_COMPARED_PHYSICAL_DATA_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                CoomparedPDs: action.payload
            }
  
        case "GET_TWO_COMPARED_PHYSICAL_DATA_FAIL":
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
    TemplateAdd,
    TemplateDisplay,
    DisplayOneTemplate,
    ViewPhysicalData,
    GetUserPhysicalData,
    GetPDbyUserName,
    GetDifferentComparedUserPD,
    GetTwoComparedPD
});