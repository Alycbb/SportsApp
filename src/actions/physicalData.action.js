import {fetchApi} from "../service/api";

//create physical data template
export const addPhysicalDataTemplate = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "ADD_PHYSICAL_DATA_TEMPLATE_LOADING",
            });
            
            const response = await fetchApi("/physicalData/template/create","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "ADD_PHYSICAL_DATA_TEMPLATE_SUCCESS",
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "ADD_PHYSICAL_DATA_TEMPLATE_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//get physical data template by template name
export const displayChosenPDTemplate = (payload) =>{
    return async (dispatch) =>{
        try{
            
            const response = await fetchApi("/physicalData/template/displaychosenTem","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "DISPLAY_ONE_TEMPLATE_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "DISPLAY_ONE_TEMPLATE_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//get all the physical data templates
export const viewPhysicalDataTemplate = () =>{
    return async (dispatch) =>{
        try{

            const response = await fetchApi("/physicalData/template/view","GET", null, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "VIEW_PHYSICAL_DATA_TEMPLATE_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "VIEW_PHYSICAL_DATA_TEMPLATE_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//delete physical data template
export const DeletePhysicalDataTemplate = (payload) =>{
    return async (dispatch) =>{
        try{
            const response = await fetchApi("/physicalData/template/delete","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "DELETE_TEMPLATE_SUCCESS",
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "DELETE_TEMPLATE_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//update physical data template
export const UpdatePhysicalDataTemplate = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "UPDATE_PD_TEMPLATE_LOADING",
            });
            
            const response = await fetchApi("/physicalData/template/update","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "UPDATE_PD_TEMPLATE_SUCCESS",
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "UPDATE_PD_TEMPLATE_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//add physical data
export const addPhysicalData = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "ADD_PHYSICAL_DATA_LOADING",
            });
            
            const response = await fetchApi("/physicalData/data/create","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "ADD_PHYSICAL_DATA_SUCCESS",
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "ADD_PHYSICAL_DATA_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//update physical data
export const UpdatePhysicalData = (payload) =>{
    return async (dispatch) =>{
        try{

            const response = await fetchApi("/physicalData/data/update","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "UPDATE_PD_SUCCESS",
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "UPDATE_PD_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//display all physical data
export const viewPhysicalData = () =>{
    return async (dispatch) =>{
        try{
            const response = await fetchApi("/physicalData/view","GET", null, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "VIEW_PHYSICAL_DATA_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "VIEW_PHYSICAL_DATA_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//get physical data by userName and TemplateName
export const getPDbyUserNameAndTemName = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "GET_USER_PHYSICAL_DATA_LOADING",
            });
            const response = await fetchApi("/physicalData/data/getByUserNameAndTemName","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "GET_USER_PHYSICAL_DATA_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "GET_USER_PHYSICAL_DATA_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//get physical data by userName
export const getPDbyUserName = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "GET_PHYSICAL_DATA_BY_USER_NAME_LOADING",
            });

            const response = await fetchApi("/physicalData/data/getByUserName","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "GET_PHYSICAL_DATA_BY_USER_NAME_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "GET_PHYSICAL_DATA_BY_USER_NAME_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//get physical data(lists) from two different users
export const getComparedDifferentUserData = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "GET_COMPARED_TWO_DIFFERENT_USER_DATA_LOADING",
            });
            const response = await fetchApi("/physicalData/data/getTwoUserData","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "GET_COMPARED_TWO_DIFFERENT_USER_DATA_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "GET_COMPARED_TWO_DIFFERENT_USER_DATA_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//get specific physical data by data ID
export const getTwoComparedPD = (payload) =>{
    return async (dispatch) =>{
        try{
            dispatch({
                type: "GET_TWO_COMPARED_PHYSICAL_DATA_LOADING",
            });

            const response = await fetchApi("/physicalData/data/getTwoComparedData","POST", payload, 200);
            console.log(response);
            console.log(response.responseBody);
        
            if(response.success){
                dispatch({
                    type: "GET_TWO_COMPARED_PHYSICAL_DATA_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "GET_TWO_COMPARED_PHYSICAL_DATA_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

//delete physical data
export const DeletePhysicalData = (payload) =>{
    return async (dispatch) =>{
        try{

            response = await fetchApi("/physicalData/data/delete","POST", payload, 200);
            console.log(response);
        
            if(response.success){
                dispatch({
                    type: "DELETE_PHYSICAL_DATA_SUCCESS",
                });
                return response;
            }
        } catch(error){
            dispatch({
                type: "DELETE_PHYSICAL_DATA_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}