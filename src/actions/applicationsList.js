import { 
    GET_APPLICATIONS,
    GET_APPLICATION
} from '../constants/ActionTypes';

import * as applicationsList from '../services/applicationList';

export const getApplications = (status, candidate) => {
    return(dispatch, getState) => {
        const token = getState().application.token;
        //TODO add token
        applicationsList.getApplications(status, candidate, token)
            .then((res) => {
                dispatch({
                    type: GET_APPLICATIONS,
                    payload: res
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

export const getApplication = (id) => {
    return(dispatch, getState) => {
        const token = getState().application.token;
        //TODO add token
        applicationsList.getApplication(id, token)
            .then((res) => {
                dispatch({
                    type: GET_APPLICATION,
                    payload: res
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }
}