import { 
    MODIFY_APPLICATION
} from '../constants/ActionTypes';

import * as application from '../services/applicationList';

export const updateApplication = (status) => {
    return (dispatch, getState) => {
        const token = getState().application.token;
        const id = getState().candidateApplication.id;
        //TODO add token
        application.updateApplicationStatus(status, id, token)
            .then(() => {
                dispatch({
                    type: MODIFY_APPLICATION
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }
}