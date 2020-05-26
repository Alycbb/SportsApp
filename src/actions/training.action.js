import {fetchApi} from "../service/api";

//create training plan 
export const addTrainingPlan = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "ADD_TRAINING_PLAN_LOADING",
            });
            const response = await fetchApi("/training/create","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "ADD_TRAINING_PLAN_SUCCESS",
                });
                dispatch({
                    type: "GET_TRAINING_PLAN_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "ADD_TRAINING_PLAN_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//get training plan by teamName
export const ViewTrainingByTeam = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "VIEW_TRAINING_BY_TEAM_LOADING",
            });
            dispatch({
                type: "VIEW_TRAINING_BY_TEAM_SUCCESS",
            });
            const response = await fetchApi("/training/getListByTeam","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "VIEW_TRAINING_BY_TEAM_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "ADD_TRAINING_PLAN_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//get training plan by userName
export const ViewTrainingByUser = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "VIEW_TRAINING_BY_USER_LOADING",
            });
            const response = await fetchApi("/training/getListByUser","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "VIEW_TRAINING_BY_USER_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "VIEW_TRAINING_BY_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

