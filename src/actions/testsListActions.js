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
    GET_TESTS,
    PUT_QUESTIONS
} from '../constants/ActionTypes';
import * as testsList from '../services/testsListServices';
import { parseQuestionFromJSON } from '../utils/utils';

export const getTests = () => {
    return (dispatch) => {
        try {
            testsList.getTests()
                .then((res)=>{
                    console.log(res);
                    dispatch({
                        type: GET_TESTS,
                        payload: res
                    });
                }
            );
        } catch(e) {console.log(e);}
    }
}

export const deleteTest = (testId) => {
    return (dispatch) => {
        try {
            testsList.deleteTest(testId)
                .then(()=>{
                    dispatch(getTests())
                }
            );
        } catch(e) {}
    }
}

export const getQuestions = (testId, title) => {
    return (dispatch) => {
        try {
            testsList.getQuestions(testId)
            .then((data) => {
                let questions = [];
                for(let question of data) {
                    console.log(parseQuestionFromJSON(question));
                    questions.push(parseQuestionFromJSON(question));
                }
                dispatch (
                    {
                        type:PUT_QUESTIONS,
                        payload: {testId, title, questions}
                    }
                )
            })
        } catch (e) {}
    }
}
