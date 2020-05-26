import {fetchApi} from "../service/api";

//Action
//CreateNewUser
export const createNewUser = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "CREATE_USER_LOADING"
            });
            const response = await fetchApi("/user/create","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
//if api request success, back to action types(authenticated)
            if(response.success) {
                dispatch({
                    type: "CREAT_USER_SUCCESS"
                });
                // dispatch({
                //     type: "AUTH_USER_FAIL"
                // });
                dispatch({
                    type: "GET_USER_SUCCESS",
                    payload: response.responseBody
                });
                return response;

              } else {
                throw response;
              }
        } catch(error){
            dispatch({
                type: "CREAT_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//Login User
export const loginUser = (payload) => {
    return async (dispatch) => {
        try {
          dispatch({
            type: "LOGIN_USER_LOADING"
          });
          const response = await fetchApi("/user/login", "POST", payload, 200);
          console.log(response.responseBody)
          if(response.success) {
//check the account if frozen or not
            if(response.responseBody.user.status === 'frozen'){
                dispatch({
                    type: "AUTH_USER_FAIL",
                });

                dispatch({
                    type: "LOGIN_USER_FAIL"
                });

            }else{
                dispatch({
                    type: "AUTH_USER_SUCCESS",
                    token: response.token
                }); 
    
                dispatch({
                    type: "LOGIN_USER_SUCCESS",
                });
                
                dispatch({
                    type: "GET_USER_SUCCESS",
                    payload: response.responseBody
                });
    
                dispatch({
                    type: "GET_QUESTION_TEMPLATE_LOADING",
                });
//check the user type and load specific pages
                if(response.responseBody.user.userType !== 'Athlete'){
                    dispatch({
                        type: "IS_ADMIN",
                    });
                }else{
                    dispatch({
                        type: "NOT_ADMIN",
                    });
                }
            }

            return response;
            
          } else {
            throw response;
          }

        } catch (error) {
            dispatch({
                type: "LOGIN_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//LogOut User
export const logoutUser = () =>{
    return async(dispatch, getState) =>{
        const state = getState();
        try {
            const {authReducer:{authData:{token}}} = state;
            console.log(token);
            const response = await fetchApi("/user/logout", "DELETE", null, 200, token);
            console.log(response);
            dispatch({
                type:"USER_LOGGED_OUT_SUCCESS"
            });
        } catch (e) {
            console.log(e);
        }
    }
}

//get User List by userType(Athlete/Coach)
export const showUserList = (payload) =>{
    return async(dispatch) =>{
        try {
            console.log(payload);
            const response = await fetchApi("/user/getUser", "POST", payload, 200);
            console.log(response);
            if(response.success){
                dispatch({
                    type: "GET_USER_LIST_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }else{
                throw response;
            }
        } catch (error) {
            dispatch({
                type: "GET_USER_LIST_FAIL",
                payload: error.responseBody
            });
        }
    }
}

//update user information
export const updateUserInfo = (payload) =>{
    return async(dispatch) =>{
        try {
            console.log(payload);
            const response = await fetchApi("/user/update/basicInfo", "POST", payload, 200);
            console.log(response);
            if(response.success){
                dispatch({
                    type: "UPDATE_USER_INFO_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }else{
                throw response;
            }
        } catch (error) {
            dispatch({
                type: "UPDATE_USER_INFO_FAIL",
                payload: error.responseBody
            });
        }
    }
}

//delete user
export const DeleteUser = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "DELETE_USER_LOADING",
            });
            const response = await fetchApi("/user/delete","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "DELETE_USER_SUCCESS",
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "DELETE_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}


// export const addPhysicalData = (payload) =>{
//     return async (dispatch) =>{
//         try{
//             dispatch({
//                 type: "ADD_PHYSICAL_DATA_LOADING",
//             });
//             dispatch({
//                 type: "AUTH_USER_SUCCESS",
//             });
//             const response = await fetchApi("/user/create/physical_data","POST", payload, 200);
//             console.log(response);
//             console.log(response.responseBody);
        
//             if(response.success){
//                 dispatch({
//                     type: "ADD_PHYSICAL_DATA_SUCCESS",
//                 });
//                 dispatch({
//                     type: "GET_PHYSICAL_DATA_SUCCESS",
//                     payload: response.responseBody
//                 });
//                 return response;
//             }
//         } catch(error){
//             dispatch({
//                 type: "ADD_PHYSICAL_DATA_FAIL",
//                 payload: error.responseBody
//             });
//             return error;
//         }
//     }
// }