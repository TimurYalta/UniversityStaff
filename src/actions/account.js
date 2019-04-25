import {
    GET_ME,
    GET_USERS,
    GET_USER,
    REGISTER_USER
} from '../constants/ActionTypes'

import * as account from '../services/account';

export const getUser = (id) => {
    return (dispatch, getState) => {const token = getState().application.token;
        
        account.getUserData(id, token)
            .then((data) => {
                if (id) {
                    dispatch({
                        type: GET_USER,
                        payload: data
                    });
                } else {
                    dispatch({
                        type: GET_ME,
                        payload: data
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

export const getUsers = () => {
    return (dispatch, getState) => {
        account.getUsers()
            .then((data) => {
                dispatch({
                    type: GET_USERS,
                    payload: data
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

export const registerUser = (name, role, email) => {
    return (dispatch, getState) => {
        account.registerUser(name, role, email)
            .then(() => {
                alert("User has been registered");
                dispatch({
                    type: REGISTER_USER
                });
            })
            .catch((e) => {
                alert("Sosi zhopu");
                console.log(e);
            });
    }
}