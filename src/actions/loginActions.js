import {
    SUCCESSFUL_LOGIN,
    INCORRECT_LOGIN,
    LOGOUT
} from '../constants/ActionTypes';

import authorize from '../services/login';
var HttpStatus = require('http-status-codes');
//TODO: Change back
export const login = (login, password) => {
    if(login=="admin" && password=="admin") {
        return {
            type: SUCCESSFUL_LOGIN,
            payload: "token"
        };
    } else {
        alert("Incorrect login/password");
        return {
            type: INCORRECT_LOGIN
        }
    }
    // (dispatch) => {
    //     authorize(login, password)
    //     .then((token) => {
    //         dispatch({
    //             type: SUCCESSFUL_LOGIN,
    //             payload: token
    //         });
    //     })
    //     .catch((e) => {
    //         if (e.status == HttpStatus.BAD_REQUEST) {
    //             alert("Incorrect login/password");
    //             dispatch({
    //                 type: INCORRECT_LOGIN
    //             });
    //         }
    //     })
    // }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}