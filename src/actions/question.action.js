import {fetchApi} from "../service/api";

//add new questionnaire
export const addNewQuestionnaire = (payload) =>{
    return async (dispatch) =>{
        try{
            const response = await fetchApi("/question/create/questionnaire","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "ADD_QUESTIONNAIRE_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "ADD_QUESTIONNAIRE_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//get all Questionnaire
export const getQustionnaire = (payload) =>{
    return async (dispatch) =>{
        try{
            const response = await fetchApi("/question/display/questionnaire","GET", null, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "GET_QUESTIONNAIRE_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "GET_QUESTIONNAIRE_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//add new question
export const addNewQuestion = (payload) =>{
    return async (dispatch, getState) =>{
        const state = getState();
        try{
            const {authReducer:{authData:{token}}} = state;
            dispatch({
                type: "ADD_QUESTION_LOADING",
            });
            dispatch({
                type: "GET_QUESTION_TEMPLATE_LOADING",
            });
            const response = await fetchApi("/question/create/question","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "ADD_QUESTION_SUCCESS",
                });
                dispatch({
                    type: "GET_QUESTION_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "ADD_QUESTION_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//add question answer
export const addNewQuestionAnswer = (payload) =>{
    return async (dispatch, getState) =>{
        const state = getState();
        try{
            const {authReducer:{authData:{token}}} = state;
            dispatch({
                type: "ADD_QUESTION_ANSWER_LOADING",
            });
            const response = await fetchApi("/question/create/questionAnswer","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "ADD_QUESTION_ANSWER_SUCCESS",
                });

                return response;
            }
        } catch(error){
            dispatch({
                type: "ADD_QUESTION_ANSWER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}


//Display all questions by Questionnare
export const displayQuestions = (payload) =>{
    return async (dispatch) =>{
        try{
            const response = await fetchApi("/question/getQuestionsByQuestionnaire","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "DISPLAY_QUESTIONS_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "DISPLAY_QUESTIONS_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//sort questions from old to new
export const SortQuestionOldToNew = (payload) =>{
    return async (dispatch) =>{
        try{
            const response = await fetchApi("/question/sortQuestion/OldToNew","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "DISPLAY_QUESTIONS_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "SORT_QUESTION_OLD_TO_NEW_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//sort questions by type
export const SortQuestionByType = (payload) =>{
    return async (dispatch) =>{
        try{

            const response = await fetchApi("/question/sortQuestionByType","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "DISPLAY_QUESTIONS_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "SORT_QUESTION_BY_TYPE_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//delete question
export const QuestionDelete = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "DELETE_QUESTION_LOADING",
            });
            
            console.log("i am ok here");
            console.log(payload);
            const response = await fetchApi("/question/delete","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "DELETE_QUESTION_SUCCESS",
                });
                // dispatch({
                //     type: "IS",
                // });
                return response;
            }
        } catch(error){
            dispatch({
                type: "DELETE_QUESTION_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//update question
export const QuestionUpdate = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "UPDATE_QUESTION_LOADING",
            });
            console.log("Question Update");
            console.log(payload);
            const response = await fetchApi("/question/update","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "UPDATE_QUESTION_SUCCESS",
                    payload: response.responseBody

                });
                
                return response;
            }
        } catch(error){
            dispatch({
                type: "UPDATE_QUESTION_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//assign questionnaire (all the questions inside) to user
export const AssignQuesToUser = (payload) =>{
    return async (dispatch) =>{
        try{
            const response = await fetchApi("/question/assignQuesToUser","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "ASSIGN_QUESTION_TO_USER_SUCCESS",
                    payload: response.responseBody

                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "ASSIGN_QUESTION_TO_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//Athlete pages: Display assigned Questions
export const DisplayQuestionForUser = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "USER_QUESTION_LOADING",
            });
            const response = await fetchApi("/question/athlete/displayQuestion","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "USER_QUESTION_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "USER_QUESTION_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//display Question Answers
export const DisplayQuestionAnswer = (payload) =>{
    return async (dispatch) =>{
        try{
            const response = await fetchApi("/question/display/questionAnswer","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "DISPLAY_QUESTION_ANSWER_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "DISPLAY_QUESTION_ANSWER",
                payload: error.responseBody
            });
            return error;
        }
    }
}