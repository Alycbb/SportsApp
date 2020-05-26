import {fetchApi} from "../service/api";

//get one user information by userName
export const getUserByName = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "GET_USER_BY_NAME_LOADING",
            });
            const response = await fetchApi("/user/getUserByName","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "GET_USER_BY_NAME_SUCCESS",
                    payload: response.responseBody
                });
                dispatch({
                    type: "GET_USER_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "GET_USER_BY_NAME_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//De/Activate Users
export const changeUserStatus = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "CHANGE_USER_STATUS_LOADING",
            });
            const response = await fetchApi("/user/changeStatus","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "CHANGE_USER_STATUS_SUCCESS",
                    payload: response.responseBody
                });

                
                return response;
            }
        } catch(error){
            dispatch({
                type: "CHANGE_USER_STATUS_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//sort users by team
export const sortByTeam = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "SORT_BY_TEAM_LOADING",
            });
            const response = await fetchApi("/user/sortByTeam","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "GET_USER_LIST_SUCCESS",
                    payload: response.responseBody
                });

                return response;
            }
        } catch(error){
            dispatch({
                type: "SORT_BY_TEAM_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//sort users by UserName
export const sortByUserName = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "SORT_BY_TEAM_LOADING",
            });
            const response = await fetchApi("/user/sortByUserName","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "GET_USER_LIST_SUCCESS",
                    payload: response.responseBody
                });

                return response;
            }
        } catch(error){
            dispatch({
                type: "SORT_BY_TEAM_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}