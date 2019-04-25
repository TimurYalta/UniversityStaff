/*
 * Test Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
    CREATE_NEW_TEST,
    SET_ID,
    CHANGE_NAME,
    ADD_QUESTION,
    DELETE_QUESTION,
    SEND_TEST,
    SAVE_QUESTION,
} from '../constants/ActionTypes';

import * as testCreation from '../services/testCreationServices';
import { parseQuestionToJSON } from '../utils/utils';
/**
 * Changes the input field of the form
 *
 * @param  {name} name The name of the recently created test
 * @param  {educationalProgram} educationalProgram The type
 * of the program for which the test is created
 *
 * @return {object}    An action object with a type of CREATE_NEW_TEST
 */
export const createNewTest = (name) => {
    return (dispatch) => {
        try {
            testCreation.createTest(name)
                .then((res)=>{
                    dispatch(setId(res.test_id));
                    dispatch({
                        type: CREATE_NEW_TEST,
                        payload: name
                    });
                }
            );
        } catch(e) {console.log(e)}
    }
}

export const setId = (id) => {
    return {
        type: SET_ID,
        payload: id
    };
}

export const changeName = (name) => {
    return (dispatch,getState) => {
        try {
            testCreation.modifyTest(getState().testCreation.id, name)
            .then(()=>{
                dispatch({
                    type: CHANGE_NAME,
                    payload: name
                });
            }
            );
        } catch(e) {}
    }
}

export const addQuestion = () => {
    return {
        type: ADD_QUESTION
    };
}

export const saveQuestion = (questionNumber, question) => {
    return (dispatch, getState) => {
        try {
            let testId = getState().testCreation.id;
            testCreation.createQuestion(testId, parseQuestionToJSON(question))
            .then(() => {
                dispatch(
                    {
                        type: SAVE_QUESTION,
                        payload: {questionNumber, question}
                    }
                );
            });
        } catch(e) {}
    };
}

export const modifyQuestion = (questionNumber, question) => {
    return (dispatch, getState) => {
        try {
            let testId = getState().testCreation.id;
            testCreation.modifyQuestion(testId, questionNumber, parseQuestionToJSON(question))
            .then(() => {
                dispatch(
                    {
                        type: SAVE_QUESTION,
                        payload: {questionNumber, question}
                    }
                )
            });
        } catch (e) {}
    }
}

export const deleteQuestion = (questionNumber) => {
    return(dispatch, getState) => {
        try {
            let testId = getState().testCreation.id;
            testCreation.deleteQuestion(testId, questionNumber)
            .then(() => {
                dispatch(
                    {
                        type:DELETE_QUESTION,
                        payload: questionNumber
                    }
                )
            });
        } catch(e) {}
    }
}

export const sendTest = () => {
    return(dispatch) => {
        dispatch(
            {
                type: SEND_TEST
            }
        );
    };
}
