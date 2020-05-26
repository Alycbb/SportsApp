import { combineReducers } from 'redux';
import { ActionConst } from 'react-native-router-flux';

const initialState ={

}

const addQuestionnaire = (state = {}, action) =>{
    switch (action.type){
        case "ADD_QUESTIONNAIRE_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
  
        case "ADD_QUESTIONNAIRE_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                newQuestionnaire: action.payload
            }
  
        case "ADD_QUESTIONNAIRE_FAIL":
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

const getQuestionnare = (state = {}, action) =>{
    switch (action.type){
        case "GET_QUESTIONNAIRE_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                questionnaires: action.payload,
                errors: null,
                radioSelected: false,
            }
  
        case "GET_QUESTIONNAIRE_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                questionnaires: null,
                errors: action.payload
            }
        default:
            return state;
    }
}


const addQuestion = (state = {}, action) =>{
    switch (action.type){
        case "ADD_QUESTION_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
  
        case "ADD_QUESTION_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                userDetails: action.payload
            }
  
        case "ADD_QUESTION_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }
// return previous state as default, in case somoe unknown action
        default:
            return state;
    }
}


const getQuestions = (state = {}, action) =>{
    switch (action.type){
        case "DISPLAY_QUESTIONS_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                questions: action.payload,
                errors: null,
            }
  
        case "DISPLAY_QUESTIONS_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                questions: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

const QuesUpdate = (state = {}, action) =>{
    switch (action.type){
        case "UPDATE_QUESTION_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                quesUpdate: null,
                errors: null
            }
  
        case "UPDATE_QUESTION_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                quesUpdate: action.payload,
                errors: null,
            }
  
        case "DELETEUPDATE_QUESTION_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                quesUpdate: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

const QuestionForUser = (state = {}, action) =>{
    switch (action.type){
        case "USER_QUESTION_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                userQuestion: null,
                errors: null
            }
  
        case "USER_QUESTION_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                userQuestion: action.payload,
                errors: null,
            }
  
        case "USER_QUESTION_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                userQuestion: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

const QuestionAnswers = (state = {}, action) =>{
    switch (action.type){
        case "DISPLAY_QUESTION_ANSWER_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                userAnswer: action.payload,
                errors: null,
            }
  
        case "DISPLAY_QUESTION_ANSWER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                userAnswer: null,
                errors: action.payload
            }
        default:
            return state;
    }
}

export default combineReducers ({
    addQuestion,
    getQuestionnare,
    getQuestions,
    QuesUpdate,
    QuestionForUser,
    QuestionAnswers
});