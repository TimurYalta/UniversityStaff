import { 
    GET_APPLICATIONS,
    GET_APPLICATION
} from '../constants/ActionTypes';

import * as applicationsList from '../services/applicationList';

export const getApplications = (status, candidate) => {
    return(dispatch, getState) => {
        const token = getState().application.token;
        //TODO add token
        applicationsList.getApplications(status, candidate)
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
        applicationsList.getApplication(id)
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