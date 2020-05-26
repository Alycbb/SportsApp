import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import questionReducer from "./question.reducer";
import trainingReducer from "./training.reducer";
import teamReducer from "./team.reducer";
import physicalDataReducer from "./physicalData.reducer";


const reducers = {
    authReducer,
    userReducer,
    questionReducer,
    trainingReducer,
    teamReducer,
    physicalDataReducer,
    form: formReducer
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) =>{
    if(action.type === "USER_LOGGED_OUT_SUCCESS"){
        state = {}
    }
    return appReducer(state,action);
}

export default rootReducer;