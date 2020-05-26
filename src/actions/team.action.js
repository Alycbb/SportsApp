import {fetchApi} from "../service/api";

//get all the teams
export const getAllTeam = () =>{
    return async(dispatch) =>{
        try {
            const response = await fetchApi("/team/displayAllTeam", "GET", null, 200);
            console.log(response);
            if(response.success){
                dispatch({
                    type: "GET_ALL_TEAM_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }else{
                throw response;
            }
        } catch (e) {
            console.log(e);
            dispatch({
                type: "GET_ALL_TEAM_FAIL",
                payload: error.responseBody
            });
        }
    }
}

//get Team Members by TeamName
export const getTeamMembers= (payload) =>{
    return async(dispatch) =>{
        try {
            const response = await fetchApi("/team/getTeamMembers", "POST", payload, 200);
            console.log(response);
            if(response.success){
                dispatch({
                    type: "GET_TEAM_MEMBERS_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }else{
                throw response;
            }
        } catch (e) {
            console.log(e);
            dispatch({
                type: "GET_TEAM_MEMBERS_FAIL",
                payload: error.responseBody
            });
        }
    }
}

//remove users from team
export const removeUserFromTeam = (payload) =>{
    return async(dispatch) =>{
        try {
            const response = await fetchApi("/team/removeUser", "POST", payload, 200);
            console.log(response);
            if(response.success){
                dispatch({
                    type: "REMOVE_TEAM_MEMBERS_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }else{
                throw response;
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: "REMOVE_TEAM_MEMBERS_FAIL",
                payload: error.responseBody
            });
        }
    }
}

//Change New Team for User
export const ChangeNewTeam = (payload) =>{
    return async(dispatch) =>{
        try {
            dispatch({
                type: "CHANGE_NEW_TEAM_LOADING",
            });
            const response = await fetchApi("/team/user/changeTeam", "POST", payload, 200);
            console.log(response);
            if(response.success){
                dispatch({
                    type: "CHANGE_NEW_TEAM_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }else{
                throw response;
            }
        } catch (e) {
            console.log(e);
            dispatch({
                type: "CHANGE_NEW_TEAM_FAIL",
                payload: error.responseBody
            });
        }
    }
}

//Assign Athletes to teams
export const AssignAthleteToTeam = (payload) =>{
    return async(dispatch) =>{
        try {
            dispatch({
                type: "ASSIGN_ATHLETE_TO_TEAM_LOADING",
            });
            const response = await fetchApi("/user/athlete/assignTeam", "POST", payload, 200);
            console.log(response);
            if(response.success){
                dispatch({
                    type: "ASSIGN_ATHLETE_TO_TEAM_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }else{
                throw response;
            }
        } catch (e) {
            console.log(e);
            dispatch({
                type: "ASSIGN_ATHLETE_TO_TEAM_FAIL",
                payload: error.responseBody
            });
        }
    }
}

//Assign Coaches to team
export const AssignCoachToTeam = (payload) =>{
    return async(dispatch) =>{
        try {
            dispatch({
                type: "ASSIGN_COACH_TO_TEAM_LOADING",
            });
            const response = await fetchApi("/user/coach/assignTeam", "POST", payload, 200);
            console.log(response);
            if(response.success){
                dispatch({
                    type: "ASSIGN_COACH_TO_TEAM_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }else{
                throw response;
            }
        } catch (e) {
            console.log(e);
            dispatch({
                type: "ASSIGN_COACH_TO_TEAM_FAIL",
                payload: error.responseBody
            });
        }
    }
}

//assign questionnaire (all the questions inside) to team
export const AssignQueTempToTeam = (payload) =>{
    return async(dispatch) =>{
        try {
            dispatch({
                type: "ASSIGN_TEMPLATE_TO_TEAM_LOADING",
            });
            const response = await fetchApi("/team/assignQuesToTeam", "POST", payload, 200);
            console.log(response);
            if(response.success){
                dispatch({
                    type: "ASSIGN_TEMPLATE_TO_TEAM_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }else{
                throw response;
            }
        } catch (e) {
            console.log(e);
            dispatch({
                type: "ASSIGN_TEMPLATE_TO_TEAM_FAIL",
                payload: error.responseBody
            });
        }
    }
}