import {
    SUCCESSFUL_LOGIN,
    INCORRECT_LOGIN,
    LOGOUT
} from '../constants/ActionTypes';

import authorize from '../services/login';
var HttpStatus = require('http-status-codes');
//TODO: Change back
export const login = (login, password) => {
    if(login=="n.kalinskiy@innopolis.ru" && password=="nikita") {
        return {
            type: SUCCESSFUL_LOGIN,
            payload: "5dc757704dac085db29f3e9ea295e8b5a91ac3c5"
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