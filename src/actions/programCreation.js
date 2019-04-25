import {
    CREATE_PROGRAM,
    SET_PROGRAM_ID,
    ADD_TEST_TO_PROGRAM,
    DELETE_TEST_FROM_PROGRAM,
    SAVE_PROGRAM,
    CLEAR_PROGRAM,
    CHANGE_PROGRAM_TITLE,
    GET_TESTS
} from '../constants/ActionTypes';

import * as programCreation from '../services/programCreation';
import * as testsList from '../services/testsListServices';

export const clearProgram = () => {
    return {
        type: CLEAR_PROGRAM
    };
}

export const createProgram = (name) => {
    return (dispatch, getState) => {
        programCreation.createProgram(getState().application.token, name)
            .then((res) => {
                dispatch(setId(res));
                dispatch({
                    type: CREATE_PROGRAM,
                    payload: name
                });
                dispatch(getTests);
            })
            .catch((e) => {
                console.log(e)
            });
    }
}

export const setId = (id) => {
    return {
        type: SET_PROGRAM_ID,
        payload: id
    };
}

export const changeName = (name) => {
    return {
        type:CHANGE_PROGRAM_TITLE,
        payload: name
    };
}

export const getTests = () => {
    return (dispatch, getState) => {
        try {
            testsList.getTests(getState().application.token)
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: GET_TESTS,
                        payload: res
                    });
                }
                );
        } catch (e) {
            console.log(e);
        }
    }
}

export const addTest = (id) => {
    return {
        type: ADD_TEST_TO_PROGRAM,
        payload: id
    }
}

export const deleteTest = (id) => {
    return {
        type: DELETE_TEST_FROM_PROGRAM,
        payload: id
    }
}

export const saveProgram = () => {
    return (dispatch, getState) => {
        const token = getState().application.token;
        //TODO: CHANGE TOKEN BACK
        //token='';
        const id = getState().program.id;
        const title = getState().program.name;
        const tests = getState().program.tests;
        programCreation.modifyProgram(token, id, title, tests)
            .then(() => {
                dispatch({
                    type: SAVE_PROGRAM
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }
}
