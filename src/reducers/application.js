import {
    SUCCESSFUL_LOGIN,
    INCORRECT_LOGIN,
    LOGOUT
} from '../constants/ActionTypes';

//The initial state of the app
const initialState = {
    token: ''
};

function applicationReducer(state = initialState, action) {
    switch(action.type) {
        case SUCCESSFUL_LOGIN:
            return {
                token: action.payload
            };
        case INCORRECT_LOGIN:
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default applicationReducer;